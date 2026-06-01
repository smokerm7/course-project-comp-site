import { FormEvent, useEffect, useState } from 'react';
import { adminApi, catalogApi, getErrorMessage, repairApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import type {
  AdminUser,
  Category,
  Order,
  Product,
  ProductPayload,
  RepairRequest,
  Status,
} from '../api/types';
import styles from './AdminPage.module.css';

const emptyProduct: ProductPayload = {
  categoryId: 1,
  name: '',
  description: '',
  manufacturer: '',
  price: 0,
  stockQuantity: 0,
};

type Tab = 'products' | 'orders' | 'repairs' | 'users';

function roleClass(role: string): string {
  if (role === 'ADMIN') return styles.roleAdmin;
  if (role === 'EMPLOYEE') return styles.roleEmployee;
  return styles.roleClient;
}

export function AdminPage() {
  const { role } = useAuth();
  const isAdmin = role === 'ADMIN';
  const [tab, setTab] = useState<Tab>(isAdmin ? 'products' : 'orders');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [form, setForm] = useState<ProductPayload>(emptyProduct);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    try {
      const [p, c, allRepairs, repairStatuses] = await Promise.all([
        catalogApi.products(),
        catalogApi.categories(),
        repairApi.all(),
        repairApi.statuses(),
      ]);
      setProducts(p);
      setCategories(c);
      setRepairs(allRepairs);
      setStatuses(repairStatuses);
      if (c.length && !form.categoryId) {
        setForm((f) => ({ ...f, categoryId: c[0].id }));
      }

      const orderData = await adminApi.orders();
      setOrders(orderData);

      if (isAdmin) {
        const userData = await adminApi.users();
        setUsers(userData);
      } else {
        setUsers([]);
      }
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }

  useEffect(() => {
    load();
  }, [role]);

  async function saveProduct(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      if (editId) {
        await adminApi.updateProduct(editId, form);
        setMessage('Товар обновлён');
      } else {
        await adminApi.createProduct(form);
        setMessage('Товар добавлен');
      }
      setEditId(null);
      setForm({ ...emptyProduct, categoryId: categories[0]?.id ?? 1 });
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  function startEdit(product: Product) {
    setEditId(product.id);
    setForm({
      categoryId: product.category?.id ?? categories[0]?.id ?? 1,
      name: product.name,
      description: product.description ?? '',
      manufacturer: product.manufacturer ?? '',
      price: Number(product.price),
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl,
    });
    setTab('products');
  }

  async function removeProduct(id: number) {
    if (!confirm('Удалить товар?')) return;
    try {
      await adminApi.deleteProduct(id);
      setMessage('Товар удалён');
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  async function changeRepairStatus(repairId: number, statusId: number) {
    const comment = prompt('Комментарий мастера (необязательно)') ?? undefined;
    try {
      await repairApi.updateStatus(repairId, statusId, comment);
      setMessage('Статус заявки обновлён');
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  const stats = [
    { label: 'Товаров', value: products.length },
    { label: 'Заказов', value: orders.length },
    { label: 'Заявок на ремонт', value: repairs.length },
    { label: 'Пользователей', value: isAdmin ? users.length : '—' },
  ];

  const tabs: { id: Tab; label: string; adminOnly?: boolean }[] = [
    { id: 'products', label: 'Товары', adminOnly: true },
    { id: 'orders', label: 'Заказы' },
    { id: 'repairs', label: 'Ремонт' },
    { id: 'users', label: 'Пользователи', adminOnly: true },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Панель управления</h1>
        <p className={styles.subtitle}>Статистика магазина и управление данными MS7-COMP</p>
      </header>

      <div className={styles.stats}>
        {stats.map((s) => (
          <article key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue}>{s.value}</div>
          </article>
        ))}
      </div>

      <div className={styles.tabs}>
        {tabs
          .filter((t) => !t.adminOnly || isAdmin)
          .map((t) => (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? styles.tabActive : styles.tab}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
      </div>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {tab === 'products' && isAdmin && (
        <div className={styles.panel}>
          <form className={styles.formCard} onSubmit={saveProduct}>
            <h2 className={styles.formTitle}>{editId ? 'Редактирование товара' : 'Новый товар'}</h2>
            <div className={styles.formGrid}>
              <label className={styles.label}>
                Категория
                <select
                  className={styles.select}
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label}>
                Название
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label className={styles.label}>
                Производитель
                <input
                  className={styles.input}
                  value={form.manufacturer}
                  onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                />
              </label>
              <label className={styles.label}>
                Цена
                <input
                  className={styles.input}
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  required
                />
              </label>
              <label className={styles.label}>
                Остаток
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  value={form.stockQuantity}
                  onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                  required
                />
              </label>
            </div>
            <label className={styles.label}>
              Описание
              <textarea
                className={styles.textarea}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </label>
            <div className={styles.actions}>
              <button type="submit" className={styles.btnPrimary}>
                {editId ? 'Сохранить' : 'Добавить'}
              </button>
              {editId && (
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={() => {
                    setEditId(null);
                    setForm({ ...emptyProduct, categoryId: categories[0]?.id ?? 1 });
                  }}
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Остаток</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.category?.name ?? '—'}</td>
                    <td>{Number(p.price).toLocaleString('ru-RU')} ₽</td>
                    <td>{p.stockQuantity}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={`${styles.btnGhost} ${styles.btnSm}`}
                          onClick={() => startEdit(p)}
                        >
                          Изменить
                        </button>
                        <button
                          type="button"
                          className={`${styles.btnDanger} ${styles.btnSm}`}
                          onClick={() => removeProduct(p.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className={styles.panel}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Дата</th>
                  <th>Клиент</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th>Адрес</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.empty}>
                      Заказов пока нет
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{new Date(o.orderDate).toLocaleDateString('ru-RU')}</td>
                      <td>{o.client?.fullName ?? '—'}</td>
                      <td>{Number(o.totalAmount).toLocaleString('ru-RU')} ₽</td>
                      <td>
                        <span className={styles.statusPill}>{o.status.name}</span>
                      </td>
                      <td>{o.deliveryAddress ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'repairs' && (
        <div className={styles.panel}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Устройство</th>
                  <th>Клиент</th>
                  <th>Проблема</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {repairs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.empty}>
                      Заявок на ремонт нет
                    </td>
                  </tr>
                ) : (
                  repairs.map((r) => (
                    <tr key={r.id}>
                      <td>#{r.id}</td>
                      <td>
                        {r.deviceType} {r.deviceModel}
                      </td>
                      <td>
                        {r.client?.fullName ?? '—'}
                        {r.client?.phone && (
                          <>
                            <br />
                            <small>{r.client.phone}</small>
                          </>
                        )}
                      </td>
                      <td>{r.problemDescription}</td>
                      <td>
                        <span className={styles.statusPill}>{r.status.name}</span>
                      </td>
                      <td>
                        <select
                          className={styles.repairSelect}
                          defaultValue=""
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            if (id) changeRepairStatus(r.id, id);
                            e.target.value = '';
                          }}
                        >
                          <option value="">Сменить статус…</option>
                          {statuses.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'users' && isAdmin && (
        <div className={styles.panel}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Логин</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Регистрация</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.empty}>
                      Пользователей нет
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={roleClass(u.role)}>{u.role}</span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
