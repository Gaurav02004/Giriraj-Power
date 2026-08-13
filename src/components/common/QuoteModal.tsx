import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, FileText, CheckCircle2, Upload, Calendar, MapPin, Building, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, selectedQuoteProduct, submitQuote } = useShop();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState<'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure/EPC' | 'Contractor Supply'>('Commercial');
  const [productInterest, setProductInterest] = useState(
    selectedQuoteProduct ? `${selectedQuoteProduct.name} (${selectedQuoteProduct.sku})` : ''
  );
  const [quantity, setQuantity] = useState('');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [hasBOMFile, setHasBOMFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update initial product interest when selectedQuoteProduct changes
  React.useEffect(() => {
    if (selectedQuoteProduct) {
      setProductInterest(`${selectedQuoteProduct.name} (${selectedQuoteProduct.sku})`);
      setQuantity(`Min. ${selectedQuoteProduct.minOrderQty || 10} ${selectedQuoteProduct.unit}`);
    } else {
      setProductInterest('');
      setQuantity('');
    }
  }, [selectedQuoteProduct]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitQuote({
        fullName,
        companyName: companyName || 'Individual Contractor',
        email,
        phone,
        projectType,
        productInterest: productInterest || 'Multiple Electrical Items / BOM List',
        quantity: quantity || 'Contractor Project Estimate',
        targetDeliveryDate: targetDeliveryDate || 'Within 15 Days',
        deliveryLocation: deliveryLocation || 'India Site',
        additionalRequirements,
        hasBOMFile,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProductInterest('');
    setQuantity('');
    setTargetDeliveryDate('');
    setDeliveryLocation('');
    setAdditionalRequirements('');
    setHasBOMFile(false);
    setFileName('');
    closeQuoteModal();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setHasBOMFile(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        id="quote-modal-container"
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-200"
      >
        {/* Header */}
        <div className="bg-black px-6 py-5 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Request a Project Quotation</h3>
              <p className="text-xs text-neutral-300">Contractor & B2B Bulk Pricing with Custom GST Invoicing</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-black">Quotation Request Received!</h4>
            <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
              Thank you. Our Giriraj Power estimation engineers will contact you shortly with an itemized project pricing sheet, make lists, and delivery schedule.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mt-6 text-left w-full text-xs text-neutral-700 space-y-1.5">
              <p><strong className="text-black">Contact:</strong> {fullName} ({phone})</p>
              <p><strong className="text-black">Project Type:</strong> {projectType}</p>
              {deliveryLocation && <p><strong className="text-black">Site Location:</strong> {deliveryLocation}</p>}
              <p><strong className="text-black">Contractor Helpline:</strong> +91 9007168561 / 9874569712</p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="mt-6 bg-black hover:bg-emerald-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            {selectedQuoteProduct && (
              <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-xl flex items-center gap-3 text-xs text-yellow-950">
                <span className="font-bold">Selected Product:</span>
                <span className="truncate">{selectedQuoteProduct.name}</span>
                <span className="ml-auto font-mono text-[11px] bg-yellow-200 px-2 py-0.5 rounded text-black font-bold">
                  SKU: {selectedQuoteProduct.sku}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-neutral-50/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Company / Firm Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Apex Electrical Contractors"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-neutral-50/60"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98230 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-neutral-50/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-neutral-50/60"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Project Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60"
                >
                  <option value="Residential">Residential Building / Villa Project</option>
                  <option value="Commercial">Commercial Complex / IT Park / Hotel</option>
                  <option value="Industrial">Industrial Factory / Machine Floor</option>
                  <option value="Infrastructure/EPC">Infrastructure / Substation / EPC</option>
                  <option value="Contractor Supply">General Contractor Recurring Supply</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Target Delivery Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={targetDeliveryDate}
                    onChange={(e) => setTargetDeliveryDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Product Details / Materials Needed <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2.5mm FRLS Copper wire, 16A MCBs, Cable trays"
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Estimated Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 Coils, 200 Units, Full BOQ"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Project Site Delivery Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 62, Noida / Whitefield, Bengaluru"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60"
                />
              </div>
            </div>

            {/* Bill of Materials (BOM) file attachment */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Attach Bill of Materials (BOM) / BOQ Sheet (Optional)
              </label>
              <div className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 rounded-xl p-3 text-center transition-colors bg-neutral-50/60">
                <input
                  type="file"
                  id="bom-upload-input"
                  onChange={handleFileUpload}
                  accept=".pdf,.xls,.xlsx,.csv,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="bom-upload-input"
                  className="cursor-pointer flex items-center justify-center gap-2 text-xs text-neutral-700 hover:text-emerald-700"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{fileName ? `Attached: ${fileName}` : 'Upload Excel (.xlsx), PDF, or CSV specification'}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Additional Technical Specs / Test Report Requirements
              </label>
              <textarea
                rows={2}
                placeholder="Specify preferred brands (Polycab, Schneider, Havells), test certificates needed (CPRI/BIS), or staggered unloading requirements..."
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-neutral-50/60 resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">100% Genuine BIS Certified Guarantee</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black hover:bg-emerald-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isSubmitting ? 'Generating Estimate...' : 'Submit Quotation Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
