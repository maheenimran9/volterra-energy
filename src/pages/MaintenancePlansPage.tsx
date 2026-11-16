import React from 'react';
import { Sun, BatteryCharging, Wind, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { MaintenanceSelector } from '../components/interactive/MaintenanceSelector';

export const MaintenancePlansPage: React.FC = () => {
  const serviceDisciplines = [
    {
      icon: <Sun className="w-5 h-5 text-[#0B3B3C]" />,
      title: 'Solar Panel Checkup',
      items: [
        'Heat camera check for hidden panel issues',
        'Power output & inverter safety test',
        'Panel wash & roof seal weather check',
      ],
    },
    {
      icon: <BatteryCharging className="w-5 h-5 text-[#0B3B3C]" />,
      title: 'Battery Health Check',
      items: [
        'Battery health & charge capacity check',
        'Live power-cut switchover test',
        'Safety breaker & surge check',
      ],
    },
    {
      icon: <Wind className="w-5 h-5 text-[#0B3B3C]" />,
      title: 'Heating & AC Tune-Up',
      items: [
        'Filter wash & cooling coil check',
        'Room-to-room airflow check',
        'Summer & winter efficiency tune-up',
      ],
    },
  ];

  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-14">
        <div className="max-w-2xl space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
            Annual Care Plans
          </div>
          <h1
            className="font-display font-bold text-[#14171A] tracking-tight leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
          >
            Keep your solar, battery, and heating running like day one.
          </h1>
          <p className="text-base text-[#525860]">
            Dirty panels and skipped checkups silently cut your savings. Pick a yearly care plan
            below, with no online payment needed today.
          </p>
        </div>

        {/* 3 Core Maintenance Disciplines */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceDisciplines.map((d) => (
            <div
              key={d.title}
              className="bg-white rounded-3xl border border-[#E2E0D8] p-7 space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EFEF] flex items-center justify-center">
                {d.icon}
              </div>
              <h2 className="font-display text-xl font-bold text-[#14171A]">{d.title}</h2>
              <ul className="space-y-2 text-sm text-[#3A3F45]">
                {d.items.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Plans, Comparison Matrix & Service Request Form */}
        <MaintenanceSelector />
      </PageContainer>
    </div>
  );
};
