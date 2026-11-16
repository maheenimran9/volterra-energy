import { useEffect } from 'react';
import { PageId, ProjectCaseStudy } from '../types/energy';

export interface RouteSeoMeta {
  title: string;
  description: string;
  schemaType: 'Organization' | 'Service' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'WebApplication';
  serviceName?: string;
}

export const ROUTE_SEO: Record<PageId, RouteSeoMeta> = {
  home: {
    title: 'Volterra Energy – Save Up to 85% With Solar, Batteries & Heating',
    description:
      'Cut your monthly electric bill and protect your property from blackouts with custom solar panels, backup batteries, quiet heat pumps, and EV chargers.',
    schemaType: 'Organization',
  },
  solutions: {
    title: 'Our Energy Services – Solar, Battery, Heating & EV | Volterra',
    description:
      'Explore simple, reliable solar panels, backup batteries, clean heating & cooling, and home or workplace EV charging.',
    schemaType: 'Service',
    serviceName: 'Clean Energy Installation Services',
  },
  solar: {
    title: 'Solar Panel Installation – Homes & Businesses | Volterra',
    description:
      'Lower your electric bill up to 85% with sleek, weatherproof solar panels, full city permitting, and a 25-year performance warranty.',
    schemaType: 'Service',
    serviceName: 'Solar Panel Installation',
  },
  battery: {
    title: 'Home & Business Battery Backup Systems | Volterra Energy',
    description:
      'Store free daytime solar power for nighttime use and keep lights, Wi-Fi, and appliances running automatically during blackouts.',
    schemaType: 'Service',
    serviceName: 'Battery Backup Storage',
  },
  hvac: {
    title: 'Quiet Heat Pumps & Solar Heating Systems | Volterra Energy',
    description:
      'Upgrade old heating and AC to quiet, energy-saving heat pumps powered cleanly by rooftop solar with year-round service care.',
    schemaType: 'Service',
    serviceName: 'Heating & Cooling Systems',
  },
  ev: {
    title: 'Home EV Chargers & Solar Parking Canopies | Volterra Energy',
    description:
      'Charge your electric car from your own solar panels at home or add workplace charging stations without costly panel upgrades.',
    schemaType: 'Service',
    serviceName: 'EV Charging Installation',
  },
  projects: {
    title: 'Real Customer Savings & Projects | Volterra Energy',
    description:
      'See real solar, battery, and heating projects across the USA, UK, Australia, and Canada, including annual power bill savings.',
    schemaType: 'CollectionPage',
  },
  'project-detail': {
    title: 'Customer Project & Savings Case Study | Volterra Energy',
    description:
      'See exact system size, installation approach, yearly power produced, and annual savings for this Volterra project.',
    schemaType: 'CollectionPage',
  },
  about: {
    title: 'About Volterra Energy – Local Licensed Energy Teams',
    description:
      'Meet the licensed engineers behind Volterra Energy handling design, city permits, installation, and long-term care in the USA, UK, AU & Canada.',
    schemaType: 'AboutPage',
  },
  assessment: {
    title: '30-Second Solar Savings Calculator | Volterra Energy',
    description:
      'Enter your average monthly electric bill to see recommended panel size, monthly bill drop, and payback years in 30 seconds.',
    schemaType: 'WebApplication',
    serviceName: 'Volterra Solar Savings Calculator',
  },
  maintenance: {
    title: 'Annual Solar, Battery & Heating Care Plans | Volterra',
    description:
      'Keep your system running like new with annual panel cleaning, battery health checks, and heating tune-ups starting at $199/year.',
    schemaType: 'Service',
    serviceName: 'Solar, Battery & HVAC Care Plans',
  },
  contact: {
    title: 'Get a Free Quote – Speak With an Engineer | Volterra Energy',
    description:
      'Call a local Volterra office or request a free 24-hour custom quote for solar panels, backup batteries, heating, or EV charging.',
    schemaType: 'ContactPage',
  },
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function upsertJsonLd(data: Record<string, unknown>) {
  let script = document.getElementById('volterra-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'volterra-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function usePageSeo(page: PageId, project?: ProjectCaseStudy) {
  useEffect(() => {
    const base = ROUTE_SEO[page];
    const title =
      page === 'project-detail' && project
        ? `${project.title} – Case Study | Volterra Energy`
        : base.title;
    const description =
      page === 'project-detail' && project
        ? `${project.installedSystem} in ${project.location}. ${project.summary}`.slice(0, 158)
        : base.description;

    const currentUrl = window.location.origin + window.location.pathname;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'Volterra Energy');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', currentUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(currentUrl);

    const orgSchema = {
      '@type': 'Organization',
      name: 'Volterra Energy',
      url: window.location.origin,
      email: 'engineering@volterraenergy.com',
      areaServed: ['US', 'GB', 'AU', 'CA'],
    };

    let schema: Record<string, unknown>;
    if (base.schemaType === 'Service') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: base.serviceName || title,
        description,
        url: currentUrl,
        provider: orgSchema,
        areaServed: ['United States', 'United Kingdom', 'Australia', 'Canada'],
      };
    } else if (base.schemaType === 'WebApplication') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: base.serviceName || title,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        description,
        url: currentUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      };
    } else if (base.schemaType === 'Organization') {
      schema = {
        '@context': 'https://schema.org',
        ...orgSchema,
        description,
      };
    } else {
      schema = {
        '@context': 'https://schema.org',
        '@type': base.schemaType,
        name: title,
        description,
        url: currentUrl,
        publisher: orgSchema,
      };
    }

    upsertJsonLd(schema);
  }, [page, project]);
}
