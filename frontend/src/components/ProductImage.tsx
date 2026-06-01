import { useEffect, useState } from 'react';
import {
  FALLBACK_IMAGE,
  PLACEHOLDER_DATA_URI,
} from '../utils/productImages';
import styles from './ProductImage.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
  wrapClassName?: string;
  loading?: 'lazy' | 'eager';
  fit?: 'cover' | 'fill';
};

export function ProductImage({
  src,
  alt,
  className,
  wrapClassName,
  loading = 'lazy',
  fit = 'cover',
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
  }, [src]);

  function handleError() {
    if (currentSrc === FALLBACK_IMAGE) {
      setCurrentSrc(PLACEHOLDER_DATA_URI);
      return;
    }
    if (currentSrc === PLACEHOLDER_DATA_URI) {
      setFailed(true);
      return;
    }
    setCurrentSrc(FALLBACK_IMAGE);
  }

  const fitClass = fit === 'cover' ? styles.cover : styles.fill;

  return (
    <div className={`${styles.wrap} ${wrapClassName ?? ''}`}>
      {!failed && (
        <img
          src={currentSrc}
          alt={alt}
          className={`${styles.image} ${fitClass} ${className ?? ''}`}
          loading={loading}
          onError={handleError}
        />
      )}
      {failed && (
        <div className={styles.placeholder} aria-hidden>
          <span className={styles.placeholderIcon}>🖥️</span>
        </div>
      )}
    </div>
  );
}
