import React from 'react';


export default function Footer({ setView }) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* LOGO SECTION */}
        <div>
          <h2 
            className="text-lg font-black italic text-slate-900 uppercase cursor-pointer"
            onClick={() => setView('marketplace')}
          >
            Truck Board <span className="text-red-600">Pro</span>
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Efficient Logistics Management System
          </p>
        </div>
        
        {/* LINKS SECTION - Using Buttons to trigger state change */}
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <button 
            type="button"
            onClick={() => setView('privacy')} 
            className="hover:text-red-600 transition-colors uppercase font-black"
          >
            Privacy Policy
          </button>
          
          <button 
            type="button"
            onClick={() => setView('terms')} 
            className="hover:text-red-600 transition-colors uppercase font-black"
          >
            Terms of Service
          </button>
          
          <button 
            type="button"
            onClick={() => setView('contact')} 
            className="hover:text-red-600 transition-colors uppercase font-black"
          >
            Contact Support
          </button>
        </div>
        
        {/* COPYRIGHT SECTION */}
        <p className="text-slate-400 text-[10px] font-bold">
          © 2026 Truck Board Pro. Built with ❤️ for Logistics.
        </p>

      </div>
    </footer>
  );
}