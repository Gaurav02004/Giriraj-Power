import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useShop } from '../context/ShopContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  CheckCircle2,
  Truck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry Sent', 'Thank you! A regional sales officer will connect with you within 30 minutes.', 'success');
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Contact & Regional Warehouses' }]} />
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Contact & Regional Fulfillment Hubs
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Get in touch with our dedicated contractor desk, technical estimation teams, or visit our central logistics fulfillment centers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Warehouses */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-black">Direct Contractor Helplines</h3>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <Phone className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">Contractor Helpline Desk</strong>
                    <div className="mt-0.5 space-x-2">
                      <a href="tel:+919007168561" className="text-black font-bold hover:underline">+91 90071 68561</a>
                      <span>/</span>
                      <a href="tel:+919874569712" className="text-black font-bold hover:underline">+91 98745 69712</a>
                    </div>
                    <span className="text-[11px] text-neutral-600 block mt-0.5">Direct line for rates, stock confirmation & BOQ assistance (8:00 AM – 9:00 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">B2B Quotations & Tender Inquiries</strong>
                    <a href="mailto:supply@girirajpower.com" className="text-emerald-800 font-bold hover:underline">supply@girirajpower.com</a>
                    <span className="text-[11px] text-neutral-600 block mt-0.5">Kindly email project BOQ/BOM sheets for instant proforma quotation</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <Clock className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">Emergency Site Breakdown & Slab Dispatch</strong>
                    <span>Available 24/7 for registered contractors & EPC project sites with urgent cable requirements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Locations */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-black flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>Central Logistics Hubs & Pickup Points</span>
              </h3>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="p-3 border-2 border-yellow-400 bg-yellow-50/50 rounded-xl">
                  <div className="font-bold text-black text-sm flex items-center justify-between">
                    <span>Kolkata Central 60-Min Rapid Fulfillment Hub</span>
                    <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded">60-MINS ACTIVE</span>
                  </div>
                  <p className="mt-0.5 font-medium text-neutral-800">Topsia Industrial Area, Near EM Bypass & Science City, Kolkata - 700039, West Bengal</p>
                  <span className="text-[10px] text-emerald-800 font-bold mt-1 inline-block">⚡ 60-Minute Site Dispatches & Pay on Delivery Active across Kolkata</span>
                </div>

                <div className="p-3 border border-neutral-200 rounded-xl">
                  <div className="font-bold text-black text-sm">Western India Central Hub (Pune/Mumbai)</div>
                  <p className="mt-0.5">Plot 12, Industrial Logistics Corridor, Chakan Phase 2, Pune - 411057</p>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">Heavy Crane & Drum Winding Bay Active</span>
                </div>

                <div className="p-3 border border-neutral-200 rounded-xl">
                  <div className="font-bold text-black text-sm">Northern Metro Hub (Delhi NCR)</div>
                  <p className="mt-0.5">Ecotech III, Greater Noida, Gautam Buddha Nagar, UP - 201306</p>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">Express Same-Day NCR Transit Available</span>
                </div>

                <div className="p-3 border border-neutral-200 rounded-xl">
                  <div className="font-bold text-black text-sm">Southern Tech Corridor Hub (Bengaluru)</div>
                  <p className="mt-0.5">Bommasandra Industrial Area, Phase 1, Hosur Road, Bengaluru - 560099</p>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">Modular Switchgear & LED Stockyard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-black mb-1">Quick Contractor Inquiry</h3>
            <p className="text-xs text-neutral-500 mb-5">Fill out your details to receive our product catalog and regional rate sheet.</p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Inquiry Submitted!</h4>
                <p className="text-xs">Our regional sales manager will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@firm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe project location, estimated requirements, or query..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-yellow-400" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
