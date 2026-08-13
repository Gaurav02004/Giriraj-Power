import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  FileText,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Download,
} from 'lucide-react';

export const QuotePage: React.FC = () => {
  const { submitQuote } = useShop();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState<'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure/EPC' | 'Contractor Supply'>('Commercial');
  const [productInterest, setProductInterest] = useState('');
  const [quantity, setQuantity] = useState('');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [fileName, setFileName] = useState('');
  const [hasBOMFile, setHasBOMFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitQuote({
        fullName,
        companyName: companyName || 'Contractor Firm',
        email,
        phone,
        projectType,
        productInterest: productInterest || 'Complete BOQ / Bill of Materials',
        quantity: quantity || 'Full Project Package',
        targetDeliveryDate: targetDeliveryDate || 'Immediate / 15 Days',
        deliveryLocation,
        additionalRequirements,
        hasBOMFile,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setHasBOMFile(true);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Project Quotation & BOM Engine' }]} />
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              B2B Project Quotation & BOQ Estimation
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Upload your Bill of Materials (Excel / PDF / DWG schedule) or outline your electrical requirements for wholesale contractor slab pricing within 2 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isSubmitted ? (
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center shadow-xl space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              Quotation Request Received!
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
              Thank you. Our Giriraj Power MEP estimation team will review your bill of materials and contact you shortly with an itemized pricing sheet and CPRI test certificate roadmap.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-left max-w-lg mx-auto text-xs text-neutral-700 space-y-2">
              <p><strong className="text-black">Registered Contact:</strong> {fullName} ({phone})</p>
              <p><strong className="text-black">Project Type:</strong> {projectType}</p>
              <p><strong className="text-black">Site Location:</strong> {deliveryLocation || 'India Site'}</p>
              {fileName && <p><strong className="text-black">Attached BOM:</strong> {fileName}</p>}
              <p className="text-emerald-800 font-bold pt-1">
                Contractor Helpline: +91 9007168561 / 9874569712
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setCompanyName('');
                  setEmail('');
                  setPhone('');
                  setProductInterest('');
                  setQuantity('');
                  setDeliveryLocation('');
                  setFileName('');
                  setHasBOMFile(false);
                }}
                className="bg-black hover:bg-emerald-600 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors shadow-xs"
              >
                Submit Another Project Quote
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Deshmukh"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Company / MEP Contractor Firm
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Horizon Infra MEP Solutions"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Mobile Phone <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98220 54321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="anand@horizoninfra.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Project Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-neutral-800 font-medium"
                    >
                      <option value="Commercial">Commercial Complex / IT Park / Tower</option>
                      <option value="Residential">Residential Building / Villa Scheme</option>
                      <option value="Industrial">Industrial Manufacturing / Plant Automation</option>
                      <option value="Infrastructure/EPC">Infrastructure / Substation / EPC</option>
                      <option value="Contractor Supply">General Contractor Recurring Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Target Project Delivery Date <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="date"
                        required
                        value={targetDeliveryDate}
                        onChange={(e) => setTargetDeliveryDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="p-5 bg-yellow-50/60 border-2 border-dashed border-yellow-300 hover:border-yellow-400 rounded-2xl transition-colors text-center">
                  <input
                    type="file"
                    id="page-bom-upload"
                    onChange={handleFileUpload}
                    accept=".pdf,.xls,.xlsx,.csv,.doc,.docx"
                    className="hidden"
                  />
                  <label htmlFor="page-bom-upload" className="cursor-pointer block">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto mb-2 shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-black">
                      {fileName ? `Uploaded: ${fileName}` : 'Upload Bill of Materials (BOM) / BOQ Sheet'}
                    </div>
                    <p className="text-xs text-neutral-600 mt-0.5 font-medium">
                      Supports Excel (.xlsx, .xls), PDF, or CSV up to 25MB
                    </p>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Material Categories of Interest <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Polycab Wires, Schneider MCBs, Cable Trays"
                      value={productInterest}
                      onChange={(e) => setProductInterest(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Estimated Project Scope / Quantities
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5000 meters cable, 120 DBs, Full Floor Package"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Project Site Location & PIN Code <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sector 62, Noida (201309) / Electronic City, Bengaluru"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Special Brand Preferences, Make List, or Technical Constraints
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify consultant approved make list (e.g. Polycab/KEI for wires, ABB/Schneider for ACB), CPRI test report requirements, or staggered delivery dates..."
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isSubmitting ? 'Calculating Estimation...' : 'Submit Quotation for Project Pricing'}</span>
                </button>
              </form>
            </div>

            {/* Right Information Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-black text-white rounded-3xl p-6 border border-neutral-800 space-y-4 shadow-md">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Giriraj Power Quote SLA</span>
                </h3>
                <div className="space-y-3 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block font-bold">2-Hour Turnaround</strong>
                      <span>Quick itemized rates for standard wires, MCBs & lighting.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block font-bold">100% Genuine Test Certs</strong>
                      <span>All quotes include manufacturer batch test reports.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block font-bold">Staggered Site Deliveries</strong>
                      <span>Lock prices today; pull material to site as per slab construction phases.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-3 text-xs text-neutral-700 shadow-xs">
                <h4 className="font-bold text-black">Prefer Phone Consultation?</h4>
                <p className="text-neutral-600 leading-relaxed">
                  Kindly speak directly with our senior MEP electrical engineers to discuss SLDs and approved make lists.
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+919007168561"
                    className="block text-center font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-2.5 rounded-xl transition-colors"
                  >
                    Call Helpline: +91 90071 68561
                  </a>
                  <a
                    href="tel:+919874569712"
                    className="block text-center font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 py-2.5 rounded-xl transition-colors"
                  >
                    Alternative Desk: +91 98745 69712
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
