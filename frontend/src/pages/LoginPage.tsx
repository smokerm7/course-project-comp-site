import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import form from '../styles/FormPage.module.css';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={form.page}>
      <section className={form.card}>
        <h1 className={form.title}>Вход</h1>
        <p className={form.subtitle}>
          Войдите в систему используя свой логин и пароль.
        </p>
        <form onSubmit={submit}>
          <label className={form.label}>
            Логин
            <input
              className={form.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className={form.label}>
            Пароль
            <input
              className={form.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className={form.error}>{error}</p>}
          <button type="submit" className={form.btnPrimary} disabled={loading}>
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>
        <p className={form.footer}>
          Нет аккаунта?{' '}
          <Link to="/register" className={form.link}>
            Регистрация
          </Link>
        </p>
      </section>
    </div>
  );
}
