import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Layout.module.css';

export function Layout() {
  const { isAuthenticated, username, role, logout } = useAuth();
  const { count } = useCart();
  const location = useLocation();

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>MS7</span>
          MS7-COMP
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Главная
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Каталог
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Корзина
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </NavLink>
          {isAuthenticated && role === 'CLIENT' && (
            <>
              <NavLink
                to="/repair"
                className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
              >
                Ремонт
              </NavLink>
              <NavLink
                to="/account"
                className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
              >
                Кабинет
              </NavLink>
            </>
          )}
          {(role === 'ADMIN' || role === 'EMPLOYEE') && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Панель
            </NavLink>
          )}
        </nav>
        <div className={styles.authBar}>
          {isAuthenticated ? (
            <>
              <span className={styles.userPill}>
                {username} · {role}
              </span>
              <button type="button" className={styles.btnGhost} onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnGhost}>
                Вход
              </Link>
              <Link to="/register" className={styles.btnPrimary}>
                Регистрация
              </Link>
            </>
          )}
        </div>
      </header>
      <main className={styles.page}>
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>
            MS7-COMP — продажа и ремонт компьютерной техники, Ставрополь
          </p>
          <div className={styles.footerLinks}>
            <Link to="/catalog" className={styles.footerLink}>
              Каталог
            </Link>
            <Link to="/repair" className={styles.footerLink}>
              Ремонт
            </Link>
            <Link to="/cart" className={styles.footerLink}>
              Корзина
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
