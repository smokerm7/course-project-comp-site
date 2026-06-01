import { Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../utils/productImages';
import styles from './CartPage.module.css';

export function CartPage() {
  const { items, total, remove, setQuantity } = useCart();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.empty}>
          <p className={styles.emptyText}>Корзина пуста. Добавьте товары из каталога.</p>
          <Link to="/catalog" className={styles.btnPrimary}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.layout}>
        <div className={styles.list}>
          {items.map((item) => (
            <article key={item.productId} className={styles.row}>
              <div className={styles.imageWrap}>
                <ProductImage
                  src={item.imageUrl ?? FALLBACK_IMAGE}
                  alt={item.name}
                  wrapClassName={styles.imageInner}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{item.price.toLocaleString('ru-RU')} ₽ / шт.</p>
              </div>
              <div className={styles.controls}>
                <div className={styles.qtyGroup}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    disabled={item.quantity >= item.stockQuantity}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
                <span className={styles.lineTotal}>
                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(item.productId)}
                >
                  Удалить
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Итого</h2>
          <div className={styles.summaryRow}>
            <span>Товаров</span>
            <span>{itemCount} шт.</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Позиций</span>
            <span>{items.length}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Сумма</span>
            <span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          <Link to="/checkout" className={styles.checkoutBtn}>
            Оформить заказ
          </Link>
        </aside>
      </div>
    </div>
  );
}
