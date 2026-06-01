import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getErrorMessage, orderApi, repairApi } from '../api/client';
import type { Order, RepairRequest } from '../api/types';
import styles from './AccountPage.module.css';

export function AccountPage() {
  const location = useLocation();
  const flash = (location.state as { message?: string } | null)?.message;
  const [orders, setOrders] = useState<Order[]>([]);
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([orderApi.my(), repairApi.my()])
      .then(([o, r]) => {
        setOrders(o);
        setRepairs(r);
      })
      .catch((e) => setError(getErrorMessage(e)));
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Личный кабинет</h1>
      {flash && <p className={styles.success}>{flash}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <section>
        <h2 className={styles.sectionTitle}>Мои заказы</h2>
        {orders.length === 0 ? (
          <p className={styles.empty}>Заказов пока нет.</p>
        ) : (
          <div className={styles.stack}>
            {orders.map((order) => (
              <article key={order.id} className={styles.card}>
                <header className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Заказ #{order.id}</span>
                  <span className={styles.statusPill}>{order.status.name}</span>
                </header>
                <p className={styles.meta}>
                  {new Date(order.orderDate).toLocaleString('ru-RU')} ·{' '}
                  {Number(order.totalAmount).toLocaleString('ru-RU')} ₽
                </p>
                <p className={styles.meta}>{order.deliveryAddress}</p>
                <ul className={styles.list}>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} × {item.quantity} —{' '}
                      {Number(item.price).toLocaleString('ru-RU')} ₽
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Заявки на ремонт</h2>
        {repairs.length === 0 ? (
          <p className={styles.empty}>Заявок пока нет.</p>
        ) : (
          <div className={styles.stack}>
            {repairs.map((r) => (
              <article key={r.id} className={styles.card}>
                <header className={styles.cardHeader}>
                  <span className={styles.cardTitle}>
                    {r.deviceType} {r.deviceModel}
                  </span>
                  <span className={styles.statusPill}>{r.status.name}</span>
                </header>
                <p className={styles.meta}>{r.problemDescription}</p>
                {r.masterComment && (
                  <p className={styles.meta}>Комментарий мастера: {r.masterComment}</p>
                )}
                <p className={styles.meta}>{new Date(r.createdAt).toLocaleString('ru-RU')}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
