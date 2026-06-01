import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage, repairApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import form from '../styles/FormPage.module.css';

export function RepairPage() {
  const { isAuthenticated, role } = useAuth();
  const [deviceType, setDeviceType] = useState('Ноутбук');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await repairApi.create({ deviceType, deviceModel, problemDescription });
      setSuccess('Заявка принята. Статус можно отслеживать в личном кабинете.');
      setDeviceModel('');
      setProblemDescription('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={form.pageWide}>
        <section className={form.card}>
          <h1 className={form.title}>Сервисный центр</h1>
          <p className={form.subtitle}>Войдите как клиент, чтобы создать заявку на ремонт.</p>
          <Link to="/login" state={{ from: '/repair' }} className={form.btnPrimary}>
            Войти
          </Link>
        </section>
      </div>
    );
  }

  if (role !== 'CLIENT') {
    return (
      <div className={form.pageWide}>
        <section className={form.card}>
          <h1 className={form.title}>Сервисный центр</h1>
          <p className={form.subtitle}>
            Заявки создают клиенты. Сотрудники управляют ремонтами в панели.
          </p>
          <Link to="/admin" className={form.btnPrimary}>
            Панель управления
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={form.pageWide}>
      <section className={form.card}>
        <h1 className={form.title}>Заявка на ремонт</h1>
        <p className={form.subtitle}>
          Опишите неисправность — мастер свяжется с вами и обновит статус в личном кабинете.
        </p>
        <form onSubmit={submit}>
          <div className={form.grid2}>
            <label className={form.label}>
              Тип устройства
              <select
                className={form.select}
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option>Ноутбук</option>
                <option>Компьютер</option>
                <option>Монитор</option>
                <option>Периферия</option>
              </select>
            </label>
            <label className={form.label}>
              Модель
              <input
                className={form.input}
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="Например: ASUS TUF A15"
                required
              />
            </label>
          </div>
          <label className={form.label}>
            Описание неисправности
            <textarea
              className={form.textarea}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              required
              rows={5}
            />
          </label>
          {error && <p className={form.error}>{error}</p>}
          {success && <p className={form.success}>{success}</p>}
          <button type="submit" className={form.btnPrimary} disabled={loading}>
            {loading ? 'Отправка…' : 'Отправить заявку'}
          </button>
        </form>
      </section>
    </div>
  );
}
