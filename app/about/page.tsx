import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Handcrafted Quality',
      description: 'We use premium wax blends, quality fragrance oils, and careful batch testing to ensure a consistent burn.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority, from first order to final burn. We are here to help with scent and gifting recommendations.',
    },
    {
      icon: Heart,
      title: 'Scent Creativity',
      description: 'We create fragrance blends that feel comforting, uplifting, and memorable across everyday moments.',
    },
    {
      icon: Target,
      title: 'Sustainable Practices',
      description: 'We continuously improve our packaging and production practices to reduce waste where possible.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Handcrafting cozy candle experiences with care and quality
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  Comfort Giggle began with a simple idea: everyday spaces feel better with the right scent. We started small, hand-pouring candles in carefully tested batches for friends and family who wanted cozy, clean-burning candles they could trust.
                </p>
                <p>
                  As demand grew, we expanded into a full collection of scented candles, wax melts, and gift sets designed for daily rituals, celebrations, and thoughtful gifting.
                </p>
                <p>
                  Every Comfort Giggle product is built around three priorities: balanced fragrance, dependable burn performance, and a design that looks beautiful in any room.
                </p>
                <p>
                  Today, Comfort Giggle serves candle lovers across the country. Whether you are setting the mood for a quiet night in or choosing gifts for someone special, we are here to make it easy and delightful.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4">
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Why Choose Comfort Giggle?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">5+</div>
                  <p className="text-xl text-gray-600">Years Crafting Candles</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">8k+</div>
                  <p className="text-xl text-gray-600">Happy Candle Buyers</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">98%</div>
                  <p className="text-xl text-gray-600">Repeat Purchase Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
