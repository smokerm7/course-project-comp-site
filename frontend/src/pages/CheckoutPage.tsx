import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage, orderApi } from '../api/client';
import { useCart } from '../context/CartContext';
import form from '../styles/FormPage.module.css';

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('Ставрополь, ул. Примерная, 1');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await orderApi.create({
        deliveryAddress: address,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      clear();
      navigate('/account', { state: { message: 'Заказ успешно оформлен' } });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className={form.page}>
        <section className={form.card}>
          <h1 className={form.title}>Оформление заказа</h1>
          <p className={form.subtitle}>Корзина пуста — добавьте товары из каталога.</p>
          <Link to="/catalog" className={form.btnPrimary}>
            Перейти в каталог
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={form.page}>
      <section className={form.card}>
        <h1 className={form.title}>Оформление заказа</h1>
        <p className={form.subtitle}>
          Сумма: <strong>{total.toLocaleString('ru-RU')} ₽</strong> · {items.length} поз.
        </p>
        <form onSubmit={submit}>
          <label className={form.label}>
            Адрес доставки
            <textarea
              className={form.textarea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
            />
          </label>
          {error && <p className={form.error}>{error}</p>}
          <button type="submit" className={form.btnPrimary} disabled={loading}>
            {loading ? 'Отправка…' : 'Подтвердить заказ'}
          </button>
        </form>
      </section>
    </div>
  );
}
