import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import form from '../styles/FormPage.module.css';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(data);
      navigate('/account');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={form.page}>
      <section className={form.card}>
        <h1 className={form.title}>Регистрация клиента</h1>
        <p className={form.subtitle}>Создайте аккаунт для заказов и заявок на ремонт</p>
        <form onSubmit={submit}>
          <label className={form.label}>
            Логин
            <input
              className={form.input}
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </label>
          <label className={form.label}>
            Email
            <input
              className={form.input}
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </label>
          <label className={form.label}>
            Пароль
            <input
              className={form.input}
              type="password"
              minLength={6}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </label>
          <div className={form.grid2}>
            <label className={form.label}>
              ФИО
              <input
                className={form.input}
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                required
              />
            </label>
            <label className={form.label}>
              Телефон
              <input
                className={form.input}
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
              />
            </label>
          </div>
          {error && <p className={form.error}>{error}</p>}
          <button type="submit" className={form.btnPrimary} disabled={loading}>
            {loading ? 'Регистрация…' : 'Создать аккаунт'}
          </button>
        </form>
        <p className={form.footer}>
          Уже есть аккаунт?{' '}
          <Link to="/login" className={form.link}>
            Войти
          </Link>
        </p>
      </section>
    </div>
  );
}
