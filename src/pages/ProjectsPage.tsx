import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/energyData';
import { ProjectCaseStudy, ProjectCategory } from '../types/energy';
import { ArchImage } from '../components/ui/ArchImage';
import { PageContainer } from '../components/layout/PageContainer';

interface ProjectsPageProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

type FilterOption = 'All' | ProjectCategory;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<FilterOption>('All');

  const filters: FilterOption[] = ['All', 'Residential', 'Commercial', 'Solar', 'Battery', 'HVAC'];

  const visibleProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
              Customer Results
            </div>
            <h1
              className="font-display font-bold text-[#14171A] tracking-tight leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
            >
              Real homes and businesses already cutting power bills.
            </h1>
            <p className="text-sm sm:text-base text-[#525860]">
              Filter by home, business, or service to see what we installed and how much each client saves.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="grid grid-cols-3 sm:inline-flex sm:flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2E0D8] w-full lg:w-fit">
            {filters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap text-center cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0B3B3C] text-white'
                    : 'text-[#3A3F45] hover:text-[#14171A] hover:bg-[#F5F4EF]'
                }`}
              >
                {cat === 'Residential' ? 'Homes' : cat === 'Commercial' ? 'Businesses' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              className="group bg-white rounded-2xl border border-[#E2E0D8] overflow-hidden text-left hover:border-[#0B3B3C] transition-colors flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ArchImage
                  src={project.image}
                  alt={project.title}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="text-xs text-[#525860]">
                    {project.propertyType === 'Residential' ? 'Home' : 'Business'} ·{' '}
                    {project.location}
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#14171A] group-hover:text-[#0B3B3C]">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#525860] line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#ECEAE4]">
                  <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs">
                    <div className="min-w-0">
                      <div className="text-[#6E757D]">System Size</div>
                      <div className="font-mono-num font-bold text-[#14171A] mt-0.5 truncate">
                        {project.systemCapacity}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#6E757D]">Yearly Power</div>
                      <div className="font-mono-num font-bold text-[#14171A] mt-0.5 truncate">
                        {project.annualProduction}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#6E757D]">Yearly Savings</div>
                      <div className="font-mono-num font-bold text-[#0B3B3C] mt-0.5 truncate">
                        {project.annualSavings}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#14171A] pt-2">
                    <span>See How They Save</span>
                    <ArrowUpRight className="w-4 h-4 text-[#1D6FE8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};
