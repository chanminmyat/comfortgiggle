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
    <div className='flex min-h-screen flex-col bg-soot font-sans text-bone'>
      <Header />

      <main className='flex-1'>
        <section className='border-b border-bone/15 bg-charcoal-dark'>
          <div className='container mx-auto px-4 py-14'>
            <div className='mx-auto max-w-4xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.25em] text-ember'>
                Policy Information
              </p>
              <h1 className='mt-3 font-display text-4xl uppercase tracking-wide text-bone md:text-5xl'>{title}</h1>
              <p className='mt-4 max-w-3xl text-sm leading-7 text-bone/70'>{intro}</p>
              <p className='mt-6 inline-block border border-bone/20 bg-soot px-4 py-2 text-xs text-bone/60'>
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
                className='border border-bone/15 bg-charcoal-dark p-6 md:p-8'
              >
                {section.title ? (
                  <h2 className='mb-4 font-display text-2xl uppercase tracking-wide text-bone'>{section.title}</h2>
                ) : null}

                {section.body?.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${index}-p-${paragraphIndex}`}
                    className='mt-3 text-sm leading-7 text-bone/70 first:mt-0'
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets?.length ? (
                  <ul className='mt-4 space-y-3'>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${index}-b-${bulletIndex}`}
                        className='flex gap-3 text-sm leading-7 text-bone/70'
                      >
                        <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ember' />
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
