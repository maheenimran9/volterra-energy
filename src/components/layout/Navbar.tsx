import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Sun,
  BatteryCharging,
  Wind,
  Zap,
  LayoutGrid,
} from 'lucide-react';
import { PageId } from '../../types/energy';
import { PageContainer } from './PageContainer';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  overlayHero?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  overlayHero = false,
}) => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleGo = (page: PageId) => {
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const isTransparentMode = overlayHero && !scrolled && !mobileMenuOpen;
  const isSolutionActive = ['solutions', 'solar', 'battery', 'hvac', 'ev'].includes(currentPage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 flex items-center transition-colors duration-200 ${
          isTransparentMode
            ? 'bg-gradient-to-b from-[#071D1E]/65 to-transparent'
            : 'bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E2E0D8]'
        }`}
      >
        <PageContainer className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4">
          {/* Zone 1: Brand Wordmark (Left) */}
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => handleGo('home')}
              className={`flex items-center gap-2.5 h-10 transition-opacity hover:opacity-85 whitespace-nowrap shrink-0 cursor-pointer ${
                isTransparentMode ? 'text-white' : 'text-[#14171A]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  isTransparentMode ? 'bg-white' : 'bg-[#0B3B3C]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-sm rotate-45 ${
                    isTransparentMode ? 'bg-[#0B3B3C]' : 'bg-white'
                  }`}
                />
              </span>
              <span className="font-display font-bold tracking-wider text-base sm:text-lg">
                VOLTERRA
              </span>
            </button>
          </div>

          {/* Zone 2: True-Centered 5 Primary Nav Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden lg:flex items-center gap-1 p-1 rounded-full justify-self-center ${
              isTransparentMode
                ? 'bg-white/15 backdrop-blur-md border border-white/20'
                : 'bg-white border border-[#E2E0D8]'
            }`}
          >
            <button
              type="button"
              onClick={() => handleGo('home')}
              className={`h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'home'
                  ? isTransparentMode
                    ? 'bg-white text-[#14171A] shadow-sm'
                    : 'bg-[#0B3B3C] text-white'
                  : isTransparentMode
                  ? 'text-white/95 hover:bg-white/15'
                  : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
              }`}
            >
              Home
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setSolutionsOpen((prev) => !prev)}
                aria-expanded={solutionsOpen}
                className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSolutionActive
                    ? isTransparentMode
                      ? 'bg-white text-[#14171A] shadow-sm'
                      : 'bg-[#0B3B3C] text-white'
                    : isTransparentMode
                    ? 'text-white/95 hover:bg-white/15'
                    : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    solutionsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {solutionsOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl border border-[#E2E0D8] shadow-2xl p-2 z-50 text-left">
                  {[
                    {
                      id: 'solutions' as PageId,
                      icon: <LayoutGrid className="w-4 h-4 text-[#0B3B3C] mt-0.5 shrink-0" />,
                      title: 'All Solutions',
                      desc: 'See everything we install',
                    },
                    {
                      id: 'solar' as PageId,
                      icon: <Sun className="w-4 h-4 text-[#0B3B3C] mt-0.5 shrink-0" />,
                      title: 'Solar Energy',
                      desc: 'Cut electric bills up to 85%',
                    },
                    {
                      id: 'battery' as PageId,
                      icon: <BatteryCharging className="w-4 h-4 text-[#0B3B3C] mt-0.5 shrink-0" />,
                      title: 'Battery Storage',
                      desc: 'Store sunshine & prevent blackouts',
                    },
                    {
                      id: 'hvac' as PageId,
                      icon: <Wind className="w-4 h-4 text-[#0B3B3C] mt-0.5 shrink-0" />,
                      title: 'Heating & Cooling',
                      desc: 'Quiet heat pumps powered by solar',
                    },
                    {
                      id: 'ev' as PageId,
                      icon: <Zap className="w-4 h-4 text-[#0B3B3C] mt-0.5 shrink-0" />,
                      title: 'EV Charging',
                      desc: 'Charge your car from your roof',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleGo(item.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors cursor-pointer ${
                        currentPage === item.id ? 'bg-[#EEF3F2]' : 'hover:bg-[#F7F6F2]'
                      }`}
                    >
                      {item.icon}
                      <div>
                        <div className="text-sm font-semibold text-[#14171A]">{item.title}</div>
                        <div className="text-xs text-[#525860]">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleGo('projects')}
              className={`h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'projects' || currentPage === 'project-detail'
                  ? isTransparentMode
                    ? 'bg-white text-[#14171A] shadow-sm'
                    : 'bg-[#0B3B3C] text-white'
                  : isTransparentMode
                  ? 'text-white/95 hover:bg-white/15'
                  : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
              }`}
            >
              Projects
            </button>

            <button
              type="button"
              onClick={() => handleGo('about')}
              className={`h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'about'
                  ? isTransparentMode
                    ? 'bg-white text-[#14171A] shadow-sm'
                    : 'bg-[#0B3B3C] text-white'
                  : isTransparentMode
                  ? 'text-white/95 hover:bg-white/15'
                  : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
              }`}
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => handleGo('contact')}
              className={`h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'contact'
                  ? isTransparentMode
                    ? 'bg-white text-[#14171A] shadow-sm'
                    : 'bg-[#0B3B3C] text-white'
                  : isTransparentMode
                  ? 'text-white/95 hover:bg-white/15'
                  : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Consultation CTA + Fixed Mobile Menu Trigger (Right) */}
          <div className="justify-self-end flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleGo('contact')}
              className={`hidden sm:inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isTransparentMode
                  ? 'bg-white text-[#14171A] hover:bg-[#F2F1EC] shadow-md'
                  : 'bg-[#14171A] text-white hover:bg-[#0B3B3C]'
              }`}
            >
              <span>Get Free Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`lg:hidden inline-flex items-center justify-center gap-2 px-3.5 h-10 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isTransparentMode
                  ? 'bg-white/20 backdrop-blur-md text-white border border-white/25'
                  : 'bg-white border border-[#E2E0D8] text-[#14171A]'
              }`}
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </PageContainer>
      </header>

      {/* Fixed Mobile Navigation Drawer + Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-[#071D1E]/45 backdrop-blur-xs"
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-50 bg-[#F9F8F5] border-b border-[#E2E0D8] shadow-2xl max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto"
          >
            <PageContainer className="py-5 space-y-5">
              <div className="space-y-1">
                {[
                  { id: 'home' as PageId, label: 'Home' },
                  { id: 'projects' as PageId, label: 'Projects' },
                  { id: 'about' as PageId, label: 'About Us' },
                  { id: 'assessment' as PageId, label: '30-Second Savings Calculator' },
                  { id: 'maintenance' as PageId, label: 'Care & Maintenance Plans' },
                  { id: 'contact' as PageId, label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleGo(item.id)}
                    className={`w-full flex items-center justify-between px-4 h-12 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                      currentPage === item.id
                        ? 'bg-[#0B3B3C] text-white'
                        : 'text-[#14171A] hover:bg-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="border-t border-[#E2E0D8] pt-4 space-y-2">
                <div className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[#525860]">
                  Services
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'solutions' as PageId, label: 'All Services' },
                    { id: 'solar' as PageId, label: 'Solar Panels' },
                    { id: 'battery' as PageId, label: 'Batteries' },
                    { id: 'hvac' as PageId, label: 'Heating & AC' },
                    { id: 'ev' as PageId, label: 'EV Charging' },
                  ].map((sol, idx) => (
                    <button
                      key={sol.id}
                      type="button"
                      onClick={() => handleGo(sol.id)}
                      className={`flex items-center justify-between px-3.5 h-11 rounded-xl text-xs sm:text-sm font-medium text-left transition-colors cursor-pointer ${
                        idx === 0 ? 'col-span-2' : ''
                      } ${
                        currentPage === sol.id
                          ? 'bg-[#0B3B3C] text-white'
                          : 'bg-white border border-[#E2E0D8] text-[#14171A]'
                      }`}
                    >
                      <span>{sol.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 pb-2">
                <button
                  type="button"
                  onClick={() => handleGo('contact')}
                  className="w-full inline-flex items-center justify-center gap-2.5 h-12 pl-5 pr-2 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
                >
                  <span>Get Free Quote</span>
                  <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </PageContainer>
          </nav>
        </>
      )}
    </>
  );
};
