'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { fetchProducts, WooCommerceProduct } from '@/lib/woocommerce';
import { SAMPLE_PRODUCTS } from '@/lib/sample-products';
import { addToCart } from '@/lib/cart';
import { Search, SlidersHorizontal, X, Wand2, Leaf } from 'lucide-react';
import { toast } from 'sonner';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const SCENT_FAMILIES: { label: string; slugs: string[] }[] = [
  { label: 'Floral', slugs: ['floral'] },
  { label: 'Woody', slugs: ['woody', 'warm'] },
  { label: 'Fresh', slugs: ['fresh'] },
  { label: 'Citrus', slugs: ['citrus'] },
  { label: 'Sweet', slugs: ['vanilla', 'sweet'] },
  { label: 'Lavender', slugs: ['lavender', 'relaxing'] },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

function formatPrice(value: string) {
  const amount = parseFloat(value);
  if (Number.isNaN(amount)) return value;
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const isCustomProduct = (product: WooCommerceProduct) =>
  product.slug === 'comfort-giggle-custom-candle' ||
  product.tags?.some((tag) => tag.slug === 'custom');

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const { products } = await fetchProducts({ per_page: 100 });
        const list = products.length ? products : SAMPLE_PRODUCTS;
        if (active) setAllProducts(list);
      } catch {
        if (active) setAllProducts(SAMPLE_PRODUCTS);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const priceCeiling = useMemo(() => {
    const prices = allProducts.map((p) => parseFloat(p.price)).filter((n) => !Number.isNaN(n));
    return prices.length ? Math.ceil(Math.max(...prices)) : 100;
  }, [allProducts]);

  const familyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const family of SCENT_FAMILIES) {
      counts[family.label] = allProducts.filter((p) =>
        p.tags?.some((t) => family.slugs.includes(t.slug)),
      ).length;
    }
    return counts;
  }, [allProducts]);

  const filtered = useMemo(() => {
    let list = allProducts.filter((product) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.short_description?.toLowerCase().includes(q) ||
        product.tags?.some((t) => t.name.toLowerCase().includes(q));

      const matchesFamily =
        selectedFamilies.length === 0 ||
        selectedFamilies.some((label) => {
          const family = SCENT_FAMILIES.find((f) => f.label === label);
          return family ? product.tags?.some((t) => family.slugs.includes(t.slug)) : false;
        });

      const matchesFeatured = !featuredOnly || product.featured;
      const matchesPrice = maxPrice === null || parseFloat(product.price) <= maxPrice;

      return matchesSearch && matchesFamily && matchesFeatured && matchesPrice;
    });

    list = [...list].sort((a, b) => {
      // Always pin the customizable candle to the top.
      const aCustom = isCustomProduct(a) ? 0 : 1;
      const bCustom = isCustomProduct(b) ? 0 : 1;
      if (aCustom !== bCustom) return aCustom - bCustom;

      switch (sort) {
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return (b.total_sales || 0) - (a.total_sales || 0);
      }
    });

    return list;
  }, [allProducts, searchQuery, selectedFamilies, featuredOnly, maxPrice, sort]);

  const toggleFamily = (label: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFamilies([]);
    setFeaturedOnly(false);
    setMaxPrice(null);
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedFamilies.length > 0 || featuredOnly || maxPrice !== null;

  const handlePrimaryAction = (product: WooCommerceProduct, e: React.MouseEvent) => {
    e.preventDefault();
    if (isCustomProduct(product)) {
      router.push(`/products/${product.slug}`);
      return;
    }
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <label htmlFor="shop-search" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
          Search
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            id="shop-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candles..."
            className="w-full border border-ink/20 bg-cream py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-taupe focus:border-olive focus:outline-none"
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-taupe">Scent</legend>
        <div className="space-y-2.5">
          {SCENT_FAMILIES.map((family) => (
            <label
              key={family.label}
              className="flex cursor-pointer items-center gap-3 text-sm text-ink/80 hover:text-ink"
            >
              <input
                type="checkbox"
                checked={selectedFamilies.includes(family.label)}
                onChange={() => toggleFamily(family.label)}
                className="h-4 w-4 accent-olive"
              />
              <span className="flex-1">{family.label}</span>
              <span className="text-xs text-taupe">{familyCounts[family.label] ?? 0}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
          Max Price{maxPrice !== null ? `: $${maxPrice}` : ''}
        </legend>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={1}
          value={maxPrice ?? priceCeiling}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-olive"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-taupe">
          <span>$0</span>
          <span>${priceCeiling}</span>
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-ink/80 hover:text-ink">
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) => setFeaturedOnly(e.target.checked)}
          className="h-4 w-4 accent-olive"
        />
        Featured only
      </label>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center gap-1.5 text-sm text-olive hover:text-olive-dark"
        >
          <X className="h-4 w-4" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />

      <main className="flex-1">
        {/* Page intro */}
        <section className="border-b border-clay/60 bg-sand/60">
          <div className="container mx-auto px-4 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">Shop</p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Our Candle Collection</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/70">
              Hand-poured with natural ingredients and clean fragrances. Find the scent that fits
              your moment.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
            {/* Sidebar filters (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">{FilterPanel}</div>
            </aside>

            {/* Results */}
            <div>
              {/* Toolbar */}
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-clay/60 pb-4">
                <p className="text-sm text-taupe">
                  {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="inline-flex items-center gap-2 border border-ink/20 px-3 py-2 text-sm text-ink lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-taupe">
                      Sort
                    </label>
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="border border-ink/20 bg-cream px-3 py-2 text-sm text-ink focus:border-olive focus:outline-none"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className="aspect-square animate-pulse bg-sand" />
                      <div className="mt-4 h-4 w-2/3 animate-pulse bg-sand" />
                      <div className="mt-2 h-4 w-1/3 animate-pulse bg-sand" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center py-24 text-center">
                  <Leaf className="h-10 w-10 text-olive/40" strokeWidth={1.25} />
                  <p className="mt-4 font-serif text-2xl text-ink">No candles found</p>
                  <p className="mt-2 text-sm text-taupe">Try adjusting your filters or search.</p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-6 border border-ink/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
                  {filtered.map((product) => (
                    <article key={product.id} className="group flex flex-col">
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative block aspect-square overflow-hidden bg-sand"
                      >
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-taupe">No image</div>
                        )}
                        {product.featured && (
                          <span className="absolute left-3 top-3 bg-olive px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                            Featured
                          </span>
                        )}
                      </Link>
                      <div className="mt-4 flex flex-1 flex-col text-center">
                        <h2 className="font-serif text-lg text-ink">
                          <Link href={`/products/${product.slug}`} className="transition-colors hover:text-olive">
                            {product.name}
                          </Link>
                        </h2>
                        {product.short_description && (
                          <p className="mt-1 line-clamp-1 text-xs text-taupe">{product.short_description}</p>
                        )}
                        <p className="mt-1 text-sm text-ink/80">{formatPrice(product.price)}</p>
                        <button
                          type="button"
                          onClick={(e) => handlePrimaryAction(product, e)}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-ink/30 px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                        >
                          {isCustomProduct(product) ? (
                            <>
                              <Wand2 className="h-4 w-4" />
                              Customize
                            </>
                          ) : (
                            'Add to Cart'
                          )}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-cream p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink">Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-md p-1.5 text-ink hover:bg-sand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full bg-olive px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-olive-dark"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col bg-cream">
          <Header />
          <div className="flex-1" />
          <Footer />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
