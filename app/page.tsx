import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle2, Sparkles, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const stats = [
    { value: '8k+', label: 'Candles shipped' },
    { value: '4.9/5', label: 'Customer rating' },
    { value: '40+', label: 'Signature scents' },
    { value: '48h', label: 'Avg. dispatch' },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: 'Handcrafted Quality',
      description: 'Every candle is hand-poured in small batches with premium wax blends and carefully tested fragrance.',
    },
    {
      icon: Sparkles,
      title: 'Signature Scents',
      description: 'From warm vanilla and amber to fresh citrus and floral notes, find the mood that fits your moment.',
    },
    {
      icon: Users,
      title: 'Clean Burn Promise',
      description: 'Designed for a smooth, even burn with thoughtfully selected ingredients for your home.',
    },
    {
      icon: TrendingUp,
      title: 'Seasonal Drops',
      description: 'New limited collections arrive throughout the year so your space always feels fresh and inviting.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Candle Lover',
      content: 'Comfort Giggle candles have become part of my nightly routine. The scents are rich, cozy, and never overpowering.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Gift Shopper',
      content: 'I ordered gift sets for my team and everyone loved them. Beautiful packaging, fast shipping, and amazing fragrance throw.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Boutique Owner',
      content: 'Our customers keep coming back for Comfort Giggle candles. Consistent quality and seasonal releases make them easy to recommend.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"></div>
          <div className="absolute bottom-10 -left-10 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl"></div>
          <div className="container mx-auto px-4 py-20 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-amber-600"></span>
                  Hand-poured comfort, joyful glow
                </p>
                <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                  Light Up Your Space with
                  <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    Comfort Giggle
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 md:text-xl">
                  Shop handcrafted candles, wax melts, and cozy gift sets made to bring warmth, calm, and personality to every room.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8">
                    <Link href="/products">
                      Explore Candles
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-amber-200 bg-white/80 text-amber-700 hover:bg-amber-50 text-lg px-8">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-20 w-20 rounded-2xl bg-amber-200/60"></div>
                <div className="absolute -bottom-10 right-6 h-24 w-24 rounded-full bg-orange-200/70"></div>
                <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/671956/pexels-photo-671956.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Cozy candle arrangement"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-lg">
                  <p className="text-sm font-semibold text-gray-900">Free shipping on $60+</p>
                  <p className="text-sm text-gray-500">Packed with care and ready to gift</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-amber-100 bg-white">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose Comfort Giggle
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Crafted candles with clean ingredients, memorable scents, and dependable quality in every jar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-lg hover:-translate-y-1 hover:shadow-xl transition duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mb-4">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Crafted to Glow,
                  <span className="block text-amber-700">Made to Unwind</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At Comfort Giggle, we believe candles should do more than smell good. They should create a mood, help you reset, and make everyday moments feel special.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We focus on balanced fragrance profiles, clean-burning wax blends, and timeless vessel designs that fit beautifully into any home.
                </p>
                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/278508/pexels-photo-278508.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Lit candle on wooden table"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover why candle lovers keep coming back to Comfort Giggle
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg bg-white/80 backdrop-blur">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Signature Scent?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our candle collection and bring cozy, feel-good energy into every corner of your home
            </p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8">
              <Link href="/products">
                Browse Candles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
