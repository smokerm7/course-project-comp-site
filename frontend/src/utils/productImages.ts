/** Base path for static product images (Vite public folder). */
export const IMAGE_BASE = '/images/products';

/** Files present in public/images/products/ (sync via scripts/sync-product-images.ps1). */
export const AVAILABLE_PRODUCT_IMAGES = [
  'cpu-ryzen.jpg',
  'gaming-pc-black.jpg',
  'gaming-pc-white.jpg',
  'gpu-rtx3050.jpg',
  'gpu-rtx3060.jpg',
  'gpu-rtx4060.jpg',
  'gpu-rtx4060ti.jpg',
  'gpu-rtx4070.jpg',
  'gpu-rtx4070super.jpg',
  'gpu-rtx4080super.jpg',
  'gpu-rtx4090.jpg',
  'gpu-rx6600.jpg',
  'gpu-rx7600.jpg',
  'gpu-rx7700xt.jpg',
  'gpu-rx7800xt.jpg',
  'gpu-rx7900gre.jpg',
  'gpu-rx7900xtx.jpg',
  'gpu-rx9070xt.jpg',
  'keyboard-mechanical.jpg',
  'laptop-acer-nitro.jpg',
  'laptop-asus-tuf.jpg',
  'laptop-lenovo-legion.jpg',
  'laptop-msi-katana.jpg',
  'liquid-cooler-360.jpg',
  'monitor-aoc24g2.jpg',
  'monitor-lg-ultragear.jpg',
  'monitor-msi-curved.jpg',
  'monitor-msi-red.jpg',
  'monitor-samsung-odyssey-g5.jpg',
  'monitor-samsung-odyssey-g7.jpg',
  'monitor-xiaomi-a27i.jpg',
  'motherboard-rog-strix.jpg',
  'mouse-logitech-gpro.jpg',
  'psu-rog-strix.jpg',
  'ram-ddr5.jpg',
  'ram-kingston-fury-16gb-ddr4.jpg',
  'ssd-predator-gm7000.jpg',
] as const;

export type ProductImageFile = (typeof AVAILABLE_PRODUCT_IMAGES)[number];

const AVAILABLE = new Set<string>(AVAILABLE_PRODUCT_IMAGES);

export const FALLBACK_IMAGE = `${IMAGE_BASE}/gaming-pc-black.jpg`;

/** Dark gradient SVG used when JPG files fail to load in the browser */
export const PLACEHOLDER_DATA_URI =
  'data:image/svg+xml,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="280" y="200" width="240" height="160" rx="12" fill="none" stroke="#334155" stroke-width="2"/>
  <circle cx="350" cy="260" r="24" fill="none" stroke="#475569" stroke-width="2"/>
  <path d="M300 340 L380 280 L440 320 L500 240" fill="none" stroke="#475569" stroke-width="2"/>
  <text x="400" y="420" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="18">MS7-COMP</text>
</svg>`);

export function imageUrl(filename: string): string {
  return `${IMAGE_BASE}/${filename}`;
}

const PREFIX_FALLBACKS: Record<string, readonly string[]> = {
  gpu: ['gpu-rx9070xt.jpg'],
  cpu: ['cpu-ryzen.jpg'],
  ram: ['ram-kingston-fury-16gb-ddr4.jpg', 'ram-ddr5.jpg'],
  ssd: ['ssd-predator-gm7000.jpg'],
  monitor: ['monitor-msi-curved.jpg', 'monitor-msi-red.jpg', 'monitor-samsung-odyssey-g7.jpg'],
  laptop: ['laptop-asus-tuf.jpg', 'laptop-lenovo-legion.jpg', 'gaming-pc-black.jpg'],
  gaming: ['gaming-pc-black.jpg', 'gaming-pc-white.jpg'],
  motherboard: ['motherboard-rog-strix.jpg'],
  mouse: ['mouse-logitech-gpro.jpg'],
  keyboard: ['keyboard-mechanical.jpg'],
  headset: ['keyboard-mechanical.jpg'],
  psu: ['psu-rog-strix.jpg'],
  liquid: ['liquid-cooler-360.jpg'],
};

const CATEGORY_FALLBACK_FILES: Record<string, string> = {
  Видеокарты: 'gpu-rx9070xt.jpg',
  Процессоры: 'cpu-ryzen.jpg',
  'Материнские платы': 'motherboard-rog-strix.jpg',
  ОЗУ: 'ram-ddr5.jpg',
  'Оперативная память': 'ram-ddr5.jpg',
  SSD: 'ssd-predator-gm7000.jpg',
  'SSD накопители': 'ssd-predator-gm7000.jpg',
  HDD: 'ssd-predator-gm7000.jpg',
  'Жесткие диски HDD': 'ssd-predator-gm7000.jpg',
  Мониторы: 'monitor-msi-curved.jpg',
  'Готовые ПК MS7-COMP': 'gaming-pc-black.jpg',
  'Игровые ПК': 'gaming-pc-black.jpg',
  Ноутбуки: 'laptop-asus-tuf.jpg',
  Периферия: 'keyboard-mechanical.jpg',
  'Блоки питания': 'psu-rog-strix.jpg',
  'Системы охлаждения': 'liquid-cooler-360.jpg',
};

const DEFAULT_FALLBACK_FILE = 'gaming-pc-black.jpg';

type ProductLike = {
  id?: number;
  name: string;
  manufacturer?: string;
  category?: { name?: string } | string;
  imageUrl?: string;
};

type ImageRule = {
  test: (text: string) => boolean;
  file: string;
};

/** Most specific rules first. */
const PRODUCT_RULES: ImageRule[] = [
  // NVIDIA GPUs
  { test: (t) => /rtx\s*4090/i.test(t), file: 'gpu-rtx4090.jpg' },
  { test: (t) => /rtx\s*4080\s*super/i.test(t), file: 'gpu-rtx4080super.jpg' },
  { test: (t) => /rtx\s*4070\s*super/i.test(t), file: 'gpu-rtx4070super.jpg' },
  { test: (t) => /rtx\s*4070(?!\s*super)/i.test(t), file: 'gpu-rtx4070.jpg' },
  { test: (t) => /rtx\s*4060\s*ti/i.test(t), file: 'gpu-rtx4060ti.jpg' },
  { test: (t) => /rtx\s*4060(?!\s*ti)/i.test(t), file: 'gpu-rtx4060.jpg' },
  { test: (t) => /rtx\s*3060/i.test(t), file: 'gpu-rtx3060.jpg' },
  { test: (t) => /rtx\s*3050/i.test(t), file: 'gpu-rtx3050.jpg' },
  // AMD GPUs
  { test: (t) => /rx\s*7900\s*xtx/i.test(t), file: 'gpu-rx7900xtx.jpg' },
  { test: (t) => /rx\s*7900\s*gre/i.test(t), file: 'gpu-rx7900gre.jpg' },
  { test: (t) => /rx\s*7800\s*xt/i.test(t), file: 'gpu-rx7800xt.jpg' },
  { test: (t) => /rx\s*7700\s*xt/i.test(t), file: 'gpu-rx7700xt.jpg' },
  { test: (t) => /rx\s*7600/i.test(t), file: 'gpu-rx7600.jpg' },
  { test: (t) => /rx\s*6700\s*xt/i.test(t), file: 'gpu-rx7700xt.jpg' },
  { test: (t) => /rx\s*6600/i.test(t), file: 'gpu-rx6600.jpg' },
  { test: (t) => /rx\s*90|9070/i.test(t), file: 'gpu-rx9070xt.jpg' },
  // CPUs
  { test: (t) => /ryzen|amd\s*ryzen/i.test(t), file: 'cpu-ryzen.jpg' },
  { test: (t) => /intel|core\s*i[3579]/i.test(t), file: 'cpu-ryzen.jpg' },
  // RAM
  { test: (t) => /kingston\s*fury/i.test(t), file: 'ram-kingston-fury-16gb-ddr4.jpg' },
  { test: (t) => /corsair.*vengeance|corsair\s*ddr/i.test(t), file: 'ram-ddr5.jpg' },
  { test: (t) => /g\.?\s*skill/i.test(t), file: 'ram-ddr5.jpg' },
  { test: (t) => /ddr[45]|озу|оператив/i.test(t), file: 'ram-ddr5.jpg' },
  // SSD
  { test: (t) => /990\s*pro|samsung\s*990/i.test(t), file: 'ssd-predator-gm7000.jpg' },
  { test: (t) => /samsung\s*980|980\s*pro/i.test(t), file: 'ssd-predator-gm7000.jpg' },
  { test: (t) => /kingston\s*nv2/i.test(t), file: 'ssd-predator-gm7000.jpg' },
  { test: (t) => /wd\s*(sn|black)|western\s*digital/i.test(t), file: 'ssd-predator-gm7000.jpg' },
  { test: (t) => /predator|nvme|ssd/i.test(t), file: 'ssd-predator-gm7000.jpg' },
  // Monitors
  { test: (t) => /aoc|24g2/i.test(t), file: 'monitor-aoc24g2.jpg' },
  { test: (t) => /lg\s*ultragear|27gn800/i.test(t), file: 'monitor-lg-ultragear.jpg' },
  { test: (t) => /odyssey\s*g7/i.test(t), file: 'monitor-samsung-odyssey-g7.jpg' },
  { test: (t) => /odyssey\s*g5/i.test(t), file: 'monitor-samsung-odyssey-g5.jpg' },
  { test: (t) => /xiaomi\s*a27i|a27i/i.test(t), file: 'monitor-xiaomi-a27i.jpg' },
  { test: (t) => /msi.*g274|msi.*монитор|msi.*monitor/i.test(t), file: 'monitor-msi-curved.jpg' },
  { test: (t) => /монитор|monitor|odyssey|ultragear/i.test(t), file: 'monitor-msi-curved.jpg' },
  // Laptops
  { test: (t) => /asus\s*tuf|tuf\s*gaming/i.test(t), file: 'laptop-asus-tuf.jpg' },
  { test: (t) => /lenovo\s*legion/i.test(t), file: 'laptop-lenovo-legion.jpg' },
  { test: (t) => /msi\s*katana/i.test(t), file: 'laptop-msi-katana.jpg' },
  { test: (t) => /acer\s*nitro/i.test(t), file: 'laptop-acer-nitro.jpg' },
  { test: (t) => /rog\s*strix\s*g|victus|ноутбук|laptop/i.test(t), file: 'laptop-asus-tuf.jpg' },
  // Gaming PCs
  { test: (t) => /gamer\s*start|gaming\s*start|office|home/i.test(t), file: 'gaming-pc-white.jpg' },
  { test: (t) => /gamer\s*pro|gamer\s*ultra|stream\s*edition|gaming\s*pro|gaming\s*ultra/i.test(t), file: 'gaming-pc-black.jpg' },
  { test: (t) => /ms7-comp|игров.*пк|готов.*пк/i.test(t), file: 'gaming-pc-black.jpg' },
  // Motherboards
  { test: (t) => /asrock/i.test(t), file: 'motherboard-rog-strix.jpg' },
  { test: (t) => /gigabyte/i.test(t), file: 'motherboard-rog-strix.jpg' },
  { test: (t) => /\bmsi\b.*(b760|gaming|материн)/i.test(t), file: 'motherboard-rog-strix.jpg' },
  { test: (t) => /asus.*(prime|tuf|rog)|материн.*asus/i.test(t), file: 'motherboard-rog-strix.jpg' },
  { test: (t) => /материн|motherboard/i.test(t), file: 'motherboard-rog-strix.jpg' },
  // Peripherals
  { test: (t) => /logitech/i.test(t), file: 'mouse-logitech-gpro.jpg' },
  { test: (t) => /steelseries/i.test(t), file: 'mouse-logitech-gpro.jpg' },
  { test: (t) => /hyperx/i.test(t), file: 'keyboard-mechanical.jpg' },
  { test: (t) => /razer/i.test(t), file: 'keyboard-mechanical.jpg' },
  { test: (t) => /клавиатур|keyboard|перифер/i.test(t), file: 'keyboard-mechanical.jpg' },
  { test: (t) => /мыш|mouse/i.test(t), file: 'mouse-logitech-gpro.jpg' },
  // PSU
  { test: (t) => /corsair\s*rm|chieftec|deepcool\s*pk|be\s*quiet|блок\s*питания|psu/i.test(t), file: 'psu-rog-strix.jpg' },
  // Cooling
  { test: (t) => /сжо|liquid|cooling|cooler|охлажден|кулер/i.test(t), file: 'liquid-cooler-360.jpg' },
];

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

export function getCategoryName(product: ProductLike): string {
  const cat = product.category;
  if (!cat) return '';
  return typeof cat === 'string' ? cat : (cat.name ?? '');
}

function matchProductFile(text: string): string | null {
  if (!text.trim()) return null;
  const norm = normalize(text);
  for (const rule of PRODUCT_RULES) {
    if (rule.test(norm)) return rule.file;
  }
  return null;
}

function filePrefix(filename: string): string {
  return filename.split('-')[0] ?? '';
}

/** Return a URL only if the backing file exists in public/images/products. */
export function resolveImage(filename: string, categoryName = ''): string {
  if (AVAILABLE.has(filename)) {
    return imageUrl(filename);
  }

  const prefix = filePrefix(filename);
  const prefixAlternatives = PREFIX_FALLBACKS[prefix];
  if (prefixAlternatives) {
    for (const alt of prefixAlternatives) {
      if (AVAILABLE.has(alt)) return imageUrl(alt);
    }
  }

  const categoryFile = CATEGORY_FALLBACK_FILES[categoryName];
  if (categoryFile && categoryFile !== filename) {
    return resolveImage(categoryFile, categoryName);
  }

  if (AVAILABLE.has(DEFAULT_FALLBACK_FILE)) {
    return imageUrl(DEFAULT_FALLBACK_FILE);
  }

  return FALLBACK_IMAGE;
}

function resolveStoredImageUrl(imageUrlValue: string): string | null {
  const trimmed = imageUrlValue.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  const path = trimmed.startsWith('/') ? trimmed : `${IMAGE_BASE}/${trimmed.replace(/^\.?\//, '')}`;
  const filename = path.replace(`${IMAGE_BASE}/`, '').split('?')[0];
  if (filename && AVAILABLE.has(filename)) {
    return imageUrl(filename);
  }

  return resolveImage(filename || DEFAULT_FALLBACK_FILE);
}

/**
 * Resolve catalog image: product-specific rules (name → manufacturer → category),
 * then category fallback, then default.
 */
export function getProductImage(product: ProductLike): string {
  if (product.imageUrl) {
    const stored = resolveStoredImageUrl(product.imageUrl);
    if (stored) return stored;
  }

  const categoryName = getCategoryName(product);
  const name = product.name ?? '';
  const manufacturer = product.manufacturer ?? '';

  for (const part of [name, manufacturer, categoryName]) {
    const file = matchProductFile(part);
    if (file) return resolveImage(file, categoryName);
  }

  const combined = `${name} ${manufacturer} ${categoryName}`;
  const fromCombined = matchProductFile(combined);
  if (fromCombined) return resolveImage(fromCombined, categoryName);

  const categoryFile = CATEGORY_FALLBACK_FILES[categoryName];
  if (categoryFile) {
    return resolveImage(categoryFile, categoryName);
  }

  return resolveImage(DEFAULT_FALLBACK_FILE, categoryName);
}

export function getCategoryImage(categoryName: string, index = 0): string {
  const file = CATEGORY_FALLBACK_FILES[categoryName];
  if (file) return resolveImage(file, categoryName);

  const legacy: Record<string, readonly string[]> = {
    'Готовые ПК MS7-COMP': ['gaming-pc-white.jpg', 'gaming-pc-black.jpg'],
    Мониторы: ['monitor-msi-curved.jpg', 'monitor-msi-red.jpg'],
  };
  const list = legacy[categoryName];
  if (list?.length) {
    const pick = list[Math.abs(index) % list.length];
    return resolveImage(pick, categoryName);
  }

  return resolveImage(DEFAULT_FALLBACK_FILE, categoryName);
}

export const HOME_CATEGORIES = [
  {
    title: 'Игровые ПК',
    description: 'Готовые сборки MS7-COMP для Full HD, 2K и 4K',
    image: resolveImage('gaming-pc-white.jpg'),
    link: '/catalog?category=9',
  },
  {
    title: 'Видеокарты',
    description: 'NVIDIA GeForce и AMD Radeon последнего поколения',
    image: resolveImage('gpu-rx9070xt.jpg'),
    link: '/catalog?category=1',
  },
  {
    title: 'Процессоры',
    description: 'AMD Ryzen и Intel Core для игр и работы',
    image: resolveImage('cpu-ryzen.jpg'),
    link: '/catalog?category=2',
  },
  {
    title: 'Материнские платы',
    description: 'Платы для платформ Intel и AMD',
    image: resolveImage('motherboard-rog-strix.jpg'),
    link: '/catalog?category=6',
  },
  {
    title: 'SSD накопители',
    description: 'Быстрые NVMe и SATA SSD для системы и игр',
    image: resolveImage('ssd-predator-gm7000.jpg'),
    link: '/catalog?category=4',
  },
  {
    title: 'Мониторы',
    description: 'Игровые и офисные мониторы с высокой частотой',
    image: resolveImage('monitor-msi-curved.jpg'),
    link: '/catalog?category=7',
  },
  {
    title: 'Периферия',
    description: 'Клавиатуры, мыши и аксессуары для геймеров',
    image: resolveImage('keyboard-mechanical.jpg'),
    link: '/catalog',
  },
  {
    title: 'Ремонт техники',
    description: 'Диагностика, ремонт ПК и ноутбуков с гарантией',
    image: resolveImage('liquid-cooler-360.jpg'),
    link: '/repair',
  },
] as const;

export const ADVANTAGES = [
  {
    title: 'Гарантия',
    description: 'Официальная гарантия на все товары и выполненные работы',
    icon: '🛡️',
  },
  {
    title: 'Быстрая доставка',
    description: 'Отправка по Ставрополю и региону в день заказа',
    icon: '🚀',
  },
  {
    title: 'Сервисный центр',
    description: 'Собственная мастерская с отслеживанием статуса ремонта',
    icon: '🔧',
  },
  {
    title: 'Проверенные комплектующие',
    description: 'Только оригинальная техника от надёжных поставщиков',
    icon: '✅',
  },
] as const;

export const HERO_IMAGE = resolveImage('gaming-pc-white.jpg');
