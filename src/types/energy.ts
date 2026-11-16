export type PageId =
  | 'home'
  | 'solutions'
  | 'solar'
  | 'battery'
  | 'hvac'
  | 'ev'
  | 'projects'
  | 'project-detail'
  | 'about'
  | 'assessment'
  | 'maintenance'
  | 'contact';

export type PropertyType = 'residential' | 'commercial';
export type RegionCode = 'USA' | 'UK' | 'AU' | 'CA';
export type CurrentSystemType = 'grid-only' | 'legacy-solar' | 'gas-hvac-grid';

export interface AssessmentInputs {
  propertyType: PropertyType;
  region: RegionCode;
  propertySizeSqFt: number;
  monthlyBill: number;
  monthlyKwh: number;
  postalCode: string;
  currentSystem: CurrentSystemType;
  electricityRate: number;
  annualEscalationPct: number;
}

export interface AssessmentResults {
  recommendedSolarKw: number;
  estimatedBatteryKwh: number;
  annualProductionKwh: number;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  estimatedInstallationCost: number;
  paybackYears: number;
  twentyYearSavings: number;
  offsetPercentage: number;
  monthlyBreakdown: {
    month: string;
    productionKwh: number;
    consumptionKwh: number;
  }[];
}

export type SolarOptionKw = 5 | 8 | 10 | 15;
export type BatteryOptionKwh = 0 | 10 | 13.5 | 20;
export type HvacOptionId = 'none' | 'single-zone' | 'multi-zone' | 'smart-heat-pump';

export interface SystemBuilderConfig {
  solarKw: SolarOptionKw;
  batteryKwh: BatteryOptionKwh;
  hvac: HvacOptionId;
  evCharger: boolean;
  smartMonitoring: boolean;
  extendedWarranty: boolean;
}

export interface ApplianceItem {
  id: string;
  name: string;
  watts: number;
  category: 'Critical' | 'Comfort' | 'Heavy Load';
  priority: number;
  description: string;
}

export type ProjectCategory = 'Residential' | 'Commercial' | 'Solar' | 'Battery' | 'HVAC';

export interface ProjectCaseStudy {
  id: string;
  title: string;
  location: string;
  country: RegionCode;
  propertyType: 'Residential' | 'Commercial';
  categories: ProjectCategory[];
  installedSystem: string;
  systemCapacity: string;
  illustrativeCost: string;
  annualProduction: string;
  annualSavings: string;
  image: string;
  summary: string;
  challenge: string;
  engineeringSolution: string;
  specs: { label: string; value: string }[];
}

export interface MaintenancePlan {
  id: 'essential' | 'complete' | 'priority';
  name: string;
  audience: string;
  annualPrice: number;
  description: string;
  features: {
    solarInspection: string;
    performanceMonitoring: string;
    electricalInspection: string;
    batteryAssessment: string;
    hvacInspection: string;
    prioritySupport: string;
    annualVisits: string;
  };
}

export type RoofType = 'Flat' | 'Sloped' | 'Metal' | 'Tile';
export type BookingServiceType =
  | 'Solar'
  | 'Battery'
  | 'HVAC'
  | 'EV Charging'
  | 'Complete Energy Solution';

export type ContactMethod = 'Email' | 'Phone Call' | 'Video Consultation';

export interface ConsultationBookingData {
  postalCode: string;
  propertyType: PropertyType;
  roofType: RoofType;
  services: BookingServiceType[];
  preferredDate: string;
  preferredTime: string;
  preferredContactMethod: ContactMethod;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  customConfigSummary?: string;
}

export type DashboardRange = 'today' | '7d' | '30d' | '12m';

export interface DashboardSnapshot {
  rangeLabel: string;
  currentProductionKw: number;
  householdConsumptionKw: number;
  batterySocPct: number;
  gridFlowKw: number; // positive = exporting, negative = importing
  periodSavingsUsd: number;
  energyIndependencePct: number;
  solarTotalKwh: number;
  consumedTotalKwh: number;
  exportedTotalKwh: number;
  series: {
    label: string;
    solar: number;
    consumption: number;
    batterySoc: number;
  }[];
}
