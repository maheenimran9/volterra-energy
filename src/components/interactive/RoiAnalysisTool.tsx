import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Info } from 'lucide-react';
import { calculateRoiProjection } from '../../utils/calculations';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const RoiAnalysisTool: React.FC = () => {
  const [installationCost, setInstallationCost] = useState(32500);
  const [annualSavingsYear1, setAnnualSavingsYear1] = useState(3450);
  const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState(250);
  const [annualElectricityBillCurrent, setAnnualElectricityBillCurrent] = useState(3900);
  const [utilityInflationPct, setUtilityInflationPct] = useState(3.8);
  const [applyIncentive, setApplyIncentive] = useState(false);
  const [incentivePct, setIncentivePct] = useState(20);

  const roi = calculateRoiProjection({
    installationCost,
    annualSavingsYear1,
    annualMaintenanceCost,
    annualElectricityBillCurrent,
    utilityInflationPct,
    incentivePct,
    applyIncentive,
  });

  const milestoneBars = [
    {
      horizon: '10-Year Cumulative',
      withoutSystem: roi.timeline[9].currentUtilityCost,
      withSystem: roi.timeline[9].postInstallCost,
    },
    {
      horizon: '20-Year Cumulative',
      withoutSystem: roi.twentyYearUtilitySpend,
      withSystem: roi.twentyYearPostInstallSpend,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Controls + Key KPI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E0D8] p-6 sm:p-8 space-y-5">
          <h3 className="font-display text-lg font-bold text-[#14171A]">
            Your Estimated Costs &amp; Bill
          </h3>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#3A3F45]">System Cost</span>
              <span className="font-mono-num font-bold text-[#14171A]">
                ${installationCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={12000}
              max={95000}
              step={500}
              value={installationCost}
              onChange={(e) => setInstallationCost(Number(e.target.value))}
              className="w-full accent-[#0B3B3C] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#3A3F45]">Current Yearly Electric Bill</span>
              <span className="font-mono-num font-bold text-[#14171A]">
                ${annualElectricityBillCurrent.toLocaleString()}/yr
              </span>
            </div>
            <input
              type="range"
              min={1500}
              max={18000}
              step={100}
              value={annualElectricityBillCurrent}
              onChange={(e) => setAnnualElectricityBillCurrent(Number(e.target.value))}
              className="w-full accent-[#0B3B3C] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#3A3F45]">Estimated Year-1 Bill Savings</span>
              <span className="font-mono-num font-bold text-[#14171A]">
                ${annualSavingsYear1.toLocaleString()}/yr
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={100}
              value={annualSavingsYear1}
              onChange={(e) => setAnnualSavingsYear1(Number(e.target.value))}
              className="w-full accent-[#0B3B3C] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                Yearly Checkup ($)
              </label>
              <input
                type="number"
                min={0}
                max={2000}
                step={50}
                value={annualMaintenanceCost}
                onChange={(e) => setAnnualMaintenanceCost(Math.max(0, Number(e.target.value) || 0))}
                className="w-full h-10 px-3 rounded-lg border border-[#E2E0D8] font-mono-num text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3A3F45] mb-1">
                Electric Price Rise (%/yr)
              </label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.2}
                value={utilityInflationPct}
                onChange={(e) =>
                  setUtilityInflationPct(Math.max(0, Math.min(12, Number(e.target.value) || 0)))
                }
                className="w-full h-10 px-3 rounded-lg border border-[#E2E0D8] font-mono-num text-sm"
              />
            </div>
          </div>

          {/* Configurable Optional Incentives */}
          <div className="p-4 rounded-xl bg-[#F9F8F5] border border-[#E2E0D8] space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#14171A]">
                  Include Tax Credit or Rebate
                </div>
                <div className="text-[11px] text-[#525860]">
                  Available rebates vary by area
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApplyIncentive((prev) => !prev)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  applyIncentive
                    ? 'bg-[#0B3B3C] text-white'
                    : 'bg-white border border-[#E2E0D8] text-[#3A3F45]'
                }`}
              >
                {applyIncentive ? 'Included' : 'Off'}
              </button>
            </div>

            {applyIncentive && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#525860]">Rebate / Tax Credit Amount</span>
                  <span className="font-mono-num font-bold text-[#14171A]">
                    {incentivePct}% (-${roi.incentiveAmount.toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={incentivePct}
                  onChange={(e) => setIncentivePct(Number(e.target.value))}
                  className="w-full accent-[#0B3B3C] cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Metrics + Charts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0B3B3C] text-white rounded-2xl p-5">
              <div className="text-xs text-white/75">Net System Cost</div>
              <div className="font-mono-num text-xl font-bold mt-1">
                <AnimatedCounter value={roi.netInitialInvestment} prefix="$" />
              </div>
            </div>
            <div className="bg-[#0B3B3C] text-white rounded-2xl p-5">
              <div className="text-xs text-white/75">Pays Back In</div>
              <div className="font-mono-num text-xl font-bold text-[#93C5FD] mt-1">
                {roi.paybackYear !== null ? `${roi.paybackYear} yrs` : '> 20 yrs'}
              </div>
            </div>
            <div className="bg-white border border-[#E2E0D8] rounded-2xl p-5">
              <div className="text-xs text-[#525860]">10-Yr Net Savings</div>
              <div className="font-mono-num text-xl font-bold text-[#14171A] mt-1">
                <AnimatedCounter value={roi.tenYearNetSavings} prefix="$" />
              </div>
            </div>
            <div className="bg-white border border-[#E2E0D8] rounded-2xl p-5">
              <div className="text-xs text-[#525860]">20-Yr Net Savings</div>
              <div className="font-mono-num text-xl font-bold text-[#0B3B3C] mt-1">
                <AnimatedCounter value={roi.twentyYearNetSavings} prefix="$" />
              </div>
            </div>
          </div>

          {/* Line Chart: Cumulative Net Cashflow */}
          <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
            <h4 className="font-display text-base font-bold text-[#14171A] mb-1">
              20-Year Savings Timeline
            </h4>
            <p className="text-xs text-[#525860] mb-5">
              Total savings over 20 years after subtracting system cost and yearly checkups
            </p>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roi.timeline} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECECE7" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: '#525860' }}
                    interval={2}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#525860' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, '']}
                    contentStyle={{
                      backgroundColor: '#0B3B3C',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeNet"
                    name="Net Savings"
                    stroke="#1D6FE8"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Utility Spend vs Post-Install Spend */}
          <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6">
            <h4 className="font-display text-base font-bold text-[#14171A] mb-1">
              Total Electricity Cost: Utility Only vs. Solar
            </h4>
            <p className="text-xs text-[#525860] mb-5">
              What you would pay the electric company over 10 and 20 years compared to owning solar
            </p>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={milestoneBars} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECECE7" vertical={false} />
                  <XAxis
                    dataKey="horizon"
                    tick={{ fontSize: 12, fill: '#525860' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#525860' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, '']}
                    contentStyle={{
                      backgroundColor: '#0B3B3C',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar
                    dataKey="withoutSystem"
                    name="Staying on Utility (No Solar)"
                    fill="#14171A"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="withSystem"
                    name="Total Cost With Solar"
                    fill="#1D6FE8"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5 text-xs text-[#525860] pt-1">
        <Info className="w-3.5 h-3.5 text-[#0B3B3C] shrink-0 mt-0.5" />
        <p>
          These figures are estimates based on your inputs. Tax credits and rebates are off by
          default unless turned on above and depend on local program rules.
        </p>
      </div>
    </div>
  );
};
