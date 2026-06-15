import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type PolicySection = {
  title?: string;
  body?: string[];
  bullets?: string[];
};

type PolicyPageProps = {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: PolicySection[];
};

export function PolicyPage({
  title,
  effectiveDate,
  intro,
  sections,
}: PolicyPageProps) {
  return (
    <div className='flex min-h-screen flex-col bg-cream font-sans text-ink'>
      <Header />

      <main className='flex-1'>
        <section className='border-b border-clay/60 bg-sand/60'>
          <div className='container mx-auto px-4 py-14'>
            <div className='mx-auto max-w-4xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.25em] text-taupe'>
                Policy Information
              </p>
              <h1 className='mt-3 font-serif text-4xl text-ink md:text-5xl'>{title}</h1>
              <p className='mt-4 max-w-3xl text-sm leading-7 text-ink/70'>{intro}</p>
              <p className='mt-6 inline-block border border-clay bg-cream px-4 py-2 text-xs text-taupe'>
                Effective Date: {effectiveDate}
              </p>
            </div>
          </div>
        </section>

        <div className='container mx-auto px-4 py-12'>
          <div className='mx-auto max-w-4xl space-y-6'>
            {sections.map((section, index) => (
              <section
                key={`${section.title || "section"}-${index}`}
                className='border border-clay bg-cream p-6 md:p-8'
              >
                {section.title ? (
                  <h2 className='mb-4 font-serif text-2xl text-ink'>{section.title}</h2>
                ) : null}

                {section.body?.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${index}-p-${paragraphIndex}`}
                    className='mt-3 text-sm leading-7 text-ink/70 first:mt-0'
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets?.length ? (
                  <ul className='mt-4 space-y-3'>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${index}-b-${bulletIndex}`}
                        className='flex gap-3 text-sm leading-7 text-ink/70'
                      >
                        <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-olive' />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
