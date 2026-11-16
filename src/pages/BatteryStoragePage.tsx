import React from 'react';
import { ArrowUpRight, Shield, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/energyData';
import { PageId } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';
import { BatterySimulatorTool } from '../components/interactive/BatterySimulatorTool';
import { TechSpecsDrawer } from '../components/ui/TechSpecsDrawer';

interface BatteryStoragePageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const BatteryStoragePage: React.FC<BatteryStoragePageProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-16">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              Backup Battery Storage · Zero Blackout Stress
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
            >
              Keep the lights on in blackouts, and skip pricey evening power rates.
            </h1>
            <p className="text-base text-[#525860]">
              Store free daytime sunshine in safe home or business batteries so your fridge, Wi-Fi,
              and rooms stay running smoothly all night.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2.5 h-12 pl-6 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Get My Battery Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('assessment')}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#14171A] text-[#14171A] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <span>Calculate Battery Size</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E2E0D8] aspect-[16/10]">
            <ArchImage
              src={IMAGES.batteryWall}
              alt="Dual matte charcoal modular home battery storage units on concrete wall"
              lazy={false}
              fallbackTitle="Volterra Home Backup Batteries"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Home vs Commercial Storage */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#0B3B3C]">01. For Homeowners</div>
            <h2 className="font-display text-2xl font-bold">Slim Wall-Mounted Backup</h2>
            <ul className="space-y-2.5 text-sm text-[#3A3F45]">
              {[
                'Flexible sizes from overnight essentials to whole-home backup',
                'Weather-sealed design fits neatly in your garage or outside wall',
                'Backed by a 10-year performance and replacement warranty',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B3B3C] text-white rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#93C5FD]">02. For Businesses</div>
            <h2 className="font-display text-2xl font-bold">Commercial Backup &amp; Rate Shaving</h2>
            <ul className="space-y-2.5 text-sm text-white/90">
              {[
                'Expandable cabinets from 80 kWh up to 500+ kWh for busy sites',
                'Automatically lowers expensive peak utility demand fees',
                'Protects servers, freezers, and point-of-sale systems in outages',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 Core Technology & Backup Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-[#E2E0D8] py-12">
          {[
            {
              icon: <Shield className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Safe, Long-Life Batteries',
              desc: 'Built without cobalt to stay cool, safe, and reliable for 10+ years of daily charging.',
            },
            {
              icon: <Zap className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Skip Evening Price Spikes',
              desc: 'Runs your home on stored solar power when utility rates are highest.',
            },
            {
              icon: <Clock className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Instant Outage Protection',
              desc: 'Switches on automatically in a split second, with no noisy gas generator needed.',
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
          title="For Tech Readers: Battery Chemistry &amp; Transfer Specs"
          subtitle="LFP safety ratings, automatic transfer latency, and continuous surge power specs."
          specs={[
            { label: 'Cell Chemistry', value: 'Cobalt-Free LiFePO4 (LFP)', note: '> 6,000 charge cycles at 80% depth of discharge' },
            { label: 'Outage Switchover', value: '< 20 ms Automatic Transfer', note: 'Keeps Wi-Fi routers, PCs, and fridges uninterrupted' },
            { label: 'Continuous Output', value: '10 kW – 11.4 kW / Unit', note: 'Stackable AC/DC coupling for high surge HVAC' },
            { label: 'Enclosure & Safety', value: 'UL 9540A & IP65 Weatherproof', note: 'Operates from -4°F to 122°F (-20°C to 50°C)' },
            { label: 'Round-Trip Efficiency', value: '~90% DC-Coupled', note: 'Automated peak-tariff & TOU scheduling' },
            { label: 'Warranty Coverage', value: '10–15 Years / 70% Retention', note: 'Remote firmware health & cell diagnostics' },
          ]}
        />

        {/* Interactive Battery Backup Simulator */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              See How Long a Battery Powers Your Home
            </h2>
            <p className="text-sm text-[#525860]">
              Pick what you want to keep running during a power cut and see your backup hours right
              away.
            </p>
          </div>
          <BatterySimulatorTool />
        </section>
      </PageContainer>
    </div>
  );
};
