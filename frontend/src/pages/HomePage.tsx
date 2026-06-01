import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../api/client';
import type { Product } from '../api/types';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { ADVANTAGES, HERO_IMAGE, HOME_CATEGORIES } from '../utils/productImages';
import styles from './HomePage.module.css';

export function HomePage() {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogApi
      .products()
      .then((data) => setBestsellers(data.slice(0, 8)))
      .catch(() => setBestsellers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <ProductImage
          src={HERO_IMAGE}
          alt="Игровой компьютер MS7-COMP"
          wrapClassName={styles.heroBg}
          loading="eager"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Премиум магазин техники</span>
          <h1 className={styles.heroTitle}>
            MS7-COMP — Продажа и ремонт компьютерной техники
          </h1>
          <p className={styles.heroSubtitle}>
            Ноутбуки, игровые ПК, комплектующие, периферия и сервисный центр.
          </p>
          <div className={styles.heroActions}>
            <Link to="/catalog" className={styles.btnPrimary}>
              Перейти в каталог
            </Link>
            <Link to="/repair" className={styles.btnSecondary}>
              Оформить ремонт
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Популярные категории</h2>
            <p className={styles.sectionSubtitle}>
              Выберите нужный раздел и найдите технику для любых задач
            </p>
          </div>
          <Link to="/catalog" className={styles.linkMore}>
            Весь каталог →
          </Link>
        </div>
        <div className={styles.categoryGrid}>
          {HOME_CATEGORIES.map((cat) => (
            <Link key={cat.title} to={cat.link} className={styles.categoryCard}>
              <ProductImage
                src={cat.image}
                alt={cat.title}
                wrapClassName={styles.categoryImageWrap}
              />
              <div className={styles.categoryBody}>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Хиты продаж</h2>
            <p className={styles.sectionSubtitle}>Самые популярные товары нашего магазина</p>
          </div>
          <Link to="/catalog" className={styles.linkMore}>
            Смотреть все →
          </Link>
        </div>
        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        ) : bestsellers.length === 0 ? (
          <p className={styles.empty}>Товары временно недоступны. Запустите backend и обновите страницу.</p>
        ) : (
          <div className={styles.productGrid}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Почему MS7-COMP</h2>
            <p className={styles.sectionSubtitle}>Надёжный партнёр для покупки и обслуживания техники</p>
          </div>
        </div>
        <div className={styles.advantageGrid}>
          {ADVANTAGES.map((item) => (
            <article key={item.title} className={styles.advantageCard}>
              <div className={styles.advantageIcon}>{item.icon}</div>
              <h3 className={styles.advantageTitle}>{item.title}</h3>
              <p className={styles.advantageDesc}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
