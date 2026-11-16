import React, { useEffect, useState } from 'react';
import {
  BatteryCharging,
  Check,
  Refrigerator,
  Lightbulb,
  Wifi,
  Tv,
  Wind,
  Laptop,
  WashingMachine,
  Info,
} from 'lucide-react';
import { APPLIANCES } from '../../data/energyData';
import { calculateBatterySimulation } from '../../utils/calculations';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const APPLIANCE_ICONS: Record<string, React.ReactNode> = {
  fridge: <Refrigerator className="w-4 h-4" />,
  lighting: <Lightbulb className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  tv: <Tv className="w-4 h-4" />,
  ac: <Wind className="w-4 h-4" />,
  computer: <Laptop className="w-4 h-4" />,
  washing: <WashingMachine className="w-4 h-4" />,
};

const STORAGE_KEY = 'volterra_battery_sim_v1';

export const BatterySimulatorTool: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.selectedIds)) return parsed.selectedIds;
      }
    } catch {
      // ignore
    }
    return ['fridge', 'lighting', 'wifi', 'computer'];
  });

  const [batteryKwh, setBatteryKwh] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.batteryKwh === 'number') return parsed.batteryKwh;
      }
    } catch {
      // ignore
    }
    return 13.5;
  });

  const [simulateHoursElapsed, setSimulateHoursElapsed] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedIds, batteryKwh }));
    } catch {
      // ignore
    }
  }, [selectedIds, batteryKwh]);

  const sim = calculateBatterySimulation(selectedIds, batteryKwh);

  const toggleAppliance = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const remainingKwh = Math.max(
    0,
    Number((sim.usableCapacityKwh - sim.totalDemandKw * simulateHoursElapsed).toFixed(2))
  );
  const remainingPct =
    sim.usableCapacityKwh > 0
      ? Math.max(0, Math.min(100, Math.round((remainingKwh / sim.usableCapacityKwh) * 100)))
      : 0;

  const batteryCapacities = [10, 13.5, 20, 27, 40];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Battery Size & Appliance Selector */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E0D8] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-[#14171A] mb-3">
              1. Choose Battery Size
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {batteryCapacities.map((cap) => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => {
                    setBatteryKwh(cap);
                    setSimulateHoursElapsed(0);
                  }}
                  className={`py-3 px-2 rounded-xl border font-mono-num text-sm font-bold transition-colors cursor-pointer ${
                    batteryKwh === cap
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  {cap} kWh
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2.5">
              <h3 className="font-display text-base font-bold text-[#14171A]">
                2. Pick What Stays On During a Power Cut
              </h3>
              <div className="flex items-center gap-2 text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedIds(['fridge', 'lighting', 'wifi'])}
                  className="px-3 py-1.5 rounded-lg bg-[#EEF3F2] text-[#0B3B3C] font-semibold hover:bg-[#E0EAE8] cursor-pointer"
                >
                  Essentials Only
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds(APPLIANCES.map((a) => a.id))}
                  className="px-3 py-1.5 rounded-lg bg-[#EEF3F2] text-[#0B3B3C] font-semibold hover:bg-[#E0EAE8] cursor-pointer"
                >
                  Select All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {APPLIANCES.map((app) => {
                const active = selectedIds.includes(app.id);
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => toggleAppliance(app.id)}
                    className={`flex items-start justify-between gap-3 p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#EEF3F2] border-[#0B3B3C]'
                        : 'bg-[#F9F8F5] border-[#E2E0D8] hover:border-[#14171A]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          active
                            ? 'bg-[#0B3B3C] text-white'
                            : 'bg-white text-[#525860] border border-[#E2E0D8]'
                        }`}
                      >
                        {APPLIANCE_ICONS[app.id]}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#14171A]">{app.name}</div>
                        <div className="text-xs text-[#525860] mt-0.5">
                          <span className="font-mono-num">{app.watts} W</span> usage
                        </div>
                      </div>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        active
                          ? 'bg-[#0B3B3C] border-[#0B3B3C] text-white'
                          : 'bg-white border-[#C8CBC2]'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Battery Runtime Forecast */}
        <div className="lg:col-span-5 bg-[#0B3B3C] text-white rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/75">Power Cut Check</div>
              <h3 className="font-display text-xl font-bold mt-0.5">How Long Backup Lasts</h3>
            </div>
            <BatteryCharging className="w-6 h-6 text-[#93C5FD]" />
          </div>

          <div className="bg-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-white/75">Estimated Backup Time</div>
                <div className="font-mono-num text-4xl font-bold text-[#93C5FD] mt-1">
                  {sim.totalWatts === 0 ? (
                    'Standby'
                  ) : (
                    <AnimatedCounter value={sim.estimatedHours} decimals={1} suffix=" hrs" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/75">Charge Left</div>
                <div className="font-mono-num text-xl font-bold">{remainingPct}%</div>
              </div>
            </div>

            <div className="h-10 w-full rounded-xl bg-black/25 border border-white/15 p-1.5 flex items-center gap-1">
              {Array.from({ length: 12 }).map((_, idx) => {
                const threshold = ((idx + 1) / 12) * 100;
                const filled = remainingPct >= threshold - 4;
                const low = remainingPct <= 25;
                return (
                  <div
                    key={idx}
                    className={`h-full flex-1 rounded-sm transition-colors duration-200 ${
                      filled
                        ? low
                          ? 'bg-amber-400'
                          : 'bg-[#93C5FD]'
                        : 'bg-white/10'
                    }`}
                  />
                );
              })}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-white/75 mb-1.5">
                <span>Check hours without power</span>
                <span className="font-mono-num text-white">
                  Hour {simulateHoursElapsed} · {remainingKwh} kWh left
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(12, Math.ceil(sim.estimatedHours || 24))}
                step={0.5}
                value={simulateHoursElapsed}
                onChange={(e) => setSimulateHoursElapsed(Number(e.target.value))}
                className="w-full accent-[#93C5FD] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/10">
              <div className="text-[11px] text-white/75">Power Used</div>
              <div className="font-mono-num text-base font-bold mt-1">
                {sim.totalDemandKw} kW
              </div>
              <div className="font-mono-num text-[11px] text-white/60">{sim.totalWatts} W</div>
            </div>
            <div className="p-3 rounded-xl bg-white/10">
              <div className="text-[11px] text-white/75">Usable Power</div>
              <div className="font-mono-num text-base font-bold mt-1 text-[#93C5FD]">
                {sim.usableCapacityKwh} kWh
              </div>
              <div className="text-[11px] text-white/60">Available</div>
            </div>
            <div className="p-3 rounded-xl bg-white/10">
              <div className="text-[11px] text-white/75">Items On</div>
              <div className="font-mono-num text-base font-bold mt-1">
                {sim.activeAppliances.length} / {APPLIANCES.length}
              </div>
              <div className="text-[11px] text-white/60">Selected</div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/15">
            <div className="text-xs font-semibold text-white">
              Where Power Goes
            </div>
            {sim.priorityBreakdown.map((tier) => (
              <div key={tier.tier} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/85">{tier.label}</span>
                  <span className="font-mono-num text-[#93C5FD]">
                    {tier.watts} W ({tier.sharePct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full bg-[#93C5FD] rounded-full transition-all duration-300"
                    style={{ width: `${tier.sharePct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5 text-xs text-[#525860] pt-1">
        <Info className="w-3.5 h-3.5 text-[#0B3B3C] shrink-0 mt-0.5" />
        <p>
          Hours shown are estimates based on standard home appliance power use. Daylight solar
          recharges the battery automatically during sunny hours.
        </p>
      </div>
    </div>
  );
};
