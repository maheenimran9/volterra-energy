import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BatteryCharging,
  Car,
  Check,
  ChevronDown,
  Flame,
  Home,
  Info,
  Minus,
  Plus,
  Refrigerator,
  RotateCcw,
  Shirt,
  Snowflake,
  Sun,
  Waves,
  Wind,
  Zap,
} from 'lucide-react';
import { REGION_CONFIG } from '../../data/energyData';
import { PropertyType, RegionCode } from '../../types/energy';
import { calculateSmartAssessment } from '../../utils/calculations';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface SmartAssessmentToolProps {
  onBookWithAssessment?: (
    summary: string,
    postalCode: string,
    propertyType: PropertyType
  ) => void;
}

type HomeSizeId = 'small' | 'medium' | 'large';
type UsageTimingId = 'day' | 'balanced' | 'night';

interface SimpleCalcState {
  region: RegionCode;
  propertyType: PropertyType;
  homeSize: HomeSizeId;
  postalCode: string;
  acCount: number;
  hasFridge: boolean;
  hasLaundry: boolean;
  hasWaterHeater: boolean;
  hasHeatPump: boolean;
  hasEv: boolean;
  hasPoolOrPump: boolean;
  hasHeavyMachinery: boolean;
  usageTiming: UsageTimingId;
  includeBattery: boolean;
  electricityRate: number;
  customMonthlyBill: number | null;
}

const DEFAULT_STATE: SimpleCalcState = {
  region: 'USA',
  propertyType: 'residential',
  homeSize: 'medium',
  postalCode: '78701',
  acCount: 2,
  hasFridge: true,
  hasLaundry: true,
  hasWaterHeater: false,
  hasHeatPump: false,
  hasEv: false,
  hasPoolOrPump: false,
  hasHeavyMachinery: false,
  usageTiming: 'balanced',
  includeBattery: true,
  electricityRate: 0.21,
  customMonthlyBill: null,
};

const STORAGE_KEY = 'volterra_simple_calc_v3';

const HOME_SIZES: Record<
  PropertyType,
  { id: HomeSizeId; title: string; subtitle: string; sqFt: number; baseDailyKwh: number }[]
> = {
  residential: [
    {
      id: 'small',
      title: '1–2 Bedrooms',
      subtitle: 'Small home · ~1,100 sq ft',
      sqFt: 1100,
      baseDailyKwh: 6,
    },
    {
      id: 'medium',
      title: '3–4 Bedrooms',
      subtitle: 'Medium home · ~2,200 sq ft',
      sqFt: 2200,
      baseDailyKwh: 10,
    },
    {
      id: 'large',
      title: '5+ Bedrooms',
      subtitle: 'Large home · ~3,600 sq ft',
      sqFt: 3600,
      baseDailyKwh: 15,
    },
  ],
  commercial: [
    {
      id: 'small',
      title: 'Small Office / Shop',
      subtitle: 'Under 3,000 sq ft',
      sqFt: 2500,
      baseDailyKwh: 24,
    },
    {
      id: 'medium',
      title: 'Store / Clinic',
      subtitle: '3,000–8,000 sq ft',
      sqFt: 6000,
      baseDailyKwh: 55,
    },
    {
      id: 'large',
      title: 'Warehouse / Facility',
      subtitle: '8,000+ sq ft',
      sqFt: 14000,
      baseDailyKwh: 120,
    },
  ],
};

export const SmartAssessmentTool: React.FC<SmartAssessmentToolProps> = ({
  onBookWithAssessment,
}) => {
  const [state, setState] = useState<SimpleCalcState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_STATE;
  });

  const [showBillAdjust, setShowBillAdjust] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const regionMeta = REGION_CONFIG[state.region];
  const sizeOptions = HOME_SIZES[state.propertyType];
  const selectedSizeMeta =
    sizeOptions.find((s) => s.id === state.homeSize) || sizeOptions[1];

  // Realistic daily kWh calculation from Property Size + Exact Appliances
  const isCommercial = state.propertyType === 'commercial';
  const acDailyKwh = state.acCount * (isCommercial ? 15 : 7.5);
  const fridgeDailyKwh = state.hasFridge ? (isCommercial ? 18 : 3.5) : 0;
  const laundryDailyKwh = state.hasLaundry ? (isCommercial ? 8 : 3.0) : 0;
  const waterHeaterDailyKwh = state.hasWaterHeater ? (isCommercial ? 12 : 4.5) : 0;
  const heatPumpDailyKwh = state.hasHeatPump ? (isCommercial ? 16 : 7.5) : 0;
  const evDailyKwh = state.hasEv ? (isCommercial ? 28 : 9.5) : 0;
  const pumpDailyKwh = state.hasPoolOrPump ? (isCommercial ? 14 : 5.0) : 0;
  const machineryDailyKwh = isCommercial && state.hasHeavyMachinery ? 32 : 0;

  const applianceDailyKwh = Number(
    (
      selectedSizeMeta.baseDailyKwh +
      acDailyKwh +
      fridgeDailyKwh +
      laundryDailyKwh +
      waterHeaterDailyKwh +
      heatPumpDailyKwh +
      evDailyKwh +
      pumpDailyKwh +
      machineryDailyKwh
    ).toFixed(1)
  );

  const autoMonthlyKwh = Math.round(applianceDailyKwh * 30.4);
  const autoMonthlyBill = Math.max(
    45,
    Math.round(autoMonthlyKwh * Math.max(0.08, state.electricityRate))
  );

  const effectiveMonthlyBill =
    state.customMonthlyBill !== null ? state.customMonthlyBill : autoMonthlyBill;

  const effectiveMonthlyKwh =
    state.customMonthlyBill !== null
      ? Math.max(
          200,
          Math.round(state.customMonthlyBill / Math.max(0.08, state.electricityRate))
        )
      : autoMonthlyKwh;

  const effectiveDailyKwh = Number((effectiveMonthlyKwh / 30.4).toFixed(1));

  // Shared calculation engine fed with accurate size, appliances & usage timing
  const baseResults = calculateSmartAssessment({
    propertyType: state.propertyType,
    region: state.region,
    propertySizeSqFt: selectedSizeMeta.sqFt,
    monthlyBill: effectiveMonthlyBill,
    monthlyKwh: effectiveMonthlyKwh,
    postalCode: state.postalCode,
    currentSystem:
      state.hasHeatPump || state.hasWaterHeater ? 'gas-hvac-grid' : 'grid-only',
    electricityRate: state.electricityRate,
    annualEscalationPct: 3.5,
  });

  // Timing affects daytime solar absorption & recommended battery storage
  const solarKw = baseResults.recommendedSolarKw;
  const panelCount = Math.max(6, Math.round((solarKw * 1000) / 420));
  const roofSqFt = panelCount * 19;

  const nightFactor =
    state.usageTiming === 'night' ? 0.58 : state.usageTiming === 'balanced' ? 0.44 : 0.28;
  const rawBatteryNeed = Math.max(
    10,
    Math.min(isCommercial ? 160 : 40, effectiveDailyKwh * nightFactor)
  );
  const batteryKwh = state.includeBattery
    ? Math.round(rawBatteryNeed / 2.5) * 2.5
    : 0;

  const solarCostPerKw = isCommercial ? 1750 : 2350;
  const batteryCost = batteryKwh * 780;
  const evChargerHardwareAllowance = state.hasEv ? 1650 : 0;
  const totalEstimatedCost = Math.round(
    solarKw * solarCostPerKw + batteryCost + evChargerHardwareAllowance
  );

  const baseSelfConsumptionOffset =
    state.usageTiming === 'day' ? 76 : state.usageTiming === 'balanced' ? 68 : 54;
  const billOffsetPct = state.includeBattery
    ? Math.min(92, Math.max(76, baseResults.offsetPercentage))
    : Math.min(82, Math.max(52, baseSelfConsumptionOffset));

  const monthlySavings = Math.round(effectiveMonthlyBill * (billOffsetPct / 100));
  const annualSavings = monthlySavings * 12;
  const newMonthlyBill = Math.max(10, effectiveMonthlyBill - monthlySavings);

  const paybackYears = Number(
    Math.max(3.2, Math.min(16, totalEstimatedCost / Math.max(600, annualSavings))).toFixed(1)
  );

  let twentyYrUtilitySpend = 0;
  for (let yr = 0; yr < 20; yr++) {
    twentyYrUtilitySpend += effectiveMonthlyBill * 12 * Math.pow(1.035, yr);
  }
  const twentyYrNetGain = Math.max(
    0,
    Math.round(twentyYrUtilitySpend * (billOffsetPct / 100) - totalEstimatedCost)
  );

  const selectedItemsSummary: string[] = [
    selectedSizeMeta.title,
    ...(state.acCount > 0
      ? [`${state.acCount} ${isCommercial ? 'HVAC' : 'AC'}${state.acCount > 1 ? 's' : ''}`]
      : []),
    ...(state.hasFridge ? [isCommercial ? 'Coolers' : 'Fridge'] : []),
    ...(state.hasLaundry && !isCommercial ? ['Washer/Dryer'] : []),
    ...(state.hasWaterHeater ? ['Water Heater'] : []),
    ...(state.hasHeatPump ? ['Electric Heating'] : []),
    ...(state.hasEv ? ['EV Charger'] : []),
    ...(state.hasPoolOrPump ? [isCommercial ? 'Pumps' : 'Pool/Water Pump'] : []),
    ...(isCommercial && state.hasHeavyMachinery ? ['Machinery'] : []),
  ];

  const handleRegionChange = (region: RegionCode) => {
    const cfg = REGION_CONFIG[region];
    const defaultZips: Record<RegionCode, string> = {
      USA: '78701',
      UK: 'SW1A 1AA',
      AU: '2000',
      CA: 'M5J 2T3',
    };
    setState((prev) => ({
      ...prev,
      region,
      electricityRate: cfg.defaultRate,
      postalCode: defaultZips[region],
      customMonthlyBill: null,
    }));
  };

  const handlePropertySwitch = (type: PropertyType) => {
    setState((prev) => ({
      ...prev,
      propertyType: type,
      acCount: type === 'commercial' ? Math.max(2, prev.acCount) : Math.min(4, prev.acCount),
      customMonthlyBill: null,
    }));
  };

  const toggleField = (
    key:
      | 'hasFridge'
      | 'hasLaundry'
      | 'hasWaterHeater'
      | 'hasHeatPump'
      | 'hasEv'
      | 'hasPoolOrPump'
      | 'hasHeavyMachinery'
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
      customMonthlyBill: null, // Re-sync bill automatically when user updates appliances
    }));
  };

  const remainingBillPct = Math.max(
    8,
    Math.round((newMonthlyBill / Math.max(1, effectiveMonthlyBill)) * 100)
  );

  const applianceCards: {
    key:
      | 'hasFridge'
      | 'hasLaundry'
      | 'hasWaterHeater'
      | 'hasHeatPump'
      | 'hasEv'
      | 'hasPoolOrPump'
      | 'hasHeavyMachinery';
    label: string;
    detail: string;
    kwhNote: string;
    icon: React.FC<{ className?: string }>;
    show: boolean;
  }[] = [
    {
      key: 'hasFridge',
      label: isCommercial ? 'Commercial Coolers' : 'Fridge & Kitchen',
      detail: isCommercial ? 'Walk-in or display fridges' : 'Fridge, freezer & microwave',
      kwhNote: isCommercial ? '+18 kWh/day' : '+3.5 kWh/day',
      icon: Refrigerator,
      show: true,
    },
    {
      key: 'hasLaundry',
      label: 'Washer & Dryer',
      detail: 'Regular weekly laundry loads',
      kwhNote: '+3.0 kWh/day',
      icon: Shirt,
      show: !isCommercial,
    },
    {
      key: 'hasWaterHeater',
      label: 'Electric Water Heater',
      detail: 'Geyser or electric hot water tank',
      kwhNote: isCommercial ? '+12 kWh/day' : '+4.5 kWh/day',
      icon: Flame,
      show: true,
    },
    {
      key: 'hasHeatPump',
      label: 'Electric Heating / Heat Pump',
      detail: 'Whole-property winter heating',
      kwhNote: isCommercial ? '+16 kWh/day' : '+7.5 kWh/day',
      icon: Wind,
      show: true,
    },
    {
      key: 'hasEv',
      label: isCommercial ? 'EV Charging Stations' : 'Electric Car (EV)',
      detail: isCommercial ? 'Customer or fleet charging' : 'Home overnight/day EV charging',
      kwhNote: isCommercial ? '+28 kWh/day' : '+9.5 kWh/day',
      icon: Car,
      show: true,
    },
    {
      key: 'hasPoolOrPump',
      label: isCommercial ? 'Water / Bore Pumps' : 'Pool or Water Pump',
      detail: isCommercial ? 'Circulation or supply motors' : 'Daily pool filter or well pump',
      kwhNote: isCommercial ? '+14 kWh/day' : '+5.0 kWh/day',
      icon: Waves,
      show: true,
    },
    {
      key: 'hasHeavyMachinery',
      label: 'Heavy Equipment / Tools',
      detail: 'Compressors, lifts or workshop loads',
      kwhNote: '+32 kWh/day',
      icon: Zap,
      show: isCommercial,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: HOME SIZE & APPLIANCE PICKER */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E2E0D8] p-5 sm:p-8 space-y-6 sm:space-y-7">
          <div className="flex items-center justify-between gap-4 border-b border-[#ECEAE4] pb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-[#14171A]">
                Tell Us About Your {isCommercial ? 'Business' : 'Home'}
              </h2>
              <p className="text-xs text-[#525860] mt-0.5">
                Solar size adjusts automatically based on your space and what you run daily
              </p>
            </div>
            <button
              type="button"
              onClick={() => setState(DEFAULT_STATE)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#525860] hover:text-[#14171A] cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Step 1: Location & Home/Business */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#14171A]">
              1. Country &amp; Property Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['USA', 'UK', 'AU', 'CA'] as RegionCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleRegionChange(code)}
                  className={`h-10 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                    state.region === code
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handlePropertySwitch('residential')}
                className={`h-11 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                  state.propertyType === 'residential'
                    ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                    : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handlePropertySwitch('commercial')}
                className={`h-11 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                  state.propertyType === 'commercial'
                    ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                    : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                }`}
              >
                Business
              </button>
              <input
                type="text"
                value={state.postalCode}
                onChange={(e) => setState((prev) => ({ ...prev, postalCode: e.target.value }))}
                placeholder="ZIP / Postcode"
                aria-label="ZIP or Postcode"
                className="col-span-2 sm:col-span-1 h-11 px-3.5 rounded-xl border border-[#D4D2C8] text-sm font-medium text-[#14171A] focus:outline-none focus:border-[#0B3B3C]"
              />
            </div>
          </div>

          {/* Step 2: How Big Is Your Home / Business */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#14171A]">
              2. How big is your {isCommercial ? 'property' : 'home'}?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {sizeOptions.map((size) => {
                const active = state.homeSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        homeSize: size.id,
                        customMonthlyBill: null,
                      }))
                    }
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                        : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <Home
                        className={`w-4 h-4 ${active ? 'text-[#93C5FD]' : 'text-[#0B3B3C]'}`}
                      />
                      <span
                        className={`font-mono-num text-[11px] font-semibold ${
                          active ? 'text-[#93C5FD]' : 'text-[#525860]'
                        }`}
                      >
                        {size.baseDailyKwh} kWh base
                      </span>
                    </div>
                    <div className="font-display font-bold text-sm mt-2">{size.title}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        active ? 'text-white/80' : 'text-[#525860]'
                      }`}
                    >
                      {size.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: What Appliances Will You Run? */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <label className="block text-sm font-semibold text-[#14171A]">
                3. What do you have &amp; use daily?
              </label>
              <span className="text-xs font-mono-num font-semibold text-[#0B3B3C]">
                Est. {effectiveDailyKwh} kWh / day
              </span>
            </div>

            {/* AC Counter Card */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#EEF3F2] border border-[#C6D8D5]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white text-[#0B3B3C] flex items-center justify-center shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#14171A]">
                    {isCommercial ? 'Commercial AC / HVAC Units' : 'Air Conditioners (AC)'}
                  </div>
                  <div className="text-xs text-[#525860]">
                    How many ACs run in warm months ({isCommercial ? '+15' : '+7.5'} kWh/day each)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Decrease AC count"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      acCount: Math.max(0, prev.acCount - 1),
                      customMonthlyBill: null,
                    }))
                  }
                  className="w-8 h-8 rounded-full bg-white border border-[#C6D8D5] text-[#14171A] flex items-center justify-center hover:border-[#0B3B3C] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono-num text-base font-bold w-6 text-center text-[#14171A]">
                  {state.acCount}
                </span>
                <button
                  type="button"
                  aria-label="Increase AC count"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      acCount: Math.min(isCommercial ? 15 : 8, prev.acCount + 1),
                      customMonthlyBill: null,
                    }))
                  }
                  className="w-8 h-8 rounded-full bg-[#0B3B3C] text-white flex items-center justify-center hover:bg-[#14171A] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Appliance Checkboxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {applianceCards
                .filter((item) => item.show)
                .map((item) => {
                  const Icon = item.icon;
                  const checked = state[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleField(item.key)}
                      className={`flex items-start justify-between gap-2.5 p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                        checked
                          ? 'bg-[#EEF3F2] border-[#0B3B3C]'
                          : 'bg-[#F9F8F5] border-[#E2E0D8] hover:border-[#14171A]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <Icon className="w-4 h-4 text-[#0B3B3C] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[#14171A] leading-snug">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#525860] leading-snug mt-0.5">
                            {item.detail}
                          </div>
                          <div className="text-[11px] font-mono-num font-semibold text-[#0B3B3C] mt-1">
                            {item.kwhNote}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 mt-0.5 ${
                          checked
                            ? 'bg-[#0B3B3C] border-[#0B3B3C] text-white'
                            : 'bg-white border-[#C8C6BE] text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
            </div>

            <p className="text-[11px] text-[#525860]">
              Lights, fans, TV, Wi-Fi, and phone chargers are already included for your{' '}
              <strong>{selectedSizeMeta.title}</strong> property.
            </p>
          </div>

          {/* Step 4: When Do You Use Most Power & Backup Battery */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#14171A]">
              4. When do you use power most + Battery backup?
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-stretch">
              {(
                [
                  { id: 'day', label: 'Daytime', sub: 'Work from home' },
                  { id: 'balanced', label: 'Day & Night', sub: 'Typical home' },
                  { id: 'night', label: 'Evenings', sub: 'Out all day' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((prev) => ({ ...prev, usageTiming: opt.id }))}
                  className={`p-2.5 rounded-xl border text-center flex flex-col justify-center transition-colors cursor-pointer ${
                    state.usageTiming === opt.id
                      ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                      : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.label}</div>
                  <div
                    className={`text-[10px] mt-0.5 leading-tight ${
                      state.usageTiming === opt.id ? 'text-white/75' : 'text-[#525860]'
                    }`}
                  >
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setState((prev) => ({ ...prev, includeBattery: !prev.includeBattery }))
              }
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                state.includeBattery
                  ? 'bg-[#EEF3F2] border-[#0B3B3C]'
                  : 'bg-[#F9F8F5] border-[#E2E0D8] hover:border-[#14171A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BatteryCharging className="w-4 h-4 text-[#0B3B3C]" />
                <div>
                  <div className="text-sm font-semibold text-[#14171A]">
                    Include Backup Battery Storage
                  </div>
                  <div className="text-xs text-[#525860]">
                    Runs your evening lights, fridge &amp; ACs after sunset and during blackouts
                  </div>
                </div>
              </div>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                  state.includeBattery
                    ? 'bg-[#0B3B3C] border-[#0B3B3C] text-white'
                    : 'bg-white border-[#C8C6BE] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Optional: Match Exact Electric Bill or Rate */}
          <div className="pt-2 border-t border-[#ECEAE4]">
            <button
              type="button"
              onClick={() => setShowBillAdjust((v) => !v)}
              className="w-full flex items-center justify-between gap-2 text-left text-xs font-semibold text-[#525860] hover:text-[#14171A] cursor-pointer"
            >
              <span>
                Est. electric bill from appliances:{' '}
                <strong className="font-mono-num text-[#14171A]">
                  {regionMeta.currency}
                  {effectiveMonthlyBill.toLocaleString()}/mo
                </strong>{' '}
                (Adjust if your bill is different)
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform ${
                  showBillAdjust ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showBillAdjust && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F9F8F5] border border-[#E2E0D8] space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#14171A]">Override Monthly Bill</span>
                    <span className="font-mono-num text-sm text-[#0B3B3C]">
                      {regionMeta.currency}
                      {effectiveMonthlyBill.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isCommercial ? 200 : 60}
                    max={isCommercial ? 6000 : 1200}
                    step={isCommercial ? 50 : 10}
                    value={effectiveMonthlyBill}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        customMonthlyBill: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-[#0B3B3C] cursor-pointer h-2"
                  />
                  {state.customMonthlyBill !== null && (
                    <button
                      type="button"
                      onClick={() =>
                        setState((prev) => ({ ...prev, customMonthlyBill: null }))
                      }
                      className="text-[11px] font-semibold text-[#1D6FE8] hover:underline cursor-pointer"
                    >
                      Reset to appliance estimate ({regionMeta.currency}
                      {autoMonthlyBill}/mo)
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs text-[#525860]">
                    Local rate ({regionMeta.currency}/kWh):
                  </label>
                  <input
                    type="number"
                    min={0.08}
                    max={0.85}
                    step={0.01}
                    value={state.electricityRate}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        electricityRate: Math.max(0.05, Number(e.target.value) || 0.2),
                      }))
                    }
                    className="w-24 h-9 px-2.5 rounded-lg border border-[#D4D2C8] bg-white font-mono-num text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TAILORED SOLAR SYSTEM & SAVINGS */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Results Card */}
          <div className="bg-[#0B3B3C] text-white rounded-3xl p-5 sm:p-8 space-y-6">
            <div className="border-b border-white/15 pb-5 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                Sized for Your {selectedSizeMeta.title} Setup
              </div>
              <div className="font-display text-4xl sm:text-5xl font-bold">
                <AnimatedCounter value={annualSavings} prefix={regionMeta.currency} />
                <span className="text-lg font-normal text-white/75"> saved / year</span>
              </div>
              <div className="text-sm text-white/85">
                Cuts about{' '}
                <strong className="font-mono-num">
                  {regionMeta.currency}
                  {monthlySavings.toLocaleString()}/month
                </strong>{' '}
                off your bill ({billOffsetPct}% offset)
              </div>
            </div>

            {/* What Your System Is Built To Run */}
            <div className="bg-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#93C5FD]">
                <Sun className="w-4 h-4" />
                <span>Sized for ~{effectiveDailyKwh} kWh daily usage</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedItemsSummary.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Clean Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-xs text-white/75">Solar System Needed</div>
                <div className="font-mono-num text-2xl font-bold mt-1">{solarKw} kW</div>
                <div className="text-xs text-[#93C5FD] mt-0.5">
                  ~{panelCount} panels (~{roofSqFt} sq ft roof)
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-xs text-white/75">Battery Backup</div>
                <div className="font-mono-num text-2xl font-bold mt-1">
                  {state.includeBattery ? `${batteryKwh} kWh` : 'Solar Only'}
                </div>
                <div className="text-xs text-[#93C5FD] mt-0.5">
                  {state.includeBattery
                    ? state.usageTiming === 'night'
                      ? 'Sized for heavy night use'
                      : 'Evening & outage ready'
                    : 'Daytime bill savings'}
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-xs text-white/75">Estimated Price</div>
                <div className="font-mono-num text-2xl font-bold mt-1">
                  <AnimatedCounter value={totalEstimatedCost} prefix={regionMeta.currency} />
                </div>
                <div className="text-xs text-white/75 mt-0.5">Before local tax credits</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-xs text-white/75">Estimated Payback</div>
                <div className="font-mono-num text-2xl font-bold mt-1">{paybackYears} Years</div>
                <div className="text-xs text-[#93C5FD] mt-0.5">
                  20-yr net gain: {regionMeta.currency}
                  {twentyYrNetGain.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Optional Engineering Breakdown Toggle for Tech-Savvy Buyers */}
            <div className="pt-1 border-t border-white/15">
              <button
                type="button"
                onClick={() => setShowTechDetails((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#93C5FD] hover:text-white transition-colors cursor-pointer"
              >
                <span>{showTechDetails ? 'Hide Engineering Breakdown' : 'Tech View: Show kWh & Yield Math'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showTechDetails ? 'rotate-180' : ''}`}
                />
              </button>

              {showTechDetails && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-white/10 rounded-2xl p-3.5">
                  <div>
                    <div className="text-white/65">Est. Annual Yield</div>
                    <div className="font-mono-num font-semibold text-white">
                      {baseResults.annualProductionKwh.toLocaleString()} kWh/yr
                    </div>
                  </div>
                  <div>
                    <div className="text-white/65">Local Sun Yield</div>
                    <div className="font-mono-num font-semibold text-white">
                      {regionMeta.sunYieldFactor.toLocaleString()} kWh/kW
                    </div>
                  </div>
                  <div>
                    <div className="text-white/65">Monthly Usage</div>
                    <div className="font-mono-num font-semibold text-white">
                      {effectiveMonthlyKwh.toLocaleString()} kWh/mo
                    </div>
                  </div>
                  <div>
                    <div className="text-white/65">Utility Rate Basis</div>
                    <div className="font-mono-num font-semibold text-white">
                      {regionMeta.currency}
                      {state.electricityRate.toFixed(2)}/kWh
                    </div>
                  </div>
                  <div>
                    <div className="text-white/65">Module Size</div>
                    <div className="font-mono-num font-semibold text-white">
                      {panelCount} × 420W N-Type
                    </div>
                  </div>
                  <div>
                    <div className="text-white/65">Rate Escalation</div>
                    <div className="font-mono-num font-semibold text-white">3.5% / yr</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visual Monthly Bill Comparison */}
          <div className="bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-display text-lg font-bold text-[#14171A]">
                Monthly Electric Bill Comparison
              </h3>
              <p className="text-xs text-[#525860] mt-0.5">
                Based on running {selectedItemsSummary.join(', ')}
              </p>
            </div>

            <div className="space-y-4">
              {/* Without Solar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#525860]">Estimated Utility Bill Without Solar</span>
                  <span className="font-mono-num text-sm text-[#14171A]">
                    {regionMeta.currency}
                    {effectiveMonthlyBill.toLocaleString()} / mo
                  </span>
                </div>
                <div className="h-4 w-full rounded-full bg-[#ECEAE4] overflow-hidden">
                  <div className="h-full w-full bg-[#9CA3AF] rounded-full" />
                </div>
              </div>

              {/* With Volterra */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#0B3B3C]">Estimated Bill With Volterra</span>
                  <span className="font-mono-num text-sm font-bold text-[#0B3B3C]">
                    {regionMeta.currency}
                    {newMonthlyBill.toLocaleString()} / mo ({billOffsetPct}% saved)
                  </span>
                </div>
                <div className="h-4 w-full rounded-full bg-[#ECEAE4] overflow-hidden">
                  <div
                    className="h-full bg-[#1D6FE8] rounded-full transition-all duration-300"
                    style={{ width: `${remainingBillPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#ECEAE4] text-xs text-[#3A3F45] leading-relaxed">
              Staying on utility power for this setup could cost about{' '}
              <strong className="font-mono-num">
                {regionMeta.currency}
                {Math.round(twentyYrUtilitySpend).toLocaleString()}
              </strong>{' '}
              over 20 years, versus an estimated{' '}
              <strong className="font-mono-num">
                {regionMeta.currency}
                {totalEstimatedCost.toLocaleString()}
              </strong>{' '}
              one-time setup (before local rebates).
            </div>

            {onBookWithAssessment && (
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    onBookWithAssessment(
                      `${solarKw} kW Solar (~${panelCount} panels)${
                        state.includeBattery ? ` + ${batteryKwh} kWh Battery` : ''
                      } for ${selectedItemsSummary.join(', ')} (~${effectiveDailyKwh} kWh/day, Est. ${
                        regionMeta.currency
                      }${totalEstimatedCost.toLocaleString()})`,
                      state.postalCode,
                      state.propertyType
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
                >
                  <span>Get My Exact Quote for This Setup</span>
                  <span className="w-7 h-7 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
                <p className="text-[11px] text-[#525860] text-center">
                  Free roof &amp; panel check · Exact quote in 24 hours · Zero obligation
                </p>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 text-xs text-[#525860]">
            <Info className="w-3.5 h-3.5 text-[#0B3B3C] shrink-0 mt-0.5" />
            <p>
              These estimates are tailored to your home size, selected appliances, and local
              sunshine. An engineer confirms roof shade and local rebates before anything is booked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
