import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle2, Sparkles, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const stats = [
    { value: '12k+', label: 'Homes styled' },
    { value: '4.9/5', label: 'Client rating' },
    { value: '150+', label: 'Designer partners' },
    { value: '48h', label: 'Avg. delivery' },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: 'Premium Quality',
      description: 'Curated collection of high-quality furniture and decor pieces designed to elevate your space.',
    },
    {
      icon: Sparkles,
      title: 'Unique Designs',
      description: 'Discover exclusive interior design concepts that reflect your personal style and taste.',
    },
    {
      icon: Users,
      title: 'Expert Designers',
      description: 'Work with talented interior designers who bring creativity and expertise to every project.',
    },
    {
      icon: TrendingUp,
      title: 'Growing Collection',
      description: 'Regularly updated inventory with the latest trends in interior design and home furnishings.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      content: 'Comfort Zone transformed my living space with their exquisite furniture collection. The quality and design exceeded all expectations!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Interior Designer',
      content: 'Working with Comfort Zone has been a game-changer for my projects. Their diverse selection and seamless ordering process make them my go-to supplier.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Owner',
      content: 'I furnished my entire office space through Comfort Zone. The professional aesthetic and durability of their products are unmatched.',
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
                  Tailored interiors, elevated living
                </p>
                <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                  Transform Your Space with
                  <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    Comfort Zone
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 md:text-xl">
                  Discover premium interior design solutions and curated collections that bring elegance, warmth, and balance to your home.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8">
                    <Link href="/products">
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-amber-200 bg-white/80 text-amber-700 hover:bg-amber-50 text-lg px-8">
                    <Link href="/contact">Book a Consult</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-20 w-20 rounded-2xl bg-amber-200/60"></div>
                <div className="absolute -bottom-10 right-6 h-24 w-24 rounded-full bg-orange-200/70"></div>
                <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Curated interior living space"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-lg">
                  <p className="text-sm font-semibold text-gray-900">Free 30-min design consult</p>
                  <p className="text-sm text-gray-500">Personalized moodboard + plan</p>
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
                Why Choose Comfort Zone
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience excellence in every detail with our comprehensive interior design solutions
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
                  Crafted for Comfort,
                  <span className="block text-amber-700">Designed for You</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At Comfort Zone, we believe that your home should be a reflection of your personality and a sanctuary of style. Our carefully curated collection features timeless pieces that combine aesthetic appeal with functional design.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  From contemporary minimalism to classic elegance, we offer diverse styles to suit every taste and space. Each product is selected with meticulous attention to quality, ensuring that your investment stands the test of time.
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
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Interior Design"
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
                Discover why thousands of customers trust Comfort Zone for their interior design needs
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
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our collection and find the perfect pieces to bring your vision to life
            </p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8">
              <Link href="/products">
                Browse Collection
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
