import { REGION_CONFIG, APPLIANCES } from '../data/energyData';
import {
  AssessmentInputs,
  AssessmentResults,
  HvacOptionId,
  SystemBuilderConfig,
} from '../types/energy';

const SEASONAL_CURVE = [
  { month: 'Jan', weight: 0.058, loadWeight: 0.088 },
  { month: 'Feb', weight: 0.068, loadWeight: 0.081 },
  { month: 'Mar', weight: 0.085, loadWeight: 0.079 },
  { month: 'Apr', weight: 0.095, loadWeight: 0.075 },
  { month: 'May', weight: 0.106, loadWeight: 0.081 },
  { month: 'Jun', weight: 0.112, loadWeight: 0.092 },
  { month: 'Jul', weight: 0.114, loadWeight: 0.102 },
  { month: 'Aug', weight: 0.105, loadWeight: 0.098 },
  { month: 'Sep', weight: 0.088, loadWeight: 0.082 },
  { month: 'Oct', weight: 0.072, loadWeight: 0.074 },
  { month: 'Nov', weight: 0.052, loadWeight: 0.072 },
  { month: 'Dec', weight: 0.045, loadWeight: 0.076 },
];

export function calculateSmartAssessment(inputs: AssessmentInputs): AssessmentResults {
  const region = REGION_CONFIG[inputs.region];
  const annualKwhNeed = Math.max(2400, inputs.monthlyKwh * 12);

  // Target ~92% offset adjusted for property type & size
  const propertyFactor = inputs.propertyType === 'commercial' ? 1.08 : 0.95;
  const rawSolarKw = (annualKwhNeed * propertyFactor) / region.sunYieldFactor;
  const minKw = inputs.propertyType === 'commercial' ? 6 : 3;
  const maxKw = inputs.propertyType === 'commercial' ? 220 : 28;
  const recommendedSolarKw = Number(
    Math.min(maxKw, Math.max(minKw, Math.round(rawSolarKw * 2) / 2)).toFixed(1)
  );

  // Recommended battery storage (~1.25x daily evening reserve or scaled to kW)
  const dailyKwh = annualKwhNeed / 365;
  const rawBattery = Math.max(10, Math.min(inputs.propertyType === 'commercial' ? 160 : 40, dailyKwh * 0.48));
  const estimatedBatteryKwh = Math.round(rawBattery / 2.5) * 2.5;

  const annualProductionKwh = Math.round(recommendedSolarKw * region.sunYieldFactor);

  // System cost benchmark (illustrative pre-incentive turnkey pricing)
  const solarCostPerKw = inputs.propertyType === 'commercial' ? 1750 : 2350;
  const batteryCostPerKwh = 780;
  const hvacUpgradeAllowance = inputs.currentSystem === 'gas-hvac-grid' ? 5400 : 0;
  const estimatedInstallationCost = Math.round(
    recommendedSolarKw * solarCostPerKw + estimatedBatteryKwh * batteryCostPerKwh + hvacUpgradeAllowance
  );

  // Self-consumption + export savings (illustrative blended rate at 82% value capture)
  const effectiveAnnualOffsetKwh = Math.min(annualKwhNeed * 1.05, annualProductionKwh * 0.88);
  const currentAnnualSpend = inputs.monthlyBill * 12;
  const rawAnnualSavings = Math.min(
    currentAnnualSpend * 0.94,
    effectiveAnnualOffsetKwh * inputs.electricityRate * 0.92
  );
  const estimatedAnnualSavings = Math.max(600, Math.round(rawAnnualSavings));
  const estimatedMonthlySavings = Math.round(estimatedAnnualSavings / 12);

  const paybackYears = Number(
    Math.max(3.2, Math.min(18, estimatedInstallationCost / estimatedAnnualSavings)).toFixed(1)
  );

  // 20-year savings with configurable electricity inflation & 0.45%/yr panel degradation
  let cumulative20Yr = -estimatedInstallationCost;
  const escalation = inputs.annualEscalationPct / 100;
  for (let yr = 1; yr <= 20; yr++) {
    const degradation = Math.pow(0.9955, yr - 1);
    const rateGrowth = Math.pow(1 + escalation, yr - 1);
    const yearlyMaintenance = inputs.propertyType === 'commercial' ? 680 : 240;
    cumulative20Yr += estimatedAnnualSavings * degradation * rateGrowth - yearlyMaintenance;
  }

  const offsetPercentage = Math.min(
    98,
    Math.round((annualProductionKwh / annualKwhNeed) * 100)
  );

  const monthlyBreakdown = SEASONAL_CURVE.map((item) => ({
    month: item.month,
    productionKwh: Math.round(annualProductionKwh * item.weight),
    consumptionKwh: Math.round(annualKwhNeed * item.loadWeight),
  }));

  return {
    recommendedSolarKw,
    estimatedBatteryKwh,
    annualProductionKwh,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    estimatedInstallationCost,
    paybackYears,
    twentyYearSavings: Math.round(cumulative20Yr),
    offsetPercentage,
    monthlyBreakdown,
  };
}

export const HVAC_OPTION_META: Record<
  HvacOptionId,
  { label: string; price: number; annualKwhImpact: number; summary: string }
> = {
  none: {
    label: 'No Heating or AC',
    price: 0,
    annualKwhImpact: 0,
    summary: 'Keep your current heating and cooling',
  },
  'single-zone': {
    label: '1 Room Unit',
    price: 4200,
    annualKwhImpact: 650,
    summary: 'Quiet heater & AC for one room or studio',
  },
  'multi-zone': {
    label: 'Up to 4 Rooms',
    price: 8900,
    annualKwhImpact: 1450,
    summary: 'Separate heating & cooling across 4 rooms',
  },
  'smart-heat-pump': {
    label: 'Whole Home System',
    price: 12400,
    annualKwhImpact: 2200,
    summary: 'Energy-saving heating & cooling for your whole house',
  },
};

export function calculateSystemBuilder(config: SystemBuilderConfig) {
  const solarPrice = config.solarKw * 2300;
  const batteryPrice = config.batteryKwh * 820;
  const hvacMeta = HVAC_OPTION_META[config.hvac];
  const evPrice = config.evCharger ? 1650 : 0;
  const monitoringPrice = config.smartMonitoring ? 890 : 0;
  const warrantyPrice = config.extendedWarranty ? 1950 : 0;

  const estimatedPrice = Math.round(
    solarPrice + batteryPrice + hvacMeta.price + evPrice + monitoringPrice + warrantyPrice
  );

  const estimatedAnnualProductionKwh = Math.round(config.solarKw * 1420);
  const usableBackupKwh = Number((config.batteryKwh * 0.9).toFixed(1));
  const peakBackupHours =
    config.batteryKwh === 0 ? 0 : Math.round((usableBackupKwh / 1.35) * 10) / 10;

  const warrantyYears = config.extendedWarranty ? 25 : 12;
  const batteryWarrantyYears = config.batteryKwh > 0 ? (config.extendedWarranty ? 15 : 10) : 0;

  return {
    estimatedPrice,
    estimatedAnnualProductionKwh,
    usableBackupKwh,
    peakBackupHours,
    warrantyYears,
    batteryWarrantyYears,
    hvacSummary: hvacMeta.summary,
    hvacEfficiencyBonusKwh: hvacMeta.annualKwhImpact,
  };
}

export function calculateBatterySimulation(
  selectedApplianceIds: string[],
  batteryCapacityKwh: number
) {
  const activeAppliances = APPLIANCES.filter((a) => selectedApplianceIds.includes(a.id));
  const totalWatts = activeAppliances.reduce((sum, a) => sum + a.watts, 0);
  const totalDemandKw = Number((totalWatts / 1000).toFixed(2));

  // Assumed usable DoD = 90%, inverter efficiency = 92% -> ~82.8% net delivered energy
  const usableCapacityKwh = Number((batteryCapacityKwh * 0.9 * 0.92).toFixed(2));
  const estimatedHours =
    totalDemandKw > 0 ? Number((usableCapacityKwh / totalDemandKw).toFixed(1)) : 0;

  const priorityBreakdown = [1, 2, 3].map((tier) => {
    const items = activeAppliances.filter((a) => a.priority === tier);
    const tierWatts = items.reduce((s, a) => s + a.watts, 0);
    return {
      tier,
      label:
        tier === 1
          ? 'Essential Basics (Fridge, Lights & Wi-Fi)'
          : tier === 2
          ? 'Home & Work (Office & TV)'
          : 'Heavy Appliances (AC & Laundry)',
      watts: tierWatts,
      sharePct: totalWatts > 0 ? Math.round((tierWatts / totalWatts) * 100) : 0,
      items,
    };
  });

  return {
    activeAppliances,
    totalWatts,
    totalDemandKw,
    usableCapacityKwh,
    estimatedHours,
    priorityBreakdown,
  };
}

export interface RoiInputs {
  installationCost: number;
  annualSavingsYear1: number;
  annualMaintenanceCost: number;
  annualElectricityBillCurrent: number;
  utilityInflationPct: number;
  incentivePct: number; // Optional illustrative incentive, 0 by default until user enables/edits
  applyIncentive: boolean;
}

export function calculateRoiProjection(inputs: RoiInputs) {
  const incentiveAmount = inputs.applyIncentive
    ? Math.round(inputs.installationCost * (inputs.incentivePct / 100))
    : 0;
  const netInitialInvestment = Math.max(0, inputs.installationCost - incentiveAmount);

  const inflation = inputs.utilityInflationPct / 100;
  let cumulativeSavings = -netInitialInvestment;
  let cumulativeUtilityWithoutSystem = 0;
  let cumulativeCostWithSystem = netInitialInvestment;
  let paybackYear: number | null = null;

  const timeline: {
    year: string;
    yearNum: number;
    cumulativeNet: number;
    currentUtilityCost: number;
    postInstallCost: number;
    annualNetSavings: number;
  }[] = [];

  for (let yr = 1; yr <= 20; yr++) {
    const degradation = Math.pow(0.9955, yr - 1);
    const rateFactor = Math.pow(1 + inflation, yr - 1);

    const utilityThisYear = Math.round(inputs.annualElectricityBillCurrent * rateFactor);
    const savingsThisYear = Math.round(inputs.annualSavingsYear1 * degradation * rateFactor);
    const netThisYear = savingsThisYear - inputs.annualMaintenanceCost;

    const residualGridBill = Math.max(0, utilityThisYear - savingsThisYear);
    cumulativeUtilityWithoutSystem += utilityThisYear;
    cumulativeCostWithSystem += residualGridBill + inputs.annualMaintenanceCost;

    const prevCumulative = cumulativeSavings;
    cumulativeSavings += netThisYear;

    if (paybackYear === null && cumulativeSavings >= 0) {
      const fraction = prevCumulative < 0 ? Math.abs(prevCumulative) / Math.max(1, netThisYear) : 0;
      paybackYear = Number((yr - 1 + fraction).toFixed(1));
    }

    timeline.push({
      year: `Yr ${yr}`,
      yearNum: yr,
      cumulativeNet: Math.round(cumulativeSavings),
      currentUtilityCost: Math.round(cumulativeUtilityWithoutSystem),
      postInstallCost: Math.round(cumulativeCostWithSystem),
      annualNetSavings: Math.round(netThisYear),
    });
  }

  const yr10 = timeline[9];
  const yr20 = timeline[19];

  return {
    incentiveAmount,
    netInitialInvestment,
    paybackYear,
    tenYearNetSavings: yr10.cumulativeNet,
    twentyYearNetSavings: yr20.cumulativeNet,
    twentyYearUtilitySpend: yr20.currentUtilityCost,
    twentyYearPostInstallSpend: yr20.postInstallCost,
    timeline,
  };
}
