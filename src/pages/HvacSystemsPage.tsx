import React from 'react';
import { ArrowUpRight, Thermometer, VolumeX, Cpu, CheckCircle2, Wrench } from 'lucide-react';
import { IMAGES } from '../data/energyData';
import { PageId } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';
import { SystemBuilderTool } from '../components/interactive/SystemBuilderTool';
import { TechSpecsDrawer } from '../components/ui/TechSpecsDrawer';

interface HvacSystemsPageProps {
  onNavigate: (page: PageId) => void;
  onRequestCustomQuote: (summary: string) => void;
}

export const HvacSystemsPage: React.FC<HvacSystemsPageProps> = ({
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
              Heating &amp; Cooling · Powered by Sunshine
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
            >
              Stay cozy in winter and cool in summer, without huge energy bills.
            </h1>
            <p className="text-base text-[#525860]">
              Upgrade noisy gas boilers and clunky AC units to whisper-quiet heat pumps that run
              cleanly on your own rooftop solar power.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onRequestCustomQuote('Heating and cooling heat pump quote request')}
                className="inline-flex items-center gap-2.5 h-12 pl-6 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Get My Heating &amp; AC Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('maintenance')}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#14171A] text-[#14171A] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <span>View Care Plans</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E2E0D8] aspect-[16/10]">
            <ArchImage
              src={IMAGES.smartHvac}
              alt="Minimalist architectural interior with concealed ceiling HVAC slot diffusers"
              lazy={false}
              fallbackTitle="Quiet Home Heating & Cooling"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Heating vs Cooling Systems */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#0B3B3C]">01. Winter Heating</div>
            <h2 className="font-display text-2xl font-bold">Clean All-Weather Heating</h2>
            <ul className="space-y-2.5 text-sm text-[#3A3F45]">
              {[
                'Works reliably even in freezing winter cold down to 5°F (-15°C)',
                'Uses far less power than old electric heaters or gas furnaces',
                'Connects smoothly to your home air vents or heated floors',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B3B3C] text-white rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#93C5FD]">02. Summer Cooling</div>
            <h2 className="font-display text-2xl font-bold">Fast, Quiet Air Conditioning</h2>
            <ul className="space-y-2.5 text-sm text-white/90">
              {[
                'Keeps every room comfortable in peak summer heatwaves',
                'Sleek ceiling vents built to stay whisper-quiet indoors',
                'Cools your house during sunny afternoons before evening rates jump',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Smart Climate Control & Maintenance */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-[#E2E0D8] py-12">
          {[
            {
              icon: <Cpu className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Room-by-Room Comfort',
              desc: 'Only heat or cool the rooms people are actually using.',
            },
            {
              icon: <Thermometer className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Powered by Free Sun',
              desc: 'Automatically runs harder at midday when your solar roof makes extra power.',
            },
            {
              icon: <VolumeX className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Quiet Indoors & Out',
              desc: 'No loud banging radiators or rattling outdoor AC fans.',
            },
          ].map((c) => (
            <div key={c.title} className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E8EFEF] flex items-center justify-center">
                {c.icon}
              </div>
              <h2 className="font-display text-lg font-bold text-[#14171A]">{c.title}</h2>
              <p className="text-sm text-[#525860]">{c.desc}</p>
            </div>
          ))}
        </section>

        {/* Installation & Maintenance Banner */}
        <section className="bg-white rounded-3xl border border-[#E2E0D8] p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B3B3C]">
              <Wrench className="w-4 h-4" />
              <span>Installation &amp; Ongoing Service</span>
            </div>
            <h2 className="font-display text-2xl font-bold">
              Proper sizing, tidy ductwork, and twice-yearly tune-ups included in care plans.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('maintenance')}
            className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full border border-[#14171A] text-sm font-semibold text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors cursor-pointer w-fit shrink-0"
          >
            <span>See Care Plans</span>
            <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </section>

        <TechSpecsDrawer
          title="For Tech Readers: Heat Pump Efficiency &amp; Noise Specs"
          subtitle="SEER2/COP ratings, cold-climate inverter range, refrigerant, and decibel levels."
          specs={[
            { label: 'Seasonal Efficiency', value: 'Up to 21.5 SEER2 / 11.2 HSPF2', note: 'COP up to 4.2x energy transfer vs electric resistance' },
            { label: 'Low-Temp Operation', value: 'Vapor-Injection Down to 5°F (-15°C)', note: 'Full variable-speed inverter modulation' },
            { label: 'Acoustic Rating', value: '21 dBA Indoor / 52 dBA Outdoor', note: 'Quieter than a soft whisper indoors' },
            { label: 'Clean Refrigerant', value: 'Low-GWP R-32 / R-454B', note: 'Pre-charged sealed lines for max efficiency' },
            { label: 'Solar Integration', value: 'Automated Surplus Pre-Cooling', note: 'Shifts thermal load to sunny midday kWh' },
            { label: 'Zone Architecture', value: '1–4+ Independent Climate Zones', note: 'Smart thermostats + API & BMS compatible' },
          ]}
        />

        {/* Configurator */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Build Your Solar &amp; Heating Package
            </h2>
            <p className="text-sm text-[#525860]">
              Pick your home size and heating option to see an instant package estimate.
            </p>
          </div>
          <SystemBuilderTool onRequestCustomQuote={onRequestCustomQuote} />
        </section>
      </PageContainer>
    </div>
  );
};
