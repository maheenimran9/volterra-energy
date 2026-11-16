import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectCaseStudy } from '../types/energy';
import { PageContainer } from '../components/layout/PageContainer';
import { ArchImage } from '../components/ui/ArchImage';

interface ProjectDetailPageProps {
  project: ProjectCaseStudy;
  onBack: () => void;
  onBookSimilar: (summary: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onBookSimilar,
}) => {
  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-14">
        <div className="space-y-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B3C] hover:text-[#1D6FE8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-semibold text-[#0B3B3C] tracking-wide">
                {project.propertyType === 'Residential' ? 'Home' : 'Business'} ·{' '}
                {project.location}
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)' }}
              >
                {project.title}
              </h1>
              <p className="text-base text-[#525860] max-w-2xl leading-relaxed">
                {project.summary}
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={() =>
                  onBookSimilar(`Similar to ${project.title} (${project.installedSystem})`)
                }
                className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
              >
                <span>Get a Quote Like This</span>
                <span className="w-8 h-8 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Architectural Visual */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-[#E2E0D8]">
          <ArchImage
            src={project.image}
            alt={project.title}
            lazy={false}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4-Column Key Performance Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-[#E2E0D8] py-8">
          <div>
            <div className="text-xs text-[#525860]">System Size</div>
            <div className="font-mono-num text-2xl font-bold text-[#14171A] mt-1">
              {project.systemCapacity}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#525860]">Project Cost</div>
            <div className="font-mono-num text-2xl font-bold text-[#14171A] mt-1">
              {project.illustrativeCost}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#525860]">Yearly Power Made</div>
            <div className="font-mono-num text-2xl font-bold text-[#14171A] mt-1">
              {project.annualProduction}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#525860]">Yearly Bill Savings</div>
            <div className="font-mono-num text-2xl font-bold text-[#0B3B3C] mt-1">
              {project.annualSavings}
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-[#14171A]">
                The Goal &amp; Challenge
              </h2>
              <p className="text-base text-[#525860] leading-relaxed">{project.challenge}</p>
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-[#14171A]">
                What Volterra Installed
              </h2>
              <p className="text-base text-[#525860] leading-relaxed">
                {project.engineeringSolution}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E0D8] p-7 space-y-5 h-fit">
            <h3 className="font-display text-lg font-bold text-[#14171A]">
              System Overview
            </h3>
            <div className="divide-y divide-[#ECEAE4]">
              {project.specs.map((s) => (
                <div key={s.label} className="py-3.5 flex items-start justify-between gap-4 text-sm">
                  <span className="text-[#525860]">{s.label}</span>
                  <span className="font-semibold text-right text-[#14171A]">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-start gap-2 text-xs text-[#1B4332]">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Installed: {project.installedSystem}</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
