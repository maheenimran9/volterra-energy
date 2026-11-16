import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/energyData';
import { BookingServiceType, PageId } from '../types/energy';
import { PageContainer } from '../components/layout/PageContainer';
import { ArchImage } from '../components/ui/ArchImage';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
  onRequestServiceQuote: (service: BookingServiceType, summary: string) => void;
}

const SOLUTIONS = [
  {
    index: '01',
    id: 'solar' as PageId,
    serviceType: 'Solar' as BookingServiceType,
    title: 'Solar Panels',
    subtitle: 'Cut power bills up to 85%',
    description:
      'Sleek black rooftop panels built to make clean daytime electricity for 25+ years.',
    highlights: ['Clean All-Black Roof Look', 'Zero-Leak Weatherproof Mounts', '25-Year Power Guarantee'],
    image: IMAGES.commercialCampus,
    alt: 'Commercial building with integrated rooftop solar array',
  },
  {
    index: '02',
    id: 'battery' as PageId,
    serviceType: 'Battery' as BookingServiceType,
    title: 'Battery Storage',
    subtitle: 'Backup power day and night',
    description:
      'Save free sunshine for nighttime use and keep lights, Wi-Fi, and appliances running in blackouts.',
    highlights: ['Home & Business Sizes', 'Instant Blackout Switchover', '10-Year Battery Warranty'],
    image: IMAGES.batteryWall,
    alt: 'Wall-mounted modular battery storage units',
  },
  {
    index: '03',
    id: 'hvac' as PageId,
    serviceType: 'HVAC' as BookingServiceType,
    title: 'Heating & Cooling',
    subtitle: 'Warm winters, cool summers',
    description:
      'Quiet, energy-saving heat pumps that run cleanly on your own daytime solar power.',
    highlights: ['Ultra-Quiet Comfort', 'Room-by-Room Control', 'Lower Winter & Summer Bills'],
    image: IMAGES.smartHvac,
    alt: 'Modern interior with concealed ceiling HVAC vents',
  },
  {
    index: '04',
    id: 'ev' as PageId,
    serviceType: 'EV Charging' as BookingServiceType,
    title: 'EV Charging',
    subtitle: 'Drive on your own sunshine',
    description:
      'Fast home wall chargers and shaded workplace parking without pricey main-panel upgrades.',
    highlights: ['Fast Home Charging', 'Uses Extra Solar Power First', 'Shaded Business Parking'],
    image: IMAGES.evPavilion,
    alt: 'Timber and steel solar EV charging canopy',
  },
];

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onNavigate,
  onRequestServiceQuote,
}) => {
  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-16">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E2E0D8] pb-10">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              Our Services · Homes &amp; Businesses
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.35rem)' }}
            >
              Simple ways to cut your electric bill starting this season.
            </h1>
            <p className="text-base text-[#525860]">
              Pick one upgrade or bundle everything together, and we handle design, permits, and tidy installation.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() =>
                onRequestServiceQuote(
                  'Complete Energy Solution',
                  'Requesting quote for complete property energy system'
                )
              }
              className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
            >
              <span>Get Free Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessment')}
              className="inline-flex items-center h-11 px-5 rounded-full border border-[#D4D2C8] text-sm font-semibold text-[#14171A] hover:border-[#14171A] transition-colors cursor-pointer"
            >
              <span>30s Savings Calculator</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOLUTIONS.map((sol) => (
            <article
              key={sol.id}
              className="bg-white rounded-3xl border border-[#E2E0D8] overflow-hidden flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => onNavigate(sol.id)}
                className="aspect-[16/10] w-full overflow-hidden border-b border-[#E2E0D8] block cursor-pointer"
              >
                <ArchImage
                  src={sol.image}
                  alt={sol.alt}
                  fallbackTitle={sol.title}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </button>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-num text-xs font-bold text-[#1D6FE8]">
                      {sol.index}
                    </span>
                    <span className="text-xs font-semibold text-[#0B3B3C]">{sol.subtitle}</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#14171A]">{sol.title}</h2>
                  <p className="text-sm text-[#525860] leading-relaxed">{sol.description}</p>
                  <ul className="space-y-1.5 pt-2 text-sm text-[#14171A]">
                    {sol.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#ECEAE4] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate(sol.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B3C] hover:text-[#1D6FE8] transition-colors cursor-pointer"
                  >
                    <span>See How It Works</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onRequestServiceQuote(sol.serviceType, `Quote inquiry for ${sol.title}`)
                    }
                    className="h-9 px-4 rounded-full bg-[#EEF3F2] text-[#0B3B3C] hover:bg-[#0B3B3C] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};
