import React from 'react';
import { ArrowUpRight, Globe, ShieldCheck, Layers, Award, CheckCircle2 } from 'lucide-react';
import { IMAGES, REGION_CONFIG } from '../data/energyData';
import { PageId } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
}

const LEADERSHIP = [
  {
    name: 'Dr. Henrik Lindholm',
    role: 'Chief Executive Officer',
    bio: '18 years helping homeowners and businesses switch smoothly to solar and clean power.',
  },
  {
    name: 'Amara Okafor, PE',
    role: 'Head of Engineering',
    bio: 'Licensed structural and electrical engineer making sure every roof and wiring plan passes safely.',
  },
  {
    name: 'Callum MacLeod',
    role: 'Director of Batteries & Heating',
    bio: 'Leads backup battery and quiet heat pump installs across all four countries.',
  },
];

const MILESTONES = [
  { year: '2018', title: 'Started in Austin', detail: 'Opened our first home and business solar team.' },
  { year: '2020', title: 'London & Toronto', detail: 'Expanded local teams across the UK and Canada.' },
  { year: '2022', title: 'Sydney Office', detail: 'Added coastal solar and backup battery service in NSW.' },
  { year: '2025', title: '4,200+ Happy Clients', detail: 'Surpassed 946 GWh of clean power generated.' },
];

const CERTIFICATIONS = [
  { region: 'United States', code: 'NABCEP & National Electrical Code Certified' },
  { region: 'United Kingdom', code: 'MCS & IET Approved Installer' },
  { region: 'Australia', code: 'Clean Energy Council (CEC) Approved' },
  { region: 'Canada', code: 'CSA Group & ESA Licensed' },
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-10 sm:py-16">
      <PageContainer className="space-y-12 sm:space-y-16">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              About Volterra Energy
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
            >
              Real local engineers who stick around long after installation day.
            </h1>
            <p className="text-base text-[#525860] leading-relaxed">
              We don&apos;t hand your roof off to random subcontractors. Our own licensed teams handle
              every step, from permits and neat installation to 25-year care.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 h-12 pl-6 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Speak With Our Team</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E2E0D8] aspect-[16/10] w-full">
            <ArchImage
              src={IMAGES.londonHub}
              alt="Volterra regional engineering hub in London"
              lazy={false}
              fallbackTitle="Volterra International Teams"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 flex flex-col justify-between gap-4 h-full">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                Our Promise
              </div>
              <h2 className="font-display text-2xl font-bold leading-snug">
                One accountable team from your first phone call to year 25.
              </h2>
            </div>
            <p className="text-sm text-[#525860] leading-relaxed">
              No pushy salespeople or confusing handoffs, just clear answers and neat work.
            </p>
          </div>

          <div className="bg-[#0B3B3C] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-4 h-full">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                Our Goal
              </div>
              <h2 className="font-display text-2xl font-bold leading-snug">
                Make clean, lower-cost power simple for every home and business.
              </h2>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Connecting solar panels, backup batteries, heating, and EV chargers into one smooth setup.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E0D8] border-y border-[#E2E0D8] py-10 sm:py-12">
          {[
            {
              icon: <Globe className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Licensed Everywhere We Work',
              desc: 'Fully certified across the USA, UK, Australia, and Canada, following every local code.',
            },
            {
              icon: <Layers className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Designed For Your Home',
              desc: 'We match panel size, battery backup, and heating to your real monthly electric bills.',
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#0B3B3C]" />,
              title: 'Long-Term Support',
              desc: 'Annual checkups, cleaning, and fast customer help whenever you need us.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="py-6 first:pt-0 last:pb-0 md:py-0 md:px-7 first:md:pl-0 last:md:pr-0 flex flex-col items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EFEF] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-[#525860] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Milestones */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Our Journey</h2>
            <p className="text-sm text-[#525860]">Seven years of steady, in-house growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="border-t-2 border-[#0B3B3C] pt-4 flex flex-col justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="font-mono-num text-2xl font-bold text-[#1D6FE8]">{m.year}</div>
                  <div className="font-display text-lg font-bold">{m.title}</div>
                </div>
                <p className="text-sm text-[#525860] leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership & Certifications */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 flex flex-col justify-between gap-6 h-full">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                Engineering Leadership
              </div>
              <h2 className="font-display text-2xl font-bold">Leadership Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E0D8] flex-1">
              {LEADERSHIP.map((leader) => (
                <div
                  key={leader.name}
                  className="py-5 first:pt-0 last:pb-0 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col justify-start gap-2.5"
                >
                  <div>
                    <div className="font-display text-base font-bold">{leader.name}</div>
                    <div className="text-xs font-semibold text-[#1D6FE8] mt-0.5">{leader.role}</div>
                  </div>
                  <p className="text-sm text-[#525860] leading-relaxed">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 flex flex-col justify-between gap-5 h-full">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                <Award className="w-4 h-4 shrink-0" />
                <span>Accredited</span>
              </div>
              <h2 className="font-display text-2xl font-bold">Certifications</h2>
            </div>

            <ul className="space-y-3.5 text-sm flex-1 flex flex-col justify-center">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.region} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{cert.region}</div>
                    <div className="text-xs text-[#525860]">{cert.code}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Regional Offices */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Regional Offices</h2>
            <p className="text-sm text-[#525860]">Local engineering hubs across four countries.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {Object.entries(REGION_CONFIG).map(([code, hub]) => (
              <div
                key={code}
                className="bg-white rounded-2xl border border-[#E2E0D8] p-5 sm:p-6 flex flex-col justify-between gap-4 h-full"
              >
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                    {hub.name}
                  </div>
                  <div className="font-display text-lg font-bold">{hub.hubCity}</div>
                  <p className="text-xs text-[#525860] leading-relaxed">{hub.address}</p>
                </div>
                <div className="pt-3 border-t border-[#E2E0D8]">
                  <a
                    href={`tel:${hub.phone.replace(/[^+\d]/g, '')}`}
                    className="font-mono-num text-xs font-semibold text-[#1D6FE8] hover:underline"
                  >
                    {hub.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    </div>
  );
};
