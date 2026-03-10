'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { fetchProducts, WooCommerceProduct } from '@/lib/woocommerce';
import { addToCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { toast } from 'sonner';

export default function ProductsPage() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 12;

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { products: fetchedProducts, totalPages: pages } = await fetchProducts({
        per_page: perPage,
        page: currentPage,
      });
      setProducts(fetchedProducts);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: WooCommerceProduct, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    setCurrentPage(page);
  };

  const pageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, totalPages, currentPage]);
    pages.add(Math.max(1, currentPage - 1));
    pages.add(Math.min(totalPages, currentPage + 1));

    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Our Collection
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Discover our curated selection of scented candles, wax melts, and cozy gift sets
            </p>

            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                {searchQuery
                  ? 'No products found matching your search.'
                  : 'No products available. Please configure your WooCommerce connection.'}
              </p>
              <p className="text-gray-500 mt-4">
                Check your .env.local file and ensure your WooCommerce API credentials are correct.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].src}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                        {product.on_sale && (
                          <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">
                            Sale
                          </Badge>
                        )}
                        {product.featured && (
                          <Badge className="absolute top-4 left-4 bg-amber-600 hover:bg-amber-700">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                          {product.name}
                        </h3>

                        {product.categories && product.categories.length > 0 && (
                          <p className="text-sm text-gray-500 mb-2">
                            {product.categories.map(cat => cat.name).join(', ')}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            {product.on_sale && product.regular_price ? (
                              <>
                                <span className="text-2xl font-bold text-amber-700">
                                  ${product.price}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.regular_price}
                                </span>
                              </>
                            ) : (
                              <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full bg-amber-600 hover:bg-amber-700"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {pageNumbers().map((page, index, pages) => {
                      const previous = pages[index - 1];
                      const showEllipsis = previous && page - previous > 1;

                      return (
                        <PaginationItem key={page}>
                          {showEllipsis && <PaginationEllipsis />}
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
