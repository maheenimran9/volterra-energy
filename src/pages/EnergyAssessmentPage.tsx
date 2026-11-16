import React, { useState } from 'react';
import { SmartAssessmentTool } from '../components/interactive/SmartAssessmentTool';
import { SystemBuilderTool } from '../components/interactive/SystemBuilderTool';
import { RoiAnalysisTool } from '../components/interactive/RoiAnalysisTool';
import { BatterySimulatorTool } from '../components/interactive/BatterySimulatorTool';
import { PageContainer } from '../components/layout/PageContainer';
import { BookingServiceType, PropertyType } from '../types/energy';

interface EnergyAssessmentPageProps {
  onBookWithContext: (
    summary: string,
    postal?: string,
    propertyType?: PropertyType,
    service?: BookingServiceType
  ) => void;
}

type DetailedToolId = 'none' | 'roi' | 'backup' | 'builder';

export const EnergyAssessmentPage: React.FC<EnergyAssessmentPageProps> = ({
  onBookWithContext,
}) => {
  const [detailedTool, setDetailedTool] = useState<DetailedToolId>('none');

  const extraTools: { id: Exclude<DetailedToolId, 'none'>; label: string; desc: string }[] = [
    {
      id: 'roi',
      label: '20-Year Payback & Tax Credit Chart',
      desc: 'Compare long-term savings with optional rebates',
    },
    {
      id: 'backup',
      label: 'Power Outage Backup Checker',
      desc: 'See how many hours your appliances run on battery',
    },
    {
      id: 'builder',
      label: 'Build a Custom Package',
      desc: 'Pick exact solar, battery, HVAC & EV options',
    },
  ];

  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-16">
        {/* Clear 3-Second Calculator Header */}
        <div className="max-w-2xl space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
            Home &amp; Appliance Solar Calculator
          </div>
          <h1
            className="font-display font-bold text-[#14171A] tracking-tight leading-[1.06]"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}
          >
            See what size solar your home &amp; appliances actually need.
          </h1>
          <p className="text-base text-[#525860]">
            Pick how big your property is and tap the appliances you use daily, such as ACs, fridge,
            water heater, or EV, for a real solar size and savings estimate in 30 seconds.
          </p>
        </div>

        {/* Simple, Primary Savings Calculator */}
        <SmartAssessmentTool
          onBookWithAssessment={(summary, postal, pType) =>
            onBookWithContext(summary, postal, pType, 'Complete Energy Solution')
          }
        />

        {/* Optional Detailed Planning Tools (Instant opening, zero spinner) */}
        <section className="pt-8 border-t border-[#E2E0D8] space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-[#14171A]">
              Extra Planning Tools (Optional)
            </h2>
            <p className="text-sm text-[#525860]">
              Want to look closer at 20-year savings, storm backup hours, or build your own bundle?
              Tap any option below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extraTools.map((tool) => {
              const active = detailedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setDetailedTool(active ? 'none' : tool.id)}
                  className={`p-5 rounded-2xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-white text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="font-display font-bold text-base">{tool.label}</div>
                  <div
                    className={`text-xs mt-1 ${active ? 'text-white/80' : 'text-[#525860]'}`}
                  >
                    {tool.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {detailedTool === 'roi' && <RoiAnalysisTool />}
          {detailedTool === 'backup' && <BatterySimulatorTool />}
          {detailedTool === 'builder' && (
            <SystemBuilderTool
              onRequestCustomQuote={(summary) =>
                onBookWithContext(summary, undefined, undefined, 'Complete Energy Solution')
              }
            />
          )}
        </section>
      </PageContainer>
    </div>
  );
};
