import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Award, Users, Heart, Sprout } from 'lucide-react';

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
      icon: Sprout,
      title: 'Sustainable Practices',
      description: 'We continuously improve our packaging and production practices to reduce waste where possible.',
    },
  ];

  const stats = [
    { value: '5+', label: 'Years Crafting Candles' },
    { value: '8k+', label: 'Happy Candle Buyers' },
    { value: '98%', label: 'Repeat Purchase Rate' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate flex h-[360px] items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/our-story.png"
              alt="A hand lighting a Comfort Giggles candle"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-soot via-soot/70 to-soot/20" />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">About Us</p>
              <h1 className="mt-3 font-display text-6xl uppercase tracking-wide text-bone md:text-7xl">Our Story</h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-bone/70">
                Handcrafting cozy candle experiences with care, clean ingredients, and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-bone/70">
              <p>
                Comfort Giggles began with a simple idea: everyday spaces feel better with the right
                scent. We started small, hand-pouring candles in carefully tested batches for friends
                and family who wanted cozy, clean-burning candles they could trust.
              </p>
              <p>
                As demand grew, we expanded into a full collection of scented candles, wax melts, and
                gift sets designed for daily rituals, celebrations, and thoughtful gifting.
              </p>
              <p>
                Every Comfort Giggles product is built around three priorities: balanced fragrance,
                dependable burn performance, and a design that looks beautiful in any room.
              </p>
              <p>
                Today, Comfort Giggles serves candle lovers across the country. Whether you are
                setting the mood for a quiet night in or choosing gifts for someone special, we are
                here to make it easy and delightful.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-charcoal-dark py-16 md:py-20">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="font-display text-4xl uppercase tracking-wide text-bone md:text-5xl">Our Values</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-bone/60">
                The principles that guide everything we do.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="border border-bone/15 bg-soot p-7 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember/15 text-ember">
                    <value.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-bone">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-bone/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-6xl text-ember">{stat.value}</div>
                  <p className="mt-2 text-sm text-bone/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
