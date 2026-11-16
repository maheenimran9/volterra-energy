import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { REGION_CONFIG } from '../../data/energyData';
import { BookingServiceType, PageId, PropertyType } from '../../types/energy';
import { PageContainer } from './PageContainer';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onBookWithContext?: (
    summary: string,
    postal?: string,
    propertyType?: PropertyType,
    service?: BookingServiceType
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookWithContext }) => {
  const [devPopoverOpen, setDevPopoverOpen] = useState(false);
  const devRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (devRef.current && !devRef.current.contains(e.target as Node)) {
        setDevPopoverOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDevPopoverOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <footer className="bg-[#14171A] text-[#E6E4DD] border-t border-white/10">
      <PageContainer className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <span className="w-7 h-7 rounded-full bg-[#0B3B3C] border border-white/20 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-sm bg-white rotate-45" />
              </span>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                VOLTERRA ENERGY
              </span>
            </button>
            <p className="text-sm text-[#A3A8AE] leading-relaxed max-w-sm">
              Helping homeowners and businesses cut electric bills with solar panels, backup
              batteries, quiet heating, and EV chargers across the USA, UK, Australia, and Canada.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full bg-white text-[#14171A] font-semibold text-sm hover:bg-[#F2F1EC] transition-colors cursor-pointer"
            >
              <span>Get Free Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-white tracking-wide mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm text-[#A3A8AE]">
              {[
                { id: 'solutions' as PageId, label: 'All Services' },
                { id: 'solar' as PageId, label: 'Solar Panels' },
                { id: 'battery' as PageId, label: 'Battery Storage' },
                { id: 'hvac' as PageId, label: 'Heating & Cooling' },
                { id: 'ev' as PageId, label: 'EV Charging' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Tools */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-white tracking-wide mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-[#A3A8AE]">
              {[
                { id: 'projects' as PageId, label: 'Projects' },
                { id: 'about' as PageId, label: 'About Us' },
                { id: 'assessment' as PageId, label: 'Savings Calculator' },
                { id: 'maintenance' as PageId, label: 'Maintenance Plans' },
                { id: 'contact' as PageId, label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Contact Information */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold text-white tracking-wide">Regional Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#A3A8AE]">
              {Object.entries(REGION_CONFIG).map(([code, hub]) => (
                <div key={code} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      onBookWithContext
                        ? onBookWithContext(`Inquiry for ${hub.hubCity} (${code}) office`)
                        : onNavigate('contact')
                    }
                    className="text-white font-semibold hover:text-[#93C5FD] transition-colors cursor-pointer text-left"
                  >
                    {hub.hubCity} · {code}
                  </button>
                  <div className="leading-snug">{hub.address}</div>
                  <a
                    href={`tel:${hub.phone.replace(/[^+\d]/g, '')}`}
                    className="block font-mono-num text-[#93C5FD] hover:underline"
                  >
                    {hub.phone}
                  </a>
                </div>
              ))}
            </div>
            <div className="pt-2 text-xs text-[#A3A8AE]">
              Email:{' '}
              <a
                href="mailto:engineering@volterraenergy.com"
                className="text-white hover:underline"
              >
                engineering@volterraenergy.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright + Direct Utility Links + Interactive Developer Credit */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#7D838A]">
            <p>
              © {new Date().getFullYear()} Volterra Energy Ltd. Serving the United States, United
              Kingdom, Australia, and Canada.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-[#A3A8AE]">
              {[
                { label: 'Savings Calculator', page: 'assessment' as PageId },
                { label: 'Maintenance Plans', page: 'maintenance' as PageId },
                { label: 'Projects', page: 'projects' as PageId },
                { label: 'Contact Support', page: 'contact' as PageId },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={devRef}
            onMouseEnter={() => setDevPopoverOpen(true)}
            onMouseLeave={() => setDevPopoverOpen(false)}
            className="relative inline-block pt-1"
          >
            {devPopoverOpen && (
              <div
                role="menu"
                aria-label="Developer social profiles"
                className="absolute bottom-full left-0 pb-2.5 z-40"
              >
                <div className="relative min-w-[230px] rounded-xl bg-[#0B3B3C] border border-white/15 shadow-2xl p-2 text-[#F9F8F5]">
                  <a
                    href="https://www.linkedin.com/in/maheenimran9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#F9F8F5] hover:bg-white/10 transition-colors"
                  >
                    <span>See LinkedIn Profile</span>
                    <ArrowUpRight className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  </a>
                  <a
                    href="https://github.com/maheenimran9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#F9F8F5] hover:bg-white/10 transition-colors"
                  >
                    <span>See GitHub Profile</span>
                    <ArrowUpRight className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  </a>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-12 w-3 h-3 rotate-45 bg-[#0B3B3C] border-r border-b border-white/15"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setDevPopoverOpen((v) => !v)}
              aria-expanded={devPopoverOpen}
              className="text-xs tracking-wider uppercase font-semibold text-[#7D838A] hover:text-[#F9F8F5] transition-colors cursor-pointer text-left"
            >
              DEVELOPED BY{' '}
              <span className="italic font-bold text-[#93C5FD] hover:text-white transition-colors">
                MAHEEN IMRAN
              </span>
            </button>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
