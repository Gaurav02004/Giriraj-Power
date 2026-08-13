import React from 'react';

export const ValuePropStrip: React.FC = () => {
  return (
    <div className="w-full bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Free Delivery */}
          <div className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl border border-emerald-100 bg-[#fbfdfb] hover:border-emerald-300 transition-all shadow-2xs group">
            {/* Green Delivery Truck Icon */}
            <div className="shrink-0">
              <svg className="w-14 h-14 text-[#15803d]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20H38V44H12V20Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M38 28H48L54 36V44H38V28Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="22" cy="46" r="5" stroke="currentColor" strokeWidth="2.5" fill="white"/>
                <circle cx="46" cy="46" r="5" stroke="currentColor" strokeWidth="2.5" fill="white"/>
                <path d="M4 28H8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2 34H8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M4 40H8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-black text-[#15803d] tracking-tight">
                Free Delivery
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                on orders above ₹1000
              </p>
            </div>
          </div>

          {/* Card 2: Upto 2% Cashback */}
          <div className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl border border-emerald-100 bg-[#fbfdfb] hover:border-emerald-300 transition-all shadow-2xs group">
            {/* Green % Circular Dashed Badge Icon */}
            <div className="shrink-0">
              <svg className="w-14 h-14 text-[#15803d]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3"/>
                <path d="M24 24L40 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="26" cy="27" r="2.5" fill="currentColor"/>
                <circle cx="38" cy="37" r="2.5" fill="currentColor"/>
                <path d="M46 16L48 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M50 22L53 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-black text-[#15803d] tracking-tight">
                Upto 2% Cashback
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                on every order
              </p>
            </div>
          </div>

          {/* Card 3: Pay on Delivery */}
          <div className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl border border-emerald-100 bg-[#fbfdfb] hover:border-emerald-300 transition-all shadow-2xs group">
            {/* Green Note with Pin Icon */}
            <div className="shrink-0">
              <svg className="w-14 h-14 text-[#15803d]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="18" width="40" height="26" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                <circle cx="28" cy="31" r="6" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M28 27V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 29H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                {/* Location pin at bottom right */}
                <path d="M50 36C50 32.6863 47.3137 30 44 30C40.6863 30 38 32.6863 38 36C38 41 44 48 44 48C44 48 50 41 50 36Z" fill="#15803d" stroke="#15803d" strokeWidth="1.5"/>
                <circle cx="44" cy="36" r="2" fill="white"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-black text-[#15803d] tracking-tight">
                Pay on Delivery
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                Pay after you receive & verify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
