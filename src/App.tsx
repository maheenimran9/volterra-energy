import { useEffect, useState } from 'react';
import { PROJECTS } from './data/energyData';
import { BookingServiceType, PageId, ProjectCaseStudy, PropertyType } from './types/energy';
import { usePageSeo } from './utils/seo';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolarSolutionsPage } from './pages/SolarSolutionsPage';
import { BatteryStoragePage } from './pages/BatteryStoragePage';
import { HvacSystemsPage } from './pages/HvacSystemsPage';
import { EvChargingPage } from './pages/EvChargingPage';
import { EnergyAssessmentPage } from './pages/EnergyAssessmentPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { MaintenancePlansPage } from './pages/MaintenancePlansPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactBookingPage } from './pages/ContactBookingPage';

const PAGE_TO_PATH: Record<Exclude<PageId, 'project-detail'>, string> = {
  home: '/',
  solutions: '/solutions',
  solar: '/solutions/solar',
  battery: '/solutions/battery-storage',
  hvac: '/solutions/hvac',
  ev: '/solutions/ev-charging',
  projects: '/projects',
  about: '/about',
  assessment: '/energy-assessment',
  maintenance: '/maintenance',
  contact: '/contact',
};

function parseRoute(pathname: string): { page: PageId; projectId: string | null } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean.startsWith('/projects/')) {
    const id = clean.slice('/projects/'.length);
    const match = PROJECTS.find((p) => p.id === id);
    if (match) {
      return { page: 'project-detail', projectId: match.id };
    }
    return { page: 'projects', projectId: null };
  }

  const matchedEntry = (
    Object.entries(PAGE_TO_PATH) as [Exclude<PageId, 'project-detail'>, string][]
  ).find(([, route]) => route === clean);
  if (matchedEntry) {
    return { page: matchedEntry[0], projectId: null };
  }
  return { page: 'home', projectId: null };
}

export default function App() {
  const [routeState, setRouteState] = useState<{ page: PageId; projectId: string | null }>(() =>
    parseRoute(window.location.pathname)
  );

  const [bookingContext, setBookingContext] = useState<{
    summary?: string;
    postal?: string;
    propertyType?: PropertyType;
    service?: BookingServiceType;
  }>({});

  const activeProject = routeState.projectId
    ? PROJECTS.find((p) => p.id === routeState.projectId) || PROJECTS[0]
    : PROJECTS[0];

  usePageSeo(
    routeState.page,
    routeState.page === 'project-detail' ? activeProject : undefined
  );

  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId) => {
    if (page === 'project-detail') {
      navigateTo('projects');
      return;
    }
    const targetPath = PAGE_TO_PATH[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRouteState({ page, projectId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectDetail = (project: ProjectCaseStudy) => {
    const targetPath = `/projects/${project.id}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRouteState({ page: 'project-detail', projectId: project.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookWithContext = (
    summary: string,
    postal?: string,
    propertyType?: PropertyType,
    service?: BookingServiceType
  ) => {
    setBookingContext({ summary, postal, propertyType, service });
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F5] text-[#14171A] overflow-x-clip">
      <Navbar
        currentPage={routeState.page}
        onNavigate={navigateTo}
        overlayHero={routeState.page === 'home'}
      />

      <main className={routeState.page === 'home' ? 'flex-1' : 'flex-1 pt-16 sm:pt-20'}>
        {routeState.page === 'home' && (
          <HomePage onNavigate={navigateTo} onSelectProject={openProjectDetail} />
        )}
        {routeState.page === 'solutions' && (
          <SolutionsPage
            onNavigate={navigateTo}
            onRequestServiceQuote={(service, summary) =>
              handleBookWithContext(summary, undefined, undefined, service)
            }
          />
        )}
        {routeState.page === 'solar' && (
          <SolarSolutionsPage
            onNavigate={navigateTo}
            onSelectProject={openProjectDetail}
            onRequestCustomQuote={(summary) =>
              handleBookWithContext(summary, undefined, undefined, 'Solar')
            }
          />
        )}
        {routeState.page === 'battery' && (
          <BatteryStoragePage
            onNavigate={navigateTo}
            onRequestQuote={() =>
              handleBookWithContext(
                'Battery storage and backup power inquiry',
                undefined,
                undefined,
                'Battery'
              )
            }
          />
        )}
        {routeState.page === 'hvac' && (
          <HvacSystemsPage
            onNavigate={navigateTo}
            onRequestCustomQuote={(summary) =>
              handleBookWithContext(summary, undefined, undefined, 'HVAC')
            }
          />
        )}
        {routeState.page === 'ev' && (
          <EvChargingPage
            onNavigate={navigateTo}
            onRequestCustomQuote={(summary) =>
              handleBookWithContext(summary, undefined, undefined, 'EV Charging')
            }
          />
        )}
        {routeState.page === 'projects' && (
          <ProjectsPage onSelectProject={openProjectDetail} />
        )}
        {routeState.page === 'project-detail' && (
          <ProjectDetailPage
            project={activeProject}
            onBack={() => navigateTo('projects')}
            onBookSimilar={(summary) =>
              handleBookWithContext(
                summary,
                undefined,
                activeProject.propertyType === 'Commercial' ? 'commercial' : 'residential',
                'Complete Energy Solution'
              )
            }
          />
        )}
        {routeState.page === 'about' && <AboutUsPage onNavigate={navigateTo} />}
        {routeState.page === 'assessment' && (
          <EnergyAssessmentPage onBookWithContext={handleBookWithContext} />
        )}
        {routeState.page === 'maintenance' && <MaintenancePlansPage />}
        {routeState.page === 'contact' && (
          <ContactBookingPage
            prefillSummary={bookingContext.summary}
            prefillPostal={bookingContext.postal}
            prefillPropertyType={bookingContext.propertyType}
            prefillService={bookingContext.service}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} onBookWithContext={handleBookWithContext} />
    </div>
  );
}
