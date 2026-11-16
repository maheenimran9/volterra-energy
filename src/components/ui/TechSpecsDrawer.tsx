import React, { useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';

export interface TechSpecItem {
  label: string;
  value: string;
  note?: string;
}

interface TechSpecsDrawerProps {
  title?: string;
  subtitle?: string;
  specs: TechSpecItem[];
}

export const TechSpecsDrawer: React.FC<TechSpecsDrawerProps> = ({
  title = 'For Tech Readers: Equipment & Engineering Specs',
  subtitle = 'Detailed hardware specs for engineers, builders, and curious homeowners.',
  specs,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-3xl border border-[#E2E0D8] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-[#F9F8F5] transition-colors cursor-pointer"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#EEF3F2] text-[#0B3B3C] flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display text-sm sm:text-base font-bold text-[#14171A]">
              {title}
            </div>
            <div className="text-xs text-[#525860] mt-0.5">{subtitle}</div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2F1EC] text-xs font-semibold text-[#14171A] shrink-0">
          <span>{open ? 'Hide Specs' : 'View Specs'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#ECEAE4]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
            {specs.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[#F9F8F5] border border-[#ECEAE4] p-4 space-y-1"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#525860]">
                  {item.label}
                </div>
                <div className="font-mono-num text-sm font-bold text-[#14171A]">
                  {item.value}
                </div>
                {item.note && (
                  <div className="text-xs text-[#525860] leading-snug">{item.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
