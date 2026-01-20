'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCart, removeFromCart, updateCartItemQuantity, getCartTotal, CartItem } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const shippingFee = 30;

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    setCartTotal(getCartTotal());
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div key={item.product.id}>
                        {index > 0 && <Separator className="my-6" />}
                        <div className="flex gap-6">
                          <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            {item.product.images && item.product.images.length > 0 ? (
                              <img
                                src={item.product.images[0].src}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">
                                  <Link
                                    href={`/products/${item.product.slug}`}
                                    className="hover:text-amber-700 transition-colors"
                                  >
                                    {item.product.name}
                                  </Link>
                                </h3>
                                {item.product.categories && item.product.categories.length > 0 && (
                                  <p className="text-sm text-gray-600">
                                    {item.product.categories[0].name}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.product.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 border-x min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="p-2 hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-2xl font-bold text-amber-700">
                                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ${item.product.price} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">${shippingFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-amber-700">${(cartTotal + shippingFee).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-lg"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-600 text-center mt-4">
                    No online payment required. Submit your request and we will follow up.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
