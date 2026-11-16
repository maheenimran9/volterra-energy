import React, { useState } from 'react';
import { Check, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { MAINTENANCE_PLANS } from '../../data/energyData';
import { MaintenancePlan } from '../../types/energy';

interface MaintenanceSelectorProps {
  compact?: boolean;
  onExploreFull?: () => void;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  compact = false,
  onExploreFull,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<MaintenancePlan['id']>('complete');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postalCode: '',
    systemSize: '10 kW Solar + Battery',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = MAINTENANCE_PLANS.find((p) => p.id === selectedPlanId) || MAINTENANCE_PLANS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.postalCode.trim()) {
      setError('Please enter your property postcode or ZIP.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-10">
      {/* 3 Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MAINTENANCE_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isFeatured = plan.id === 'complete';
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all border ${
                isSelected
                  ? 'bg-[#0B3B3C] text-white border-[#0B3B3C] shadow-lg'
                  : 'bg-white text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? 'text-[#93C5FD]' : 'text-[#0B3B3C]'
                    }`}
                  >
                    {plan.audience}
                  </span>
                  {isFeatured && (
                    <span
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-white/80' : 'text-[#5B6168]'
                      }`}
                    >
                      Most Selected
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-mono-num text-3xl font-bold">${plan.annualPrice}</span>
                  <span className={`text-xs ${isSelected ? 'text-[#A1A7AE]' : 'text-[#525860]'}`}>
                    / year (annual care)
                  </span>
                </div>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    isSelected ? 'text-[#C8CDD3]' : 'text-[#525860]'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-2.5 text-sm border-t pt-5 border-current/10">
                  {[
                    ['Panel Checkup', plan.features.solarInspection],
                    ['System Watch', plan.features.performanceMonitoring],
                    ['Wiring Safety', plan.features.electricalInspection],
                    ['Battery Health', plan.features.batteryAssessment],
                    ['Heating & AC', plan.features.hvacInspection],
                    ['Priority Support', plan.features.prioritySupport],
                    ['Yearly Visits', plan.features.annualVisits],
                  ].map(([label, val]) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          val === 'Not included'
                            ? 'opacity-25'
                            : isSelected
                            ? 'text-[#93C5FD]'
                            : 'text-[#0B3B3C]'
                        }`}
                      />
                      <span
                        className={
                          val === 'Not included'
                            ? isSelected
                              ? 'text-[#6C737B] line-through'
                              : 'text-[#9CA3AF] line-through'
                            : ''
                        }
                      >
                        <strong className="font-medium">{label}:</strong> {val}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  setSubmitted(false);
                  if (compact && onExploreFull) {
                    onExploreFull();
                  }
                }}
                className={`mt-8 w-full py-3 px-5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#14171A] hover:bg-[#F2F1EC]'
                    : 'bg-[#F2F1EC] text-[#14171A] hover:bg-[#14171A] hover:text-white'
                }`}
              >
                {compact
                  ? `Compare ${plan.name}`
                  : isSelected
                  ? `Picked: ${plan.name}`
                  : `Pick ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Full Comparison Matrix + Request Form (shown on Maintenance Page) */}
      {!compact && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Matrix Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E0D8] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#ECECE7] flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-bold text-[#14171A]">
                  What&apos;s Included in Each Plan
                </h3>
                <p className="text-xs text-[#525860] mt-1">
                  Compare exactly what our local team checks during each yearly visit
                </p>
              </div>
              <span className="sm:hidden text-[11px] font-semibold text-[#1D6FE8]">
                Swipe table →
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#ECECE7] bg-[#F8F8F5] text-xs font-semibold text-[#3A3F45]">
                    <th className="py-3.5 px-4 sm:px-5">Service Check</th>
                    <th className="py-3.5 px-3 sm:px-4">Essential</th>
                    <th className="py-3.5 px-3 sm:px-4">Complete</th>
                    <th className="py-3.5 px-3 sm:px-4">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECE7] text-xs sm:text-sm">
                  {[
                    ['Solar Panel Check', 'solarInspection'],
                    ['24/7 Output Tracking', 'performanceMonitoring'],
                    ['Wiring & Breaker Check', 'electricalInspection'],
                    ['Battery Health Check', 'batteryAssessment'],
                    ['Heating & AC Tune-Up', 'hvacInspection'],
                    ['Customer Support', 'prioritySupport'],
                    ['Yearly Visits', 'annualVisits'],
                  ].map(([label, key]) => (
                    <tr key={key} className="hover:bg-[#FAFAF7]">
                      <td className="py-3.5 px-5 font-medium text-[#14171A]">{label}</td>
                      {MAINTENANCE_PLANS.map((p) => (
                        <td
                          key={p.id}
                          className={`py-3.5 px-4 ${
                            selectedPlanId === p.id
                              ? 'bg-[#EEF3F2] font-semibold text-[#0B3B3C]'
                              : 'text-[#525860]'
                          }`}
                        >
                          {p.features[key as keyof MaintenancePlan['features']]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan Enrollment Request Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E0D8] p-6 sm:p-8">
            {submitted ? (
              <div className="py-6 space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#0B3B3C]" />
                <h3 className="font-display text-xl font-bold text-[#14171A]">
                  We&apos;ve Got Your Request!
                </h3>
                <p className="text-sm text-[#495057] leading-relaxed">
                  Thanks! Your request for <strong>{selectedPlan.name}</strong> ($
                  {selectedPlan.annualPrice}/year) at postcode <strong>{formData.postalCode}</strong>{' '}
                  is in. A local engineer will check your equipment details and reach out first, and no
                  payment has been taken today.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold text-[#0B3B3C] underline cursor-pointer"
                >
                  Change Plan or Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#ECECE7]">
                  <div>
                    <div className="text-xs text-[#0B3B3C] font-semibold">Your Chosen Plan</div>
                    <h3 className="font-display text-lg font-bold text-[#14171A]">
                      {selectedPlan.name} ·{' '}
                      <span className="font-mono-num">${selectedPlan.annualPrice}/yr</span>
                    </h3>
                  </div>
                  <Shield className="w-5 h-5 text-[#0B3B3C]" />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Jordan Ellis"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#D8DAD2] text-sm focus:outline-none focus:border-[#0B3B3C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="jordan@email.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D8DAD2] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                      ZIP / Postcode
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
                      }
                      placeholder="78701 / SW1A"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D8DAD2] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                    What System Do You Have?
                  </label>
                  <input
                    type="text"
                    value={formData.systemSize}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, systemSize: e.target.value }))
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-[#D8DAD2] text-sm focus:outline-none focus:border-[#0B3B3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
                >
                  <span>Book {selectedPlan.name} Checkup</span>
                  <ArrowRight className="w-4 h-4 text-[#93C5FD]" />
                </button>
                <p className="text-[11px] text-[#525860] text-center">
                  No payment today. Our local team confirms system compatibility first.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
