import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { catalogApi, getErrorMessage } from '../api/client';
import type { Category, Product } from '../api/types';
import { ProductCard } from '../components/ProductCard';
import styles from './CatalogPage.module.css';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

function parseCategoryId(value: string | null): number | undefined {
  if (!value) return undefined;
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : undefined;
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = parseCategoryId(searchParams.get('category'));
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    catalogApi.categories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    catalogApi
      .products(categoryId)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const filtered = useMemo(() => {
    let list = [...products];
    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description?.toLowerCase().includes(query) ?? false) ||
          (p.category?.name.toLowerCase().includes(query) ?? false) ||
          (p.manufacturer?.toLowerCase().includes(query) ?? false)
      );
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      default:
        break;
    }
    return list;
  }, [products, search, sort]);

  function selectCategory(id: number | undefined) {
    if (id) {
      setSearchParams({ category: String(id) });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Каталог</h1>
        <p className={styles.subtitle}>
          Комплектующие, готовые ПК, периферия и аксессуары с доставкой
        </p>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="search"
            className={styles.search}
            placeholder="Поиск по названию, категории, производителю…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="name">По названию</option>
        </select>
      </div>

      <div className={styles.filters}>
        <button
          type="button"
          className={categoryId === undefined ? styles.chipActive : styles.chip}
          onClick={() => selectCategory(undefined)}
        >
          Все
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={categoryId === c.id ? styles.chipActive : styles.chip}
            onClick={() => selectCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {!loading && (
        <p className={styles.resultCount}>
          Найдено: {filtered.length} {filtered.length === 1 ? 'товар' : 'товаров'}
        </p>
      )}

      {loading && <p className={styles.loading}>Загрузка каталога…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.empty}>
          <p>Товары не найдены. Попробуйте изменить фильтры или поисковый запрос.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
