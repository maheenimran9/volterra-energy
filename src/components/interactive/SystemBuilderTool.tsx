import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, ShieldCheck, Sun, Battery, Wind, Zap } from 'lucide-react';
import {
  BatteryOptionKwh,
  HvacOptionId,
  SolarOptionKw,
  SystemBuilderConfig,
} from '../../types/energy';
import { calculateSystemBuilder, HVAC_OPTION_META } from '../../utils/calculations';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface SystemBuilderToolProps {
  onRequestCustomQuote: (configSummary: string) => void;
}

const DEFAULT_CONFIG: SystemBuilderConfig = {
  solarKw: 10,
  batteryKwh: 13.5,
  hvac: 'multi-zone',
  evCharger: true,
  smartMonitoring: true,
  extendedWarranty: false,
};

const STORAGE_KEY = 'volterra_system_builder_v1';

const SOLAR_TIERS: { kw: SolarOptionKw; homeSize: string; panels: string }[] = [
  { kw: 5, homeSize: 'Small Home', panels: '1–2 beds · ~13 panels' },
  { kw: 8, homeSize: 'Medium Home', panels: '3 beds · ~20 panels' },
  { kw: 10, homeSize: 'Large Home', panels: '4+ beds · ~25 panels' },
  { kw: 15, homeSize: 'Big Home / Office', panels: 'High usage · ~38 panels' },
];

const BATTERY_TIERS: { kwh: BatteryOptionKwh; title: string; subtitle: string }[] = [
  { kwh: 0, title: 'None', subtitle: 'Solar panels only' },
  { kwh: 10, title: '10 kWh', subtitle: 'Fridge, lights & Wi-Fi' },
  { kwh: 13.5, title: '13.5 kWh', subtitle: 'Whole home overnight' },
  { kwh: 20, title: '20 kWh', subtitle: 'Extra multi-day backup' },
];

export const SystemBuilderTool: React.FC<SystemBuilderToolProps> = ({
  onRequestCustomQuote,
}) => {
  const [config, setConfig] = useState<SystemBuilderConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const metrics = calculateSystemBuilder(config);
  const hvacOptions: HvacOptionId[] = ['none', 'single-zone', 'multi-zone', 'smart-heat-pump'];

  const selectedSolarTier = SOLAR_TIERS.find((s) => s.kw === config.solarKw) || SOLAR_TIERS[2];

  const buildSummaryString = () => {
    const parts = [
      `${selectedSolarTier.homeSize} Solar (${config.solarKw} kW)`,
      config.batteryKwh > 0 ? `${config.batteryKwh} kWh Backup Battery` : 'No Battery',
      HVAC_OPTION_META[config.hvac].label,
    ];
    if (config.evCharger) parts.push('Home EV Charger');
    if (config.smartMonitoring) parts.push('Live Phone App');
    if (config.extendedWarranty) parts.push('25-Year Protection Plan');
    return `${parts.join(' + ')} (Est. $${metrics.estimatedPrice.toLocaleString()})`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Simple Step-by-Step Options */}
      <div className="lg:col-span-7 space-y-6">
        {/* 01. Pick Solar Size */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-[#0B3B3C]" />
              <h3 className="font-display text-base font-bold text-[#14171A]">
                01. Pick Your Solar Size
              </h3>
            </div>
            <span className="text-xs text-[#525860]">Based on home size</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SOLAR_TIERS.map((tier) => {
              const active = config.solarKw === tier.kw;
              return (
                <button
                  key={tier.kw}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, solarKw: tier.kw }))}
                  className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="text-sm font-bold">{tier.homeSize}</div>
                  <div className={`font-mono-num text-base font-bold mt-0.5 ${active ? 'text-[#93C5FD]' : 'text-[#0B3B3C]'}`}>
                    {tier.kw} kW
                  </div>
                  <div className={`text-xs mt-1 leading-snug ${active ? 'text-white/75' : 'text-[#525860]'}`}>
                    {tier.panels}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 02. Backup Battery */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <Battery className="w-5 h-5 text-[#0B3B3C]" />
              <h3 className="font-display text-base font-bold text-[#14171A]">
                02. Add a Backup Battery?
              </h3>
            </div>
            <span className="text-xs text-[#525860]">Keeps lights on at night</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BATTERY_TIERS.map((tier) => {
              const active = config.batteryKwh === tier.kwh;
              return (
                <button
                  key={tier.kwh}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, batteryKwh: tier.kwh }))}
                  className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="font-mono-num text-lg font-bold">{tier.title}</div>
                  <div className={`text-xs mt-1 leading-snug ${active ? 'text-white/75' : 'text-[#525860]'}`}>
                    {tier.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 03. Heating & Cooling */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <Wind className="w-5 h-5 text-[#0B3B3C]" />
              <h3 className="font-display text-base font-bold text-[#14171A]">
                03. Heating &amp; Cooling (Optional)
              </h3>
            </div>
            <span className="text-xs text-[#525860]">Powered by solar</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hvacOptions.map((id) => {
              const meta = HVAC_OPTION_META[id];
              const active = config.hvac === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, hvac: id }))}
                  className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">{meta.label}</span>
                    <span
                      className={`font-mono-num text-xs font-semibold ${
                        active ? 'text-[#93C5FD]' : 'text-[#0B3B3C]'
                      }`}
                    >
                      {meta.price === 0 ? 'Included ($0)' : `+$${meta.price.toLocaleString()}`}
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-snug ${active ? 'text-white/75' : 'text-[#525860]'}`}>
                    {meta.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 04. Useful Extras */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-[#0B3B3C]" />
              <h3 className="font-display text-base font-bold text-[#14171A]">
                04. Useful Extras
              </h3>
            </div>
            <span className="text-xs text-[#525860]">Add or remove anytime</span>
          </div>
          <div className="space-y-3">
            {[
              {
                key: 'evCharger' as const,
                title: 'Home EV Car Charger',
                desc: 'Charge your electric car at home using free daytime solar power',
                price: '+$1,650',
              },
              {
                key: 'smartMonitoring' as const,
                title: 'Live Phone App',
                desc: 'Track solar power, battery charge, and daily bill savings on your phone',
                price: '+$890',
              },
              {
                key: 'extendedWarranty' as const,
                title: '25-Year Full Protection Plan',
                desc: 'Extends parts & labor warranty to 25 years (and 15 years on your battery)',
                price: '+$1,950',
              },
            ].map((addon) => {
              const checked = config[addon.key];
              return (
                <button
                  key={addon.key}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, [addon.key]: !prev[addon.key] }))
                  }
                  className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    checked
                      ? 'bg-[#EEF3F2] border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                        checked
                          ? 'bg-[#0B3B3C] border-[#0B3B3C] text-white'
                          : 'bg-white border-[#C8CBC2]'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#14171A]">{addon.title}</div>
                      <div className="text-xs text-[#525860] mt-0.5">{addon.desc}</div>
                    </div>
                  </div>
                  <span className="font-mono-num text-sm font-semibold text-[#14171A] shrink-0">
                    {addon.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Plain-English Package Summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#0B3B3C] text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <div>
            <div className="text-xs text-white/75">Your Custom Package</div>
            <h3 className="font-display text-xl font-bold mt-1">Package Summary</h3>
          </div>
          <ShieldCheck className="w-6 h-6 text-[#93C5FD]" />
        </div>

        {/* Selected Items */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/75">Solar Size</span>
            <span className="font-semibold text-right">
              {selectedSolarTier.homeSize} ({config.solarKw} kW)
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/75">Backup Battery</span>
            <span className="font-semibold text-right">
              {config.batteryKwh === 0 ? 'Not included' : `${config.batteryKwh} kWh Battery`}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-white/75">Heating &amp; Cooling</span>
            <span className="font-semibold text-right">{HVAC_OPTION_META[config.hvac].label}</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 border-b border-white/10">
            <span className="text-white/75 shrink-0">Selected Extras</span>
            <span className="font-medium text-right">
              {[
                config.evCharger && 'EV Charger',
                config.smartMonitoring && 'Phone App',
                config.extendedWarranty && '25-Yr Protection',
              ]
                .filter(Boolean)
                .join(', ') || 'None'}
            </span>
          </div>
        </div>

        {/* Simple At-a-Glance Numbers */}
        <div className="grid grid-cols-2 gap-4 bg-white/10 rounded-xl p-4">
          <div>
            <div className="text-xs text-white/75">Yearly Power Made</div>
            <div className="font-mono-num text-lg font-bold mt-0.5">
              <AnimatedCounter value={metrics.estimatedAnnualProductionKwh} suffix=" kWh" />
            </div>
          </div>
          <div>
            <div className="text-xs text-white/75">Power Cut Backup</div>
            <div className="font-mono-num text-lg font-bold mt-0.5 text-[#93C5FD]">
              {config.batteryKwh === 0 ? (
                'Solar Only'
              ) : (
                <AnimatedCounter value={metrics.peakBackupHours} decimals={1} suffix=" hrs" />
              )}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/75">Solar Warranty</div>
            <div className="font-mono-num text-sm font-semibold mt-0.5">
              {metrics.warrantyYears} Years
            </div>
          </div>
          <div>
            <div className="text-xs text-white/75">Battery Warranty</div>
            <div className="font-mono-num text-sm font-semibold mt-0.5">
              {metrics.batteryWarrantyYears > 0 ? `${metrics.batteryWarrantyYears} Years` : 'Not included'}
            </div>
          </div>
        </div>

        {/* Estimated System Price */}
        <div className="pt-2">
          <div className="text-xs text-white/75">Estimated Package Price</div>
          <div className="font-mono-num text-3xl sm:text-4xl font-bold text-[#93C5FD] mt-1">
            <AnimatedCounter value={metrics.estimatedPrice} prefix="$" />
          </div>
          <p className="text-xs text-white/75 mt-2 leading-relaxed">
            Includes panels, hardware, city permits, and full installation. Final price confirmed
            after a quick free home visit.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRequestCustomQuote(buildSummaryString())}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-white text-[#14171A] font-semibold text-sm hover:bg-[#F2F1EC] transition-colors cursor-pointer"
        >
          <span>Get Quote For This Package</span>
          <ArrowUpRight className="w-4 h-4 text-[#1D6FE8]" />
        </button>
      </div>
    </div>
  );
};
