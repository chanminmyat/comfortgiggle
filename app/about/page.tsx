import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We provide personalized service and support throughout your journey with us.',
    },
    {
      icon: Heart,
      title: 'Passion for Design',
      description: 'We are passionate about creating beautiful spaces that inspire and bring joy to everyday living.',
    },
    {
      icon: Target,
      title: 'Sustainable Practices',
      description: 'We are committed to environmentally responsible practices and sourcing sustainable materials whenever possible.',
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
              backgroundImage: 'url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Creating beautiful spaces with timeless design and exceptional quality
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  Comfort Zone was founded with a simple yet powerful vision: to make premium interior design accessible to everyone. We believe that your home should be more than just a place to live—it should be a sanctuary that reflects your personality, supports your lifestyle, and brings you joy every single day.
                </p>
                <p>
                  Since our inception, we've been committed to curating a collection of furniture and decor that combines timeless aesthetics with modern functionality. Each piece in our collection is carefully selected for its quality, design excellence, and ability to transform living spaces into havens of comfort and style.
                </p>
                <p>
                  Our team of interior design experts works tirelessly to stay ahead of trends while maintaining a focus on classic, enduring design principles. We partner with talented designers and manufacturers who share our commitment to excellence, ensuring that every product we offer meets our rigorous standards.
                </p>
                <p>
                  Today, Comfort Zone serves thousands of satisfied customers across the country, helping them create homes they love. Whether you're furnishing your first apartment or redesigning your dream home, we're here to make the process seamless, enjoyable, and rewarding.
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
              <h2 className="text-4xl font-bold mb-6">Why Choose Comfort Zone?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">10+</div>
                  <p className="text-xl text-gray-600">Years of Experience</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">5000+</div>
                  <p className="text-xl text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-amber-700 mb-2">98%</div>
                  <p className="text-xl text-gray-600">Satisfaction Rate</p>
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
