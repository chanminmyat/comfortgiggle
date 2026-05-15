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
    <div className='min-h-screen flex flex-col bg-stone-50'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-8 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-stone-100 shadow-sm'>
              <div className='border-b border-amber-100 px-8 py-6'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-amber-700'>
                  Policy Information
                </p>
                <h1 className='mt-3 text-4xl font-bold text-stone-900 md:text-5xl'>
                  {title}
                </h1>
                <p className='mt-4 max-w-3xl text-base leading-7 text-stone-600'>
                  {intro}
                </p>
              </div>
              <div className='flex flex-wrap gap-3 px-8 py-5 text-sm text-stone-600'>
                <span className='rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200'>
                  Effective Date: {effectiveDate}
                </span>
              </div>
            </div>

            <div className='space-y-6'>
              {sections.map((section, index) => (
                <section
                  key={`${section.title || "section"}-${index}`}
                  className='rounded-2xl border border-stone-200 bg-white p-6 shadow-sm'
                >
                  {section.title ? (
                    <h2 className='mb-4 text-2xl font-semibold text-stone-900'>
                      {section.title}
                    </h2>
                  ) : null}

                  {section.body?.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${index}-p-${paragraphIndex}`}
                      className='mt-3 text-base leading-7 text-stone-700 first:mt-0'
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className='mt-4 space-y-3'>
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={`${index}-b-${bulletIndex}`}
                          className='flex gap-3 text-base leading-7 text-stone-700'
                        >
                          <span className='mt-2 h-2.5 w-2.5 flex-none rounded-full bg-amber-500' />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
