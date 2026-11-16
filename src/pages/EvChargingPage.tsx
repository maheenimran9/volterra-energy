import React from 'react';
import { ArrowUpRight, CheckCircle2, Zap, Shield, Building2 } from 'lucide-react';
import { IMAGES } from '../data/energyData';
import { PageId } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';
import { SystemBuilderTool } from '../components/interactive/SystemBuilderTool';
import { TechSpecsDrawer } from '../components/ui/TechSpecsDrawer';

interface EvChargingPageProps {
  onNavigate: (page: PageId) => void;
  onRequestCustomQuote: (summary: string) => void;
}

export const EvChargingPage: React.FC<EvChargingPageProps> = ({
  onNavigate,
  onRequestCustomQuote,
}) => {
  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-16">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              EV Charging · Drive on Free Sunshine
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
            >
              Wake up to a full electric car, powered by your own roof.
            </h1>
            <p className="text-base text-[#525860]">
              Fast wall chargers for home driveways and shaded solar canopies for offices, installed
              cleanly without overloading your main breaker panel.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onRequestCustomQuote('EV charger and solar canopy quote request')}
                className="inline-flex items-center gap-2.5 h-12 pl-6 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Get My Charger Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('assessment')}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#14171A] text-[#14171A] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <span>See Solar + EV Savings</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[16/10] border border-[#E2E0D8]">
            <ArchImage
              src={IMAGES.evPavilion}
              alt="Architectural timber and steel solar EV charging pavilion"
              lazy={false}
              fallbackTitle="Volterra Solar EV Canopy"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Residential vs Commercial */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#0B3B3C]">01. For Homeowners</div>
            <h2 className="font-display text-2xl font-bold">Fast Home Wall Chargers</h2>
            <ul className="space-y-2.5 text-sm text-[#3A3F45]">
              {[
                'Works with every major electric car and plug-in hybrid',
                'Automatically sends free extra solar power into your car battery',
                'Weatherproof sleek design for garages or outdoor driveways',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B3B3C] text-white rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#93C5FD]">02. For Workplaces &amp; Fleets</div>
            <h2 className="font-display text-2xl font-bold">Solar Carports &amp; Staff Parking</h2>
            <ul className="space-y-2.5 text-sm text-white/90">
              {[
                'Dual-car charging posts for staff, customers, and delivery vans',
                'Smart load control prevents expensive business utility surges',
                'Shaded solar parking roofs built, wired, and permitted end-to-end',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 Key Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-[#E2E0D8] py-12">
          {[
            {
              icon: <Zap className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Drive on Free Solar',
              desc: 'Uses spare afternoon sunshine from your roof so charging costs next to nothing.',
            },
            {
              icon: <Building2 className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Shaded Solar Parking',
              desc: 'Generates clean power overhead while keeping parked cars cool in summer.',
            },
            {
              icon: <Shield className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Protects Your Home Panel',
              desc: 'Adjusts charging power safely so you rarely need expensive utility upgrades.',
            },
          ].map((item) => (
            <div key={item.title} className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E8EFEF] flex items-center justify-center">
                {item.icon}
              </div>
              <h2 className="font-display text-lg font-bold text-[#14171A]">{item.title}</h2>
              <p className="text-sm text-[#525860]">{item.desc}</p>
            </div>
          ))}
        </section>

        <TechSpecsDrawer
          title="For Tech Readers: EV Charger Electrical &amp; Protocol Specs"
          subtitle="Amperage, dynamic load sharing, NACS/J1772 support, and OCPP standards."
          specs={[
            { label: 'Power Output', value: '7.4 kW – 19.2 kW (48A–80A Level 2)', note: 'Adds ~30–45 miles of range per charging hour' },
            { label: 'Connector Support', value: 'NACS & SAE J1772 Universal', note: 'Works with Tesla, Rivian, Ford, BYD, Hyundai & more' },
            { label: 'Load Management', value: 'CT-Clamp Dynamic Panel Sharing', note: 'Prevents main 100A/200A breaker overload' },
            { label: 'Solar Surplus Mode', value: '1.4 kW – 11.5 kW Auto-Adjust', note: 'Matches spare rooftop kW in real time' },
            { label: 'Weather Rating', value: 'NEMA 4X / IP66 Enclosure', note: 'Rain, dust, and UV rated for driveways or carports' },
            { label: 'Network & Billing', value: 'OCPP 2.0.1 / ISO 15118 Ready', note: 'RFID, mobile app & commercial fleet metering' },
          ]}
        />

        {/* Integrated Builder */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Build Your Solar &amp; EV Package
            </h2>
            <p className="text-sm text-[#525860]">
              Combine rooftop solar, a backup battery, and a home car charger to see your estimate.
            </p>
          </div>
          <SystemBuilderTool onRequestCustomQuote={onRequestCustomQuote} />
        </section>
      </PageContainer>
    </div>
  );
};
