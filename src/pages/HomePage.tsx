import React, { useRef } from 'react';
import { ArrowUpRight, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { IMAGES, PROJECTS } from '../data/energyData';
import { PageId, ProjectCaseStudy } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';
import { useInstantHeroGsap } from '../utils/useGsapReveal';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  useInstantHeroGsap(rootRef);
  const featuredProjects = PROJECTS.slice(0, 3);

  const solutionPreviews: {
    index: string;
    title: string;
    hook: string;
    description: string;
    image: string;
    alt: string;
    page: PageId;
  }[] = [
    {
      index: '01',
      title: 'Solar Panels',
      hook: 'Save up to 85% monthly',
      description: 'Clean all-black panels built for homes and commercial roofs.',
      image: IMAGES.commercialCampus,
      alt: 'Commercial building with integrated rooftop solar array',
      page: 'solar',
    },
    {
      index: '02',
      title: 'Battery Storage',
      hook: 'Zero power cuts at night',
      description: 'Store daytime sunlight to keep lights and Wi-Fi on anytime.',
      image: IMAGES.batteryWall,
      alt: 'Matte charcoal wall-mounted modular battery storage units',
      page: 'battery',
    },
    {
      index: '03',
      title: 'Heating & Cooling',
      hook: 'Cut heating & AC costs',
      description: 'Whisper-quiet heat pumps that run cleanly on your solar power.',
      image: IMAGES.smartHvac,
      alt: 'Minimalist interior with concealed linear HVAC diffusers',
      page: 'hvac',
    },
    {
      index: '04',
      title: 'EV Charging',
      hook: 'Drive on free sunshine',
      description: 'Fast home wall chargers and shaded solar office parking.',
      image: IMAGES.evPavilion,
      alt: 'Architectural steel and timber solar EV charging pavilion',
      page: 'ev',
    },
  ];

  const strengths = [
    {
      num: '01',
      title: 'Local Licensed Teams',
      desc: 'Our own trained engineers handle your roof and wiring, never random crews.',
    },
    {
      num: '02',
      title: 'Built to Work Together',
      desc: 'Solar panels, backup batteries, heating, and EV charging connected cleanly.',
    },
    {
      num: '03',
      title: '25-Year Peace of Mind',
      desc: 'Long-term product warranties plus annual checkups keep savings steady.',
    },
    {
      num: '04',
      title: 'Zero Paperwork Stress',
      desc: 'We handle design plans, city permits, and utility approvals start to finish.',
    },
  ];

  return (
    <div ref={rootRef} className="bg-[#F9F8F5] text-[#14171A]">
      {/* 01. HERO SECTION - HOOK + FOMO + HIGH-CTR CTA + INSTANT GSAP */}
      <section className="relative w-full min-h-[100svh] pt-20 sm:pt-28 pb-6 sm:pb-12 flex flex-col justify-between bg-[#0B2A2B] overflow-hidden">
        <div className="absolute inset-0">
          <ArchImage
            src={IMAGES.corporateHero}
            alt="Modern sustainable commercial building with rooftop solar panels"
            lazy={false}
            fallbackTitle="Volterra Energy Campus"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071D1E]/75 via-[#071D1E]/45 to-[#071D1E]/90" />
        </div>

        <div className="h-1 sm:h-4 shrink-0" aria-hidden="true" />

        <PageContainer className="relative z-20 py-4 sm:py-10 text-center flex flex-col items-center">
          <button
            type="button"
            data-gsap="hero"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center gap-2 max-w-full px-3.5 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-semibold text-white hover:bg-white/25 transition-colors mb-4 sm:mb-5 cursor-pointer text-center"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
            <span>Utility rates are climbing · Grab your free Q2 property check</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
          </button>

          <h1
            data-gsap="hero"
            className="font-display font-bold text-white tracking-tight leading-[1.06] text-balance max-w-4xl"
            style={{ fontSize: 'clamp(2.05rem, 5vw, 4.35rem)' }}
          >
            Stop Overpaying for Power. Make Your Own.
          </h1>
          <p
            data-gsap="hero"
            className="mt-3.5 sm:mt-4 text-sm sm:text-lg text-white/90 max-w-xl leading-relaxed"
          >
            Save up to 85% on monthly electric bills with dependable solar panels, backup
            batteries, and clean heating built for your home or business.
          </p>

          <div
            data-gsap="hero"
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 h-12 pl-6 pr-2 rounded-full bg-white text-[#14171A] font-semibold text-sm hover:bg-[#F2F1EC] transition-colors shadow-xl cursor-pointer"
            >
              <span>Get My Free Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('assessment')}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-sm font-semibold hover:bg-white/25 transition-colors cursor-pointer"
            >
              <span>See My Savings in 30s</span>
            </button>
          </div>

          <p data-gsap="hero" className="mt-3.5 sm:mt-4 text-xs text-white/75 font-medium">
            Free property check · Clear quote in 24 hours · Zero pressure
          </p>
        </PageContainer>

        <PageContainer className="relative z-20 pt-3 sm:pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end lg:justify-between gap-3 sm:gap-6">
            <div
              data-gsap="hero"
              className="w-full lg:max-w-[320px] rounded-2xl bg-[#071D1E]/60 backdrop-blur-xl border border-white/20 p-4 sm:p-5 text-white space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-white/90">
                  Clean Power Built
                </span>
                <span className="w-8 h-8 rounded-lg bg-white text-[#1D6FE8] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 fill-current" />
                </span>
              </div>
              <div className="font-mono-num text-xl sm:text-2xl font-bold">946+ GWh</div>
              <p className="text-xs text-white/80 leading-snug">
                Helping 4,200+ families and businesses slash monthly electric bills.
              </p>
            </div>

            <div
              data-gsap="hero"
              className="w-full lg:max-w-[320px] rounded-2xl bg-[#071D1E]/60 backdrop-blur-xl border border-white/20 p-4 sm:p-5 text-white space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-white/90">
                  Q2 Install Schedule
                </span>
                <span className="w-8 h-8 rounded-lg bg-white/15 text-[#93C5FD] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
              </div>
              <div className="font-mono-num text-xl sm:text-2xl font-bold">Booking Fast</div>
              <p className="text-xs text-white/80 leading-snug">
                Lock in current solar rebates and permit spots before local windows close.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 02. COMPANY INTRODUCTION + COST OF WAITING HOOK */}
      <section className="py-14 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                One-Time Upgrade · Decades of Freedom
              </div>
              <h2
                className="font-display font-bold tracking-tight leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.85rem)' }}
              >
                Pay once for solar, say goodbye to endless monthly power bills.
              </h2>
              <p className="text-sm sm:text-base text-[#525860] leading-relaxed">
                Why keep paying rising electricity bills every single month for life? Make one smart
                upgrade today and power your own property for 25+ years. Our local engineers handle
                all permits, design, and clean installation.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 py-4 border-y border-[#E2E0D8]">
                <div>
                  <div className="font-mono-num text-xl sm:text-2xl font-bold text-[#14171A]">
                    25 Years
                  </div>
                  <div className="text-xs text-[#525860] mt-0.5">Parts &amp; power guarantee</div>
                </div>
                <div>
                  <div className="font-mono-num text-xl sm:text-2xl font-bold text-[#0B3B3C]">
                    4,200+
                  </div>
                  <div className="text-xs text-[#525860] mt-0.5">Happy homes &amp; businesses</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('assessment')}
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
                >
                  <span>Check My Bill Savings</span>
                  <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-[#0B3B3C] hover:text-[#1D6FE8] transition-colors cursor-pointer py-1"
                >
                  <span>Meet Our Team</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] border border-[#E2E0D8]">
                <ArchImage
                  src={IMAGES.heroSolar}
                  alt="Modern architectural residence with integrated solar roof array"
                  fallbackTitle="Volterra Architectural Solar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 03. OUR SOLUTIONS */}
      <section className="py-14 sm:py-24 bg-white border-y border-[#E2E0D8]">
        <PageContainer className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                Our Services
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Everything you need to cut power bills.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('solutions')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B3C] hover:text-[#1D6FE8] transition-colors cursor-pointer whitespace-nowrap w-fit"
            >
              <span>See All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div
            data-gsap="reveal-card"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {solutionPreviews.map((item) => (
              <button
                key={item.page}
                data-gsap-item
                type="button"
                onClick={() => onNavigate(item.page)}
                className="group bg-[#F9F8F5] rounded-2xl border border-[#E2E0D8] overflow-hidden text-left hover:border-[#0B3B3C] transition-colors flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#E2E0D8]">
                  <ArchImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-[#1D6FE8]">{item.hook}</div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#14171A] group-hover:text-[#0B3B3C]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#525860] leading-snug">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E0D8] flex items-center justify-between text-xs font-semibold text-[#0B3B3C] group-hover:text-[#1D6FE8]">
                    <span>See Options &amp; Pricing</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 04. FEATURED PROJECTS */}
      <section className="py-14 sm:py-24">
        <PageContainer className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                Real Customer Results
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Homes and businesses already saving.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full border border-[#14171A] text-sm font-semibold text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors cursor-pointer w-fit whitespace-nowrap"
            >
              <span>See All Projects</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          <div
            data-gsap="reveal-card"
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                data-gsap-item
                type="button"
                onClick={() => onSelectProject(project)}
                className="group bg-white rounded-2xl border border-[#E2E0D8] overflow-hidden text-left hover:border-[#0B3B3C] transition-colors flex flex-col cursor-pointer"
              >
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-[#E2E0D8]">
                  <ArchImage
                    src={project.image}
                    alt={project.title}
                    fallbackTitle={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#525860]">
                      {project.propertyType === 'Residential' ? 'Home' : 'Business'} ·{' '}
                      {project.location}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#14171A] group-hover:text-[#0B3B3C]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-xs">
                    <span className="font-mono-num font-bold text-[#0B3B3C]">
                      Saves {project.annualSavings}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#14171A] group-hover:text-[#1D6FE8]">
                      <span>See How They Save</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 05. WHY CHOOSE VOLTERRA */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E2E0D8]">
        <PageContainer className="space-y-8 sm:space-y-10">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              Why Choose Volterra
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
              Simple process, honest pricing, 25-year backing.
            </h2>
          </div>

          <div
            data-gsap="reveal-card"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {strengths.map((item) => (
              <div
                key={item.num}
                data-gsap-item
                className="bg-[#F9F8F5] rounded-2xl border border-[#E2E0D8] p-5 sm:p-6 space-y-2"
              >
                <div className="font-mono-num text-sm font-semibold text-[#1D6FE8]">
                  {item.num}
                </div>
                <h3 className="font-display text-lg font-bold text-[#14171A]">{item.title}</h3>
                <p className="text-sm text-[#525860] leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 06. FINAL FOMO + HIGH-CTR CTA */}
      <section className="relative py-16 sm:py-28 bg-[#0B2A2B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <ArchImage
            src={IMAGES.commercialCampus}
            alt="Sustainable commercial campus powered by Volterra solar"
            fallbackTitle="Volterra Energy Consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#082122]/85" />
        </div>

        <PageContainer className="relative z-10 text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#93C5FD]">
            <span>Q2 Install &amp; Rebate Spots Filling Up Fast</span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[1.08] text-balance max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.5rem)' }}
          >
            Install Solar Once. Forget High Monthly Power Bills.
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-lg mx-auto">
            Instead of paying utility bills forever, switch once and protect yourself from rising
            rates. Get a clear custom quote within 24 hours with zero pressure.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 h-12 pl-6 pr-2 rounded-full bg-white text-[#14171A] font-semibold text-sm hover:bg-[#F2F1EC] transition-colors shadow-xl cursor-pointer"
            >
              <span>Get My Free Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessment')}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-sm font-semibold hover:bg-white/25 transition-colors cursor-pointer"
            >
              <span>Calculate My Savings</span>
            </button>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#93C5FD]" />
              No upfront deposit
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#93C5FD]" />
              Quote sent in 24 hrs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#93C5FD]" />
              25-year hardware warranty
            </span>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};
