import React from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Sun, Cpu, Wrench } from 'lucide-react';
import { IMAGES, PROJECTS } from '../data/energyData';
import { PageId, ProjectCaseStudy } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';
import { SystemBuilderTool } from '../components/interactive/SystemBuilderTool';
import { TechSpecsDrawer } from '../components/ui/TechSpecsDrawer';

interface SolarSolutionsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onRequestCustomQuote: (summary: string) => void;
}

export const SolarSolutionsPage: React.FC<SolarSolutionsPageProps> = ({
  onNavigate,
  onSelectProject,
  onRequestCustomQuote,
}) => {
  const solarProjects = PROJECTS.filter((p) => p.categories.includes('Solar')).slice(0, 3);

  const benefits = [
    { icon: <Sun className="w-5 h-5 text-[#0B3B3C]" />, title: 'Lower Power Bills', desc: 'Cut monthly electric bills by up to 85% from day one.' },
    { icon: <Cpu className="w-5 h-5 text-[#0B3B3C]" />, title: 'High-Output Panels', desc: 'Sleek black panels built to perform well even in cloudy weather.' },
    { icon: <Shield className="w-5 h-5 text-[#0B3B3C]" />, title: '25-Year Warranty', desc: 'Protected power output and roof workmanship for 25 years.' },
    { icon: <Wrench className="w-5 h-5 text-[#0B3B3C]" />, title: 'Zero Paperwork Stress', desc: 'We handle custom plans, city permits, and utility approvals.' },
  ];

  const installSteps = [
    { step: '01', title: 'Free Roof Check', desc: 'We check your roof sun and past bills.' },
    { step: '02', title: 'Plans & Permits', desc: 'We prepare drawings and city approvals.' },
    { step: '03', title: 'Neat Install', desc: 'Clean mounting with weather-sealed wiring.' },
    { step: '04', title: 'Switch On & Save', desc: 'Final safety check and utility hookup.' },
  ];

  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-16">
        {/* Page Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              Solar Panels · Cut Bills Up to 85%
            </div>
            <h1
              className="font-display font-bold tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
            >
              Install solar once. Escape endless monthly power bills forever.
            </h1>
            <p className="text-base text-[#525860]">
              Why pay utility companies month after month when one smart solar setup gives your home
              or business decades of free daytime electricity? Our local teams handle everything.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onRequestCustomQuote('Solar panel installation quote request')}
                className="inline-flex items-center gap-2.5 h-12 pl-6 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Get My Solar Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('assessment')}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#14171A] text-[#14171A] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <span>See My Savings in 30s</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E2E0D8] aspect-[16/10]">
            <ArchImage
              src={IMAGES.commercialCampus}
              alt="Commercial corporate campus solar rooftop and EV charging canopy"
              lazy={false}
              fallbackTitle="Volterra Commercial & Residential Solar"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Residential vs Commercial */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#0B3B3C]">01. For Homeowners</div>
            <h2 className="font-display text-2xl font-bold">Sleek All-Black Roof Panels</h2>
            <ul className="space-y-2.5 text-sm text-[#3A3F45]">
              {[
                'Low-profile all-black panels that look great on any roof',
                'Hidden wiring and waterproof seals to protect your roof',
                'Live phone app tracking plus a 25-year performance warranty',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B3B3C] text-white rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="text-xs font-semibold text-[#93C5FD]">02. For Businesses</div>
            <h2 className="font-display text-2xl font-bold">Rooftop &amp; Shaded Carport Solar</h2>
            <ul className="space-y-2.5 text-sm text-white/90">
              {[
                'Non-drilling roof mounts engineered to protect commercial flat roofs',
                'Sized to wipe out costly daytime business electricity rates',
                'Easy to pair with EV parking canopies and backup batteries',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 Key Benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-y border-[#E2E0D8] py-12">
          {benefits.map((item) => (
            <div key={item.title} className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E8EFEF] flex items-center justify-center">
                {item.icon}
              </div>
              <h2 className="font-display text-lg font-bold text-[#14171A]">{item.title}</h2>
              <p className="text-sm text-[#525860]">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 4-Step Installation Process */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            How It Works (4 Simple Steps)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {installSteps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-[#E2E0D8] p-6 space-y-2">
                <div className="font-mono-num text-sm font-bold text-[#1D6FE8]">{s.step}</div>
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-[#525860]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <TechSpecsDrawer
          title="For Tech Readers: Panel &amp; Inverter Specs"
          subtitle="N-Type TOPCon modules, rapid shutdown compliance, and string/microinverter efficiencies."
          specs={[
            { label: 'Panel Modules', value: '420W–440W N-Type TOPCon', note: '22.3% module efficiency · All-black frame' },
            { label: 'Inverter Efficiency', value: '98.4% CEC / Multi-MPPT', note: 'Supports string hybrid or microinverter arrays' },
            { label: 'Degradation Rate', value: '≤ 0.40% / yr (88% @ Yr 25)', note: 'Linear 25-year performance output warranty' },
            { label: 'Weather & Load Rating', value: '5,400 Pa Snow / 2,400 Pa Wind', note: 'UL 61730 & IEC 61215 salt-mist certified' },
            { label: 'Roof Attachment', value: 'Flashed Lag or Non-Penetrating', note: 'Zero-leak EPDM roof flashing / ballasted flat' },
            { label: 'Safety & Monitoring', value: 'NEC Rapid Shutdown + CT App', note: 'Real-time circuit & array production monitoring' },
          ]}
        />

        {/* Solar Project Examples */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Homes &amp; Businesses We&apos;ve Powered
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B3B3C] hover:text-[#1D6FE8] cursor-pointer"
            >
              <span>All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solarProjects.map((project) => (
              <button
                key={project.id}
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
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-xs text-[#525860]">{project.location}</div>
                    <h3 className="font-display text-lg font-bold text-[#14171A] mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-xs">
                    <span className="font-mono-num font-semibold text-[#0B3B3C]">
                      Saves {project.annualSavings}
                    </span>
                    <span className="font-semibold text-[#14171A] group-hover:text-[#1D6FE8]">
                      See Story →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* System Configurator */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Build Your Solar Package
            </h2>
            <p className="text-sm text-[#525860]">
              Pick your home size below and add a backup battery, heating, or EV charger to see an
              estimated price.
            </p>
          </div>
          <SystemBuilderTool onRequestCustomQuote={onRequestCustomQuote} />
        </section>
      </PageContainer>
    </div>
  );
};
