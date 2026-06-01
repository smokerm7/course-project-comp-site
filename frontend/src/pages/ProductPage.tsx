import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { catalogApi, getErrorMessage } from '../api/client';
import { useCart } from '../context/CartContext';
import type { Product } from '../api/types';
import { getProductImage } from '../utils/productImages';
import { ProductImage } from '../components/ProductImage';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const numId = Number(id);
    if (!numId) return;
    catalogApi
      .product(numId)
      .then(setProduct)
      .catch((e) => setError(getErrorMessage(e)));
  }, [id]);

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!product) return;
    add(product, qty);
    setMessage(`«${product.name}» добавлен в корзину`);
  }

  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.loading}>Загрузка…</p>;

  const image = getProductImage(product);
  const inStock = product.stockQuantity > 0;

  return (
    <div className={styles.page}>
      <div className={styles.imageWrap}>
        <ProductImage src={image} alt={product.name} wrapClassName={styles.imageInner} />
      </div>
      <div className={styles.details}>
        <Link to="/catalog" className={styles.backLink}>
          ← К каталогу
        </Link>
        {product.category && <div className={styles.category}>{product.category.name}</div>}
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.meta}>{product.manufacturer}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{Number(product.price).toLocaleString('ru-RU')} ₽</span>
        </div>
        <p className={`${styles.stock} ${inStock ? styles.inStock : styles.outOfStock}`}>
          {inStock ? `В наличии: ${product.stockQuantity} шт.` : 'Нет в наличии'}
        </p>
        <form className={styles.form} onSubmit={handleAdd}>
          <label className={styles.qtyLabel}>
            Количество
            <input
              className={styles.qtyInput}
              type="number"
              min={1}
              max={product.stockQuantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </label>
          <button type="submit" className={styles.btnPrimary} disabled={!inStock}>
            В корзину
          </button>
        </form>
        {message && <p className={styles.success}>{message}</p>}
      </div>
    </div>
  );
}
