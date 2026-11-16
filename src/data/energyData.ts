import {
  ApplianceItem,
  DashboardRange,
  DashboardSnapshot,
  MaintenancePlan,
  ProjectCaseStudy,
  RegionCode,
} from '../types/energy';

import corporateHeroImg from '../assets/images/volterra_corporate_hero_1794736034338.jpg';
import evPavilionImg from '../assets/images/volterra_ev_pavilion_1794736035286.jpg';
import heroSolarImg from '../assets/images/hero_architectural_solar_1794734673223.jpg';
import commercialCampusImg from '../assets/images/commercial_solar_campus_1794734673986.jpg';
import batteryWallImg from '../assets/images/volterra_battery_wall_1794735278079.jpg';
import smartHvacImg from '../assets/images/smart_hvac_interior_1794734675229.jpg';
import sydneyVillaImg from '../assets/images/project_sydney_villa_1794734675384.jpg';
import londonHubImg from '../assets/images/project_london_hub_1794734676418.jpg';

export const IMAGES = {
  corporateHero: corporateHeroImg,
  evPavilion: evPavilionImg,
  heroSolar: heroSolarImg,
  commercialCampus: commercialCampusImg,
  batteryWall: batteryWallImg,
  smartHvac: smartHvacImg,
  sydneyVilla: sydneyVillaImg,
  londonHub: londonHubImg,
};

export const REGION_CONFIG: Record<
  RegionCode,
  {
    name: string;
    currency: string;
    defaultRate: number;
    sunYieldFactor: number; // kWh per kW per year
    hubCity: string;
    address: string;
    phone: string;
  }
> = {
  USA: {
    name: 'United States',
    currency: '$',
    defaultRate: 0.21,
    sunYieldFactor: 1480,
    hubCity: 'Austin, TX',
    address: '401 Congress Ave, Suite 1800, Austin, TX 78701',
    phone: '+1 (512) 555-0194',
  },
  UK: {
    name: 'United Kingdom',
    currency: '£',
    defaultRate: 0.28,
    sunYieldFactor: 1020,
    hubCity: 'London',
    address: '28 Bishopsgate, Level 14, London EC2N 4BQ',
    phone: '+44 20 7946 0821',
  },
  AU: {
    name: 'Australia',
    currency: 'A$',
    defaultRate: 0.31,
    sunYieldFactor: 1560,
    hubCity: 'Sydney',
    address: '100 Barangaroo Ave, Tower 1, Sydney NSW 2000',
    phone: '+61 2 8000 4190',
  },
  CA: {
    name: 'Canada',
    currency: 'C$',
    defaultRate: 0.17,
    sunYieldFactor: 1240,
    hubCity: 'Toronto',
    address: '181 Bay Street, Suite 2400, Toronto, ON M5J 2T3',
    phone: '+1 (416) 555-0148',
  },
};

export const APPLIANCES: ApplianceItem[] = [
  {
    id: 'fridge',
    name: 'Refrigerator',
    watts: 180,
    category: 'Critical',
    priority: 1,
    description: 'Keeps groceries fresh all day and night',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Router & Internet',
    watts: 25,
    category: 'Critical',
    priority: 1,
    description: 'Home internet modem and Wi-Fi network',
  },
  {
    id: 'lighting',
    name: 'Home LED Lights',
    watts: 140,
    category: 'Critical',
    priority: 1,
    description: 'Kitchen, living room, hallway, and porch lights',
  },
  {
    id: 'computer',
    name: 'Home Office & Laptop',
    watts: 220,
    category: 'Comfort',
    priority: 2,
    description: 'Work laptop, monitors, and desk charger',
  },
  {
    id: 'tv',
    name: 'TV & Sound System',
    watts: 160,
    category: 'Comfort',
    priority: 2,
    description: 'Living room TV and streaming box',
  },
  {
    id: 'washing',
    name: 'Washing Machine',
    watts: 750,
    category: 'Heavy Load',
    priority: 3,
    description: 'Standard home laundry cycle',
  },
  {
    id: 'ac',
    name: 'Air Conditioning / Heat Pump',
    watts: 1850,
    category: 'Heavy Load',
    priority: 3,
    description: 'Central cooling or heating system',
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'westlake-residence',
    title: 'Westlake Limestone Residence',
    location: 'Austin, Texas, USA',
    country: 'USA',
    propertyType: 'Residential',
    categories: ['Residential', 'Solar', 'Battery', 'HVAC'],
    installedSystem: '14.4 kW Flush Solar + 27 kWh Backup Battery + Whole-Home Heating & Cooling',
    systemCapacity: '14.4 kW / 27 kWh',
    illustrativeCost: '$48,500',
    annualProduction: '21,400 kWh/yr',
    annualSavings: '$4,380/yr',
    image: IMAGES.heroSolar,
    summary:
      'A 4,600 sq ft family home that cut its yearly grid power use by 94% and stays powered through Texas summer storms.',
    challenge:
      'Brutal summer heat kept the AC running non-stop, and the homeowners wanted sleek panels clamped cleanly onto their metal roof without drilling leaks.',
    engineeringSolution:
      'We installed 36 all-black panels using clamp-on mounts, two wall-mounted backup batteries in the garage, and a quiet heat pump that pre-cools the home using free afternoon sunshine.',
    specs: [
      { label: 'Solar Panels', value: '36 × High-Output Black Panels' },
      { label: 'Backup Batteries', value: '2 × 13.5 kWh Home Batteries' },
      { label: 'Heating & Cooling', value: '5-Zone Quiet Heat Pump' },
      { label: 'Grid Bill Reduction', value: 'Up to 94% Lower Power Use' },
    ],
  },
  {
    id: 'global-innovations-hq',
    title: 'Global Innovations Headquarters',
    location: 'Toronto, Ontario, Canada',
    country: 'CA',
    propertyType: 'Commercial',
    categories: ['Commercial', 'Solar', 'Battery'],
    installedSystem: '185 kW Rooftop Solar + EV Carport + 160 kWh Commercial Battery',
    systemCapacity: '185 kW / 160 kWh',
    illustrativeCost: '$312,000',
    annualProduction: '229,400 kWh/yr',
    annualSavings: '$44,200/yr',
    image: IMAGES.commercialCampus,
    summary:
      'An office headquarters and 12-car solar EV parking canopy cutting expensive afternoon business electricity charges.',
    challenge:
      'Afternoon utility surcharges and employee electric vehicle charging made up over 40% of the company’s monthly power bill.',
    engineeringSolution:
      'Our team fitted a non-drilling rooftop solar system along with shaded EV parking canopies and a large battery bank that automatically kicks in during peak business hours.',
    specs: [
      { label: 'Rooftop Solar', value: '185 kW Flat-Roof System' },
      { label: 'EV Parking', value: '12 × Smart Workplace Chargers' },
      { label: 'Peak Bill Savings', value: 'Up to 38% Lower Peak Fees' },
      { label: 'Roof Protection', value: 'Zero-Penetration Weighted Mounts' },
    ],
  },
  {
    id: 'vaucluse-coastal-villa',
    title: 'Vaucluse Coastal Villa',
    location: 'Sydney, NSW, Australia',
    country: 'AU',
    propertyType: 'Residential',
    categories: ['Residential', 'Solar', 'Battery', 'HVAC'],
    installedSystem: '12.0 kW Coastal Solar + 20 kWh Battery + Smart Pool & Home Climate',
    systemCapacity: '12.0 kW / 20 kWh',
    illustrativeCost: 'A$41,800',
    annualProduction: '18,720 kWh/yr',
    annualSavings: 'A$5,620/yr',
    image: IMAGES.sydneyVilla,
    summary:
      'Salt-resistant rooftop solar and smart battery storage built to keep a clean architectural roofline overlooking Sydney Harbour.',
    challenge:
      'Ocean wind and salty sea air require rugged hardware, while the homeowners wanted the panels hidden cleanly behind their flat roof edge.',
    engineeringSolution:
      'We used corrosion-proof dark mounting frames tucked out of sight behind the roofline, paired with a 20 kWh battery and automatic daytime scheduling for the pool and AC.',
    specs: [
      { label: 'Coastal Durability', value: 'Salt-Mist & Storm Rated' },
      { label: 'Backup Battery', value: '20 kWh Indoor/Outdoor Unit' },
      { label: 'Smart Scheduling', value: 'Pool & 4-Room Climate Sync' },
      { label: 'Evening Savings', value: 'Automatic Night Power Switch' },
    ],
  },
  {
    id: 'southbank-engineering-hub',
    title: 'London Innovation & Design Hub',
    location: 'London, United Kingdom',
    country: 'UK',
    propertyType: 'Commercial',
    categories: ['Commercial', 'Solar', 'HVAC'],
    installedSystem: '96 kW Rooftop Solar + Commercial Air-Source Heat Pumps',
    systemCapacity: '96 kW / 80 kWh',
    illustrativeCost: '£178,000',
    annualProduction: '97,920 kWh/yr',
    annualSavings: '£28,900/yr',
    image: IMAGES.londonHub,
    summary:
      'A 32,000 sq ft creative office complex replacing old gas boilers with solar-powered heating and six staff EV bays.',
    challenge:
      'Aging gas heaters and high daytime commercial electricity prices made winter operating costs unpredictable across three floors.',
    engineeringSolution:
      'We swapped out the old boilers for clean commercial heat pumps powered directly by a 96 kW south-facing rooftop array and added six dual-car chargers.',
    specs: [
      { label: 'Solar Array', value: '96 kW High-Output Panels' },
      { label: 'Building Heating', value: '3 × Commercial Heat Pumps' },
      { label: 'Staff EV Bays', value: '6 × Dual-Port Chargers' },
      { label: 'Smart Control', value: 'Central Building Energy App' },
    ],
  },
  {
    id: 'cotswolds-barn-estate',
    title: 'Surrey Architectural Barn',
    location: 'Guildford, United Kingdom',
    country: 'UK',
    propertyType: 'Residential',
    categories: ['Residential', 'Battery', 'HVAC'],
    installedSystem: '10 kW Slate-Flush Solar + 13.5 kWh Battery + Hidden Ceiling HVAC',
    systemCapacity: '10.0 kW / 13.5 kWh',
    illustrativeCost: '£32,400',
    annualProduction: '10,400 kWh/yr',
    annualSavings: '£3,150/yr',
    image: IMAGES.smartHvac,
    summary:
      'Discreet solar tiles, hidden ceiling vents, and garage battery storage tailored for a restored timber barn.',
    challenge:
      'Strict heritage styling meant bulky wall radiators and tall roof racks were out of the question.',
    engineeringSolution:
      'We recessed sleek solar panels flush with the slate roof, tucked whisper-quiet air vents inside the ceiling shadow gaps, and placed a slim battery neatly on the garage wall.',
    specs: [
      { label: 'Roof Look', value: 'Flush Slate-Matched Panels' },
      { label: 'Air Vents', value: 'Slim Hidden Ceiling Slots' },
      { label: 'Battery Storage', value: '13.5 kWh Slim Wall Unit' },
      { label: 'Noise Level', value: 'Whisper Quiet Indoors' },
    ],
  },
  {
    id: 'scottsdale-reserve',
    title: 'Desert Horizon Solar & Storage',
    location: 'Scottsdale, Arizona, USA',
    country: 'USA',
    propertyType: 'Residential',
    categories: ['Residential', 'Solar', 'Battery'],
    installedSystem: '15 kW Heat-Resistant Solar + 40 kWh Dual Battery Bank',
    systemCapacity: '15.0 kW / 40 kWh',
    illustrativeCost: '$54,200',
    annualProduction: '25,200 kWh/yr',
    annualSavings: '$5,120/yr',
    image: IMAGES.batteryWall,
    summary:
      'High-heat solar panels and a 40 kWh battery setup built to completely avoid expensive 4 PM–9 PM desert utility rates.',
    challenge:
      'Arizona summer roofs top 115°F while double AC units run hard every evening when utility companies charge peak prices.',
    engineeringSolution:
      'We installed heat-tolerant solar panels and a large 40 kWh battery bank that powers both AC systems smoothly through the entire evening peak window.',
    specs: [
      { label: 'Heat Performance', value: 'High-Temp Solar Cells' },
      { label: 'Backup Capacity', value: '40 kWh Whole-Home Bank' },
      { label: 'Peak Hours Covered', value: '100% Off-Grid 4 PM – 9 PM' },
      { label: 'Outdoor Rated', value: 'Weatherproof Sealed Units' },
    ],
  },
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'essential',
    name: 'Essential Care',
    audience: 'Best for solar-only homes',
    annualPrice: 199,
    description:
      'Once-a-year inspection and remote health alerts to keep your rooftop panels producing strong power.',
    features: {
      solarInspection: 'Visual check & thermal scan',
      performanceMonitoring: 'Monthly power output alerts',
      electricalInspection: 'Breaker & switch safety check',
      batteryAssessment: 'Not included',
      hvacInspection: 'Not included',
      prioritySupport: '48-hour phone & email reply',
      annualVisits: '1 scheduled visit per year',
    },
  },
  {
    id: 'complete',
    name: 'Complete Care',
    audience: 'Best for Solar + Battery + EV homes',
    annualPrice: 399,
    description:
      'Full panel wash, electrical safety testing, and battery health checks, making it our most popular plan for home systems.',
    features: {
      solarInspection: 'Full panel wash & output test',
      performanceMonitoring: '24/7 fault alerts & report',
      electricalInspection: 'Full panel & grounding check',
      batteryAssessment: 'Battery health & software update',
      hvacInspection: 'Filter & cooling checkup',
      prioritySupport: '24-hour priority team support',
      annualVisits: '2 scheduled visits per year',
    },
  },
  {
    id: 'priority',
    name: 'Priority Care',
    audience: 'Best for large homes & businesses',
    annualPrice: 599,
    description:
      'Top-tier proactive care covering large solar arrays, backup battery banks, and whole-building heat pumps.',
    features: {
      solarInspection: 'Drone thermal scan & deep clean',
      performanceMonitoring: 'Real-time health & rate tuning',
      electricalInspection: 'Full commercial safety test',
      batteryAssessment: 'Live outage switchover drill',
      hvacInspection: 'Twice-yearly coil & airflow tune',
      prioritySupport: 'Same-day priority dispatch',
      annualVisits: '2 visits + 1 emergency callout',
    },
  },
];

export const TESTIMONIALS = [
  {
    name: 'Marcus Halvorsen',
    role: 'Homeowner & Architect',
    location: 'Austin, USA',
    quote:
      'Our summer electric bills used to hit $480 every month. In our first year with Volterra solar and batteries, we bought 91% less power from the utility company.',
    outcome: '91% lower grid power bills',
  },
  {
    name: 'Claire Pemberton',
    role: 'Operations Director, Southbank Creative',
    location: 'London, UK',
    quote:
      'Volterra took care of our office solar, heat pumps, and six EV bays without disrupting our workday. Our peak afternoon power costs dropped by £2,300 a month.',
    outcome: '£2,300/mo lower business bills',
  },
  {
    name: 'Lachlan Reid',
    role: 'Homeowner',
    location: 'Sydney, Australia',
    quote:
      'We wanted clean panels that wouldn’t ruin our flat roofline. During two winter storms this year, the house switched to battery backup so fast we didn’t even notice the street lost power.',
    outcome: 'Zero power blink during storms',
  },
];

export const DASHBOARD_SAMPLES: Record<DashboardRange, DashboardSnapshot> = {
  today: {
    rangeLabel: 'Sample Day Profile (Clear Sky)',
    currentProductionKw: 7.4,
    householdConsumptionKw: 3.1,
    batterySocPct: 84,
    gridFlowKw: 2.8,
    periodSavingsUsd: 11.4,
    energyIndependencePct: 92,
    solarTotalKwh: 46.2,
    consumedTotalKwh: 31.8,
    exportedTotalKwh: 16.4,
    series: [
      { label: '06:00', solar: 0.4, consumption: 1.8, batterySoc: 42 },
      { label: '08:00', solar: 2.9, consumption: 2.4, batterySoc: 48 },
      { label: '10:00', solar: 6.4, consumption: 2.2, batterySoc: 66 },
      { label: '12:00', solar: 8.8, consumption: 2.8, batterySoc: 88 },
      { label: '14:00', solar: 8.2, consumption: 3.4, batterySoc: 98 },
      { label: '16:00', solar: 5.5, consumption: 4.1, batterySoc: 96 },
      { label: '18:00', solar: 1.8, consumption: 5.2, batterySoc: 84 },
      { label: '20:00', solar: 0.0, consumption: 3.9, batterySoc: 68 },
      { label: '22:00', solar: 0.0, consumption: 2.1, batterySoc: 56 },
    ],
  },
  '7d': {
    rangeLabel: 'Sample 7-Day Cycle',
    currentProductionKw: 6.8,
    householdConsumptionKw: 2.9,
    batterySocPct: 78,
    gridFlowKw: 2.1,
    periodSavingsUsd: 74.8,
    energyIndependencePct: 88,
    solarTotalKwh: 298,
    consumedTotalKwh: 224,
    exportedTotalKwh: 96,
    series: [
      { label: 'Mon', solar: 44, consumption: 31, batterySoc: 82 },
      { label: 'Tue', solar: 48, consumption: 33, batterySoc: 90 },
      { label: 'Wed', solar: 32, consumption: 35, batterySoc: 68 },
      { label: 'Thu', solar: 46, consumption: 29, batterySoc: 88 },
      { label: 'Fri', solar: 49, consumption: 32, batterySoc: 94 },
      { label: 'Sat', solar: 39, consumption: 34, batterySoc: 79 },
      { label: 'Sun', solar: 40, consumption: 30, batterySoc: 84 },
    ],
  },
  '30d': {
    rangeLabel: 'Sample 30-Day Billing Window',
    currentProductionKw: 7.1,
    householdConsumptionKw: 3.2,
    batterySocPct: 81,
    gridFlowKw: 2.4,
    periodSavingsUsd: 318.5,
    energyIndependencePct: 86,
    solarTotalKwh: 1290,
    consumedTotalKwh: 985,
    exportedTotalKwh: 412,
    series: [
      { label: 'Wk 1', solar: 310, consumption: 242, batterySoc: 84 },
      { label: 'Wk 2', solar: 338, consumption: 251, batterySoc: 89 },
      { label: 'Wk 3', solar: 294, consumption: 238, batterySoc: 76 },
      { label: 'Wk 4', solar: 348, consumption: 254, batterySoc: 91 },
    ],
  },
  '12m': {
    rangeLabel: 'Sample Annual Telemetry',
    currentProductionKw: 6.5,
    householdConsumptionKw: 3.0,
    batterySocPct: 80,
    gridFlowKw: 1.9,
    periodSavingsUsd: 3840,
    energyIndependencePct: 84,
    solarTotalKwh: 15120,
    consumedTotalKwh: 11840,
    exportedTotalKwh: 4680,
    series: [
      { label: 'Jan', solar: 820, consumption: 1080, batterySoc: 62 },
      { label: 'Mar', solar: 1240, consumption: 940, batterySoc: 79 },
      { label: 'May', solar: 1580, consumption: 910, batterySoc: 91 },
      { label: 'Jul', solar: 1740, consumption: 1120, batterySoc: 95 },
      { label: 'Sep', solar: 1410, consumption: 960, batterySoc: 86 },
      { label: 'Nov', solar: 910, consumption: 1020, batterySoc: 68 },
    ],
  },
};
