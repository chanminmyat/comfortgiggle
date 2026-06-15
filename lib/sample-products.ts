import type { WooCommerceProduct } from '@/lib/woocommerce';

const scentedCandlesCategory = {
  id: 101,
  name: 'Scented Candles',
  slug: 'scented-candles',
};

const customCandlesCategory = {
  id: 104,
  name: 'Custom Candles',
  slug: 'custom-candles',
};

type SeedProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  description: string;
  short_description: string;
  featured: boolean;
  total_sales: number;
  image: string;
  alt: string;
  tags: Array<{ id: number; name: string; slug: string }>;
};

const seeds: SeedProduct[] = [
  {
    id: 9001,
    name: 'Vanilla Bliss',
    slug: 'vanilla-bliss',
    sku: 'CG-VAN-001',
    price: '18.00',
    description:
      '<p>A warm, comforting vanilla candle hand-poured in an amber glass jar.</p><p>Burn time: 45+ hours.</p>',
    short_description: 'Warm, sweet vanilla for cosy evenings.',
    featured: true,
    total_sales: 320,
    image: '/products/vanila_bliss.png',
    alt: 'Vanilla Bliss candle in amber jar',
    tags: [
      { id: 201, name: 'vanilla', slug: 'vanilla' },
      { id: 202, name: 'woody', slug: 'woody' },
    ],
  },
  {
    id: 9002,
    name: 'White Lily',
    slug: 'white-lily',
    sku: 'CG-LIL-002',
    price: '18.00',
    description:
      '<p>A soft, fresh floral candle in a brushed gold travel tin.</p><p>Burn time: 30+ hours.</p>',
    short_description: 'Soft, fresh white floral notes.',
    featured: true,
    total_sales: 210,
    image: '/products/white_lily.png',
    alt: 'White Lily candle in gold tin',
    tags: [
      { id: 203, name: 'floral', slug: 'floral' },
      { id: 204, name: 'fresh', slug: 'fresh' },
    ],
  },
  {
    id: 9003,
    name: 'Sandalwood',
    slug: 'sandalwood',
    sku: 'CG-SAN-003',
    price: '24.00',
    description:
      '<p>A rich, grounding sandalwood candle in an amber glass jar.</p><p>Burn time: 45+ hours.</p>',
    short_description: 'Warm, rich & grounding sandalwood.',
    featured: true,
    total_sales: 290,
    image: '/products/sandalwood.png',
    alt: 'Sandalwood candle in amber jar',
    tags: [
      { id: 205, name: 'woody', slug: 'woody' },
      { id: 206, name: 'warm', slug: 'warm' },
    ],
  },
  {
    id: 9004,
    name: 'Lemon Fresh',
    slug: 'lemon-fresh',
    sku: 'CG-LEM-004',
    price: '18.00',
    description:
      '<p>A bright, uplifting lemon candle in a clear glass tumbler.</p><p>Burn time: 40+ hours.</p>',
    short_description: 'Clean, light & uplifting citrus.',
    featured: true,
    total_sales: 240,
    image: '/products/lemon_fresh.png',
    alt: 'Lemon Fresh candle in clear glass',
    tags: [
      { id: 207, name: 'citrus', slug: 'citrus' },
      { id: 208, name: 'fresh', slug: 'fresh' },
    ],
  },
  {
    id: 9005,
    name: 'Oatmeal Milk & Honey',
    slug: 'oatmeal-milk-and-honey',
    sku: 'CG-OAT-005',
    price: '20.00',
    description:
      '<p>A creamy, cosy oatmeal, milk & honey candle in a clear glass tumbler.</p><p>Burn time: 40+ hours.</p>',
    short_description: 'Creamy, cosy comfort scent.',
    featured: false,
    total_sales: 180,
    image: '/products/oatmeal_milk_and_honey.png',
    alt: 'Oatmeal Milk & Honey candle in clear glass',
    tags: [
      { id: 209, name: 'sweet', slug: 'sweet' },
      { id: 210, name: 'cozy', slug: 'cozy' },
    ],
  },
  {
    id: 9006,
    name: 'Lavender Dream',
    slug: 'lavender-dream',
    sku: 'CG-LAV-006',
    price: '20.00',
    description:
      '<p>A calming lavender candle in a frosted glass jar, perfect for evening wind-down.</p><p>Burn time: 40+ hours.</p>',
    short_description: 'Calming lavender for restful evenings.',
    featured: false,
    total_sales: 260,
    image: '/products/lavender_dream.png',
    alt: 'Lavender Dream candle in frosted glass',
    tags: [
      { id: 211, name: 'lavender', slug: 'lavender' },
      { id: 212, name: 'relaxing', slug: 'relaxing' },
    ],
  },
  {
    id: 9007,
    name: 'Apple Cinnamon',
    slug: 'apple-cinnamon',
    sku: 'CG-APP-007',
    price: '20.00',
    description:
      '<p>A cozy autumn blend of crisp apple and warm cinnamon in an amber glass jar.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Crisp apple & warm cinnamon.',
    featured: false,
    total_sales: 150,
    image: '/products/apple_cinnamon.png',
    alt: 'Apple Cinnamon candle in amber jar',
    tags: [
      { id: 215, name: 'sweet', slug: 'sweet' },
      { id: 216, name: 'warm', slug: 'warm' },
    ],
  },
  {
    id: 9008,
    name: 'Eucalyptus Mint',
    slug: 'eucalyptus-mint',
    sku: 'CG-EUC-008',
    price: '20.00',
    description:
      '<p>A refreshing spa blend of eucalyptus and cool mint in a clear glass tumbler.</p><p>Hand-poured soy candle · 8 oz / 226 g.</p>',
    short_description: 'Refreshing eucalyptus & cool mint.',
    featured: true,
    total_sales: 170,
    image: '/products/eucalyptus_mint.png',
    alt: 'Eucalyptus Mint candle in clear glass',
    tags: [
      { id: 217, name: 'fresh', slug: 'fresh' },
      { id: 218, name: 'herbal', slug: 'herbal' },
    ],
  },
  {
    id: 9009,
    name: 'Coffee Caramel',
    slug: 'coffee-caramel',
    sku: 'CG-COF-009',
    price: '22.00',
    description:
      '<p>A rich, comforting blend of fresh coffee and sweet caramel in an amber glass jar.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Rich coffee & sweet caramel.',
    featured: false,
    total_sales: 190,
    image: '/products/coffee_caramel.png',
    alt: 'Coffee Caramel candle in amber jar',
    tags: [
      { id: 219, name: 'sweet', slug: 'sweet' },
      { id: 220, name: 'warm', slug: 'warm' },
    ],
  },
  {
    id: 9010,
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    sku: 'CG-OCN-010',
    price: '20.00',
    description:
      '<p>A clean, airy coastal scent of sea salt and fresh ocean air in a clear glass tumbler.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Clean, airy coastal sea breeze.',
    featured: false,
    total_sales: 160,
    image: '/products/ocean_breeze.png',
    alt: 'Ocean Breeze candle in clear glass',
    tags: [
      { id: 221, name: 'fresh', slug: 'fresh' },
      { id: 222, name: 'aquatic', slug: 'aquatic' },
    ],
  },
  {
    id: 9011,
    name: 'Rose Petal',
    slug: 'rose-petal',
    sku: 'CG-ROS-011',
    price: '22.00',
    description:
      '<p>A romantic, delicate rose blend in an elegant glass jar.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Romantic, delicate rose.',
    featured: true,
    total_sales: 200,
    image: '/products/rose_petal.png',
    alt: 'Rose Petal candle in glass jar',
    tags: [
      { id: 223, name: 'floral', slug: 'floral' },
      { id: 224, name: 'romantic', slug: 'romantic' },
    ],
  },
  {
    id: 9012,
    name: 'Fireside Cedar',
    slug: 'fireside-cedar',
    sku: 'CG-CED-012',
    price: '24.00',
    description:
      '<p>A warm, grounding blend of cedarwood and smoky firewood in an amber glass jar.</p><p>Natural soy wax candle · 10 oz / 283 g.</p>',
    short_description: 'Warm cedarwood & cozy firewood.',
    featured: false,
    total_sales: 175,
    image: '/products/fireside_cedar.png',
    alt: 'Fireside Cedar candle in amber jar',
    tags: [
      { id: 225, name: 'woody', slug: 'woody' },
      { id: 226, name: 'warm', slug: 'warm' },
    ],
  },
  {
    id: 9013,
    name: 'Jasmine Tea',
    slug: 'jasmine-tea',
    sku: 'CG-JAS-013',
    price: '22.00',
    description:
      '<p>A soft, elegant blend of jasmine blossom and green tea in a clear glass tumbler.</p><p>Natural soy wax candle · 9 oz / 255 g.</p>',
    short_description: 'Soft jasmine blossom & green tea.',
    featured: false,
    total_sales: 165,
    image: '/products/jasmine_tea.png',
    alt: 'Jasmine Tea candle in clear glass',
    tags: [
      { id: 227, name: 'floral', slug: 'floral' },
      { id: 228, name: 'fresh', slug: 'fresh' },
    ],
  },
  {
    id: 9014,
    name: 'Fig & Amber',
    slug: 'fig-and-amber',
    sku: 'CG-FIG-014',
    price: '24.00',
    description:
      '<p>A rich, sophisticated blend of ripe fig and warm amber.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Ripe fig & warm amber.',
    featured: true,
    total_sales: 185,
    image: '/products/fig_and_amber.png',
    alt: 'Fig & Amber candle',
    tags: [
      { id: 229, name: 'woody', slug: 'woody' },
      { id: 230, name: 'sweet', slug: 'sweet' },
    ],
  },
  {
    id: 9015,
    name: 'Coconut Vanilla',
    slug: 'coconut-vanilla',
    sku: 'CG-COC-015',
    price: '20.00',
    description:
      '<p>A creamy, tropical blend of coconut and smooth vanilla.</p><p>Hand-poured soy candle · 9 oz / 255 g.</p>',
    short_description: 'Creamy coconut & smooth vanilla.',
    featured: false,
    total_sales: 195,
    image: '/products/coconut_vanilla.png',
    alt: 'Coconut Vanilla candle',
    tags: [
      { id: 231, name: 'sweet', slug: 'sweet' },
      { id: 232, name: 'vanilla', slug: 'vanilla' },
    ],
  },
];

export const SAMPLE_PRODUCTS: WooCommerceProduct[] = [
  ...seeds.map((seed) => ({
    id: seed.id,
    name: seed.name,
    slug: seed.slug,
    permalink: `/products/${seed.slug}`,
    type: 'simple',
    status: 'publish',
    featured: seed.featured,
    description: seed.description,
    short_description: seed.short_description,
    sku: seed.sku,
    price: seed.price,
    regular_price: seed.price,
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: seed.total_sales,
    virtual: false,
    downloadable: false,
    images: [
      {
        id: seed.id + 100,
        src: seed.image,
        name: seed.name,
        alt: seed.alt,
      },
    ],
    categories: [scentedCandlesCategory],
    tags: seed.tags,
    stock_status: 'instock',
    stock_quantity: 50,
    manage_stock: true,
  })),
  {
    id: 9900,
    name: 'Comfort Giggle Custom Candle',
    slug: 'comfort-giggle-custom-candle',
    permalink: '/products/comfort-giggle-custom-candle',
    type: 'simple',
    status: 'publish',
    featured: true,
    description:
      '<p>Create your own custom candle by choosing your scent profile, jar color, size, and label text.</p><p>According to your selected options, we will send you the price and production time.</p>',
    short_description: 'Choose your options and we will send the price.',
    sku: 'CG-CUSTOM-001',
    price: '28.00',
    regular_price: '28.00',
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 14,
    virtual: false,
    downloadable: false,
    images: [
      {
        id: 9107,
        src: '/products/vanila_bliss.png',
        name: 'Comfort Giggle Custom Candle',
        alt: 'Custom candle with personalized label',
      },
    ],
    categories: [customCandlesCategory],
    tags: [
      { id: 213, name: 'custom', slug: 'custom' },
      { id: 214, name: 'personalized', slug: 'personalized' },
    ],
    stock_status: 'instock',
    stock_quantity: 15,
    manage_stock: true,
  },
];
