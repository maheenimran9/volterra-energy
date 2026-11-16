import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ArrowUpRight, Clock } from 'lucide-react';
import { REGION_CONFIG } from '../data/energyData';
import {
  BookingServiceType,
  ContactMethod,
  PropertyType,
} from '../types/energy';
import { PageContainer } from '../components/layout/PageContainer';

interface ContactBookingPageProps {
  prefillSummary?: string;
  prefillPostal?: string;
  prefillPropertyType?: PropertyType;
  prefillService?: BookingServiceType;
}

const SERVICES: BookingServiceType[] = [
  'Solar',
  'Battery',
  'HVAC',
  'EV Charging',
  'Complete Energy Solution',
];

const CONTACT_METHODS: ContactMethod[] = ['Phone Call', 'Email', 'Video Consultation'];

export const ContactBookingPage: React.FC<ContactBookingPageProps> = ({
  prefillSummary,
  prefillPostal,
  prefillPropertyType,
  prefillService,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState(prefillPostal || '');
  const [propertyType, setPropertyType] = useState<PropertyType>(
    prefillPropertyType || 'residential'
  );
  const [service, setService] = useState<BookingServiceType>(prefillService || 'Solar');
  const [preferredContactMethod, setPreferredContactMethod] =
    useState<ContactMethod>('Phone Call');
  const [notes, setNotes] = useState(prefillSummary ? prefillSummary : '');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillPostal) setPostalCode(prefillPostal);
    if (prefillPropertyType) setPropertyType(prefillPropertyType);
    if (prefillService) setService(prefillService);
    if (prefillSummary) setNotes(prefillSummary);
  }, [prefillSummary, prefillPostal, prefillPropertyType, prefillService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.trim().length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (postalCode.trim().length < 2) {
      setError('Please enter your postcode or ZIP code.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F9F8F5] text-[#14171A] py-12 sm:py-16">
      <PageContainer className="space-y-14">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                Direct Contact · Free Q2 Property Check
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.1rem)' }}
              >
                Talk directly with a local engineer, no call centers.
              </h1>
              <p className="text-base text-[#525860]">
                Call our local team right now or drop your details for a clear, honest quote sent
                within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+15125550194"
                className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-[#E2E0D8] p-5 hover:border-[#0B3B3C] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-[#EEF3F2] text-[#0B3B3C] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-[#525860]">Call Directly (North America)</div>
                    <div className="font-mono-num font-bold text-base text-[#14171A]">
                      +1 (512) 555-0194
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#1D6FE8] shrink-0" />
              </a>

              <a
                href="mailto:engineering@volterraenergy.com"
                className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-[#E2E0D8] p-4 sm:p-5 hover:border-[#0B3B3C] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <span className="w-10 h-10 rounded-full bg-[#EEF3F2] text-[#0B3B3C] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs text-[#525860]">Email Our Local Team</div>
                    <div className="font-semibold text-sm sm:text-base text-[#14171A] break-all">
                      engineering@volterraenergy.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#1D6FE8] shrink-0" />
              </a>

              <div className="flex items-center gap-3.5 bg-white rounded-2xl border border-[#E2E0D8] p-5">
                <span className="w-10 h-10 rounded-full bg-[#EEF3F2] text-[#0B3B3C] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs text-[#525860]">Fast Reply Promise</div>
                  <div className="font-semibold text-sm text-[#14171A]">
                    Clear quote within 24 hours · Zero pushy sales calls
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B3B3C]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Our Local Offices</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {Object.entries(REGION_CONFIG).map(([code, hub]) => (
                  <div key={code} className="space-y-0.5">
                    <div className="font-bold text-[#14171A]">
                      {hub.hubCity} ({code})
                    </div>
                    <div className="text-[#525860] leading-snug">{hub.address}</div>
                    <a
                      href={`tel:${hub.phone.replace(/[^+\d]/g, '')}`}
                      className="inline-block font-mono-num text-[#1D6FE8] font-semibold hover:underline pt-0.5"
                    >
                      {hub.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Fast Single-Screen Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E0D8] p-5 sm:p-10">
            {submitted ? (
              <div className="py-10 space-y-5">
                <CheckCircle2 className="w-11 h-11 text-[#0B3B3C]" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#14171A]">
                  Thanks, {fullName}, we&apos;re on it!
                </h2>
                <p className="text-base text-[#525860] leading-relaxed max-w-lg">
                  Your request for <strong>{service}</strong> at postcode{' '}
                  <strong>{postalCode}</strong> is with our local team. A real engineer will reach
                  out via <strong>{preferredContactMethod}</strong> within one business day with your
                  savings &amp; rebate breakdown.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center h-11 px-6 rounded-full border border-[#14171A] text-sm font-semibold text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors cursor-pointer"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5 border-b border-[#ECEAE4] pb-5">
                  <div className="text-xs font-semibold text-[#1D6FE8]">
                    Q2 install &amp; rebate slots are filling fast
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#14171A]">
                    Get Your Free 24-Hour Quote
                  </h2>
                  <p className="text-sm text-[#525860]">
                    Takes 30 seconds. No upfront payment and zero obligation.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['residential', 'commercial'] as PropertyType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`h-11 rounded-xl text-xs font-semibold capitalize border transition-colors cursor-pointer ${
                            propertyType === type
                              ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                              : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      Service Needed
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value as BookingServiceType)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D4D2C8] bg-white text-sm font-medium text-[#14171A] focus:outline-none focus:border-[#0B3B3C]"
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D4D2C8] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (512) 555-0188"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D4D2C8] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D4D2C8] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#3A3F45]">
                      ZIP / Postcode *
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="78701 / SW1A"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#D4D2C8] text-sm focus:outline-none focus:border-[#0B3B3C]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#3A3F45]">
                    How Should We Reach You?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {CONTACT_METHODS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContactMethod(method)}
                        className={`h-10 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                          preferredContactMethod === method
                            ? 'bg-[#0B3B3C] text-white border-[#0B3B3C]'
                            : 'bg-[#F9F8F5] text-[#14171A] border-[#E2E0D8] hover:border-[#14171A]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#3A3F45]">
                    Tell Us About Your Property (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Roof style, monthly electric bill, or best time to call..."
                    className="w-full p-3.5 rounded-xl border border-[#D4D2C8] text-sm focus:outline-none focus:border-[#0B3B3C]"
                  />
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-[#14171A] text-white text-sm font-semibold hover:bg-[#0B3B3C] transition-colors cursor-pointer"
                  >
                    <span>Get My Free 24-Hour Quote</span>
                    <span className="w-7 h-7 rounded-full bg-[#1D6FE8] text-white flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                  <p className="text-[11px] text-[#525860] text-center">
                    Free property check · Direct local engineer · Zero obligation
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </PageContainer>
    </div>
  );
};
