import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../api/types';
import { useCart } from '../context/CartContext';
import { getProductImage } from '../utils/productImages';
import { ProductImage } from './ProductImage';
import styles from './ProductCard.module.css';

type Props = {
  product: Product;
  compact?: boolean;
  showAddToCart?: boolean;
};

function stockLabel(qty: number): { text: string; className: string } {
  if (qty <= 0) return { text: 'Нет в наличии', className: styles.outOfStock };
  if (qty <= 3) return { text: `Осталось ${qty}`, className: styles.lowStock };
  return { text: 'В наличии', className: styles.inStock };
}

export function ProductCard({ product, compact, showAddToCart = true }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const stock = stockLabel(product.stockQuantity);
  const image = getProductImage(product);

  function handleAdd() {
    if (product.stockQuantity < 1) return;
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className={`${styles.productCard} ${compact ? styles.compact : ''}`}>
      <Link to={`/products/${product.id}`} className={styles.imageWrap}>
        <ProductImage src={image} alt={product.name} wrapClassName={styles.imageInner} />
        <span className={`${styles.stockBadge} ${stock.className}`}>{stock.text}</span>
      </Link>
      <div className={styles.body}>
        {product.category && <span className={styles.category}>{product.category.name}</span>}
        <h3 className={styles.title}>
          <Link to={`/products/${product.id}`} className={styles.titleLink}>
            {product.name}
          </Link>
        </h3>
        {product.description && <p className={styles.description}>{product.description}</p>}
        <div className={styles.footer}>
          <span className={styles.price}>{Number(product.price).toLocaleString('ru-RU')} ₽</span>
          {showAddToCart && (
            <div className={styles.actions}>
              <button
                type="button"
                className={added ? styles.added : styles.btnPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAdd();
                }}
                disabled={product.stockQuantity < 1}
              >
                {added ? 'Добавлено' : 'В корзину'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
