import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Marketplace({ view, setView }) {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState('all');
  const [loads, setLoads] = useState([]);
  const [form, setForm] = useState({ origin: '', destination: '', weight: '', pallets: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoad, setSelectedLoad] = useState(null);

  const currentUser = localStorage.getItem("userName") || "Guest";

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/loads/all");
      setLoads(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (view === 'marketplace') fetchData();
  }, [view]);

  // --- POST LOAD ---
  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/loads/add", { ...form, postedBy: currentUser });
      setForm({ origin: '', destination: '', weight: '', pallets: '', price: '' });
      fetchData();
      setView('marketplace');
      alert("Load Posted Successfully! 🚛");
    } catch (err) {
      alert("Error posting load. Please try again.");
    }
    setLoading(false);
  };

  // --- BOOKING LOGIC ---
  const handleBookLoad = async (loadId) => {
    try {
      const bookedBy = localStorage.getItem("userName") || "Guest User";
      
      // Backend route updated to handle booking
      const response = await axios.put(`http://localhost:5000/api/loads/book/${loadId}`, {
        bookedBy: bookedBy
      });

      if (response.status === 200) {
        alert("Load Booked Successfully! 🎉");
        fetchData(); 
        setSelectedLoad(null); 
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Booking failed. Please check if the backend route /api/loads/book/:id is ready.");
    }
  };

  // --- FILTER LOGIC ---
  // Only show loads that are NOT booked (status !== 'booked')
  const baseDisplayedLoads = activeTab === 'all'
    ? loads.filter(l => l.status !== 'booked')
    : loads.filter(l => l.postedBy === currentUser);

  const filteredLoads = baseDisplayedLoads.filter(l =>
    l.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (view) {
      case 'privacy':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white max-w-4xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none">
                  Privacy <span className="text-red-600">Policy</span>
                </h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Security Protocols & Data Governance</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-2xl"><span className="text-2xl">🛡️</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="text-blue-600 mb-3 text-xl">📁</div>
                <h3 className="text-xs font-black text-slate-900 uppercase mb-2">Data Collection</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We collect operational intelligence: Business identities, GST verification, and freight specifications required for logistics synchronization.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="text-green-600 mb-3 text-xl">🔒</div>
                <h3 className="text-xs font-black text-slate-900 uppercase mb-2">Military-Grade Security</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Infrastructure is hosted on encrypted MongoDB Atlas clusters with end-to-end SSL/TLS encryption for all data in transit.
                </p>
              </div>
            </div>

            <div className="space-y-8 text-slate-600">
              <section className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200"></div>
                <h3 className="text-sm font-black text-slate-900 uppercase mb-3">01. Third-Party Transparency</h3>
                <p className="text-sm leading-relaxed">
                  Truck Board Pro follows a strict non-disclosure policy. We do not monetize your shipment history or sell data to marketing conglomerates. Information is only visible to verified marketplace participants.
                </p>
              </section>
              <section className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200"></div>
                <h3 className="text-sm font-black text-slate-900 uppercase mb-3">02. Cookie & Session Management</h3>
                <p className="text-sm leading-relaxed">
                  We utilize secure session tokens to maintain your login state. These are encrypted client-side and do not track your activity outside the Truck Board Pro ecosystem.
                </p>
              </section>
              <section className="bg-slate-900 p-8 rounded-[2.5rem] mt-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">⚖️</div>
                  <h3 className="text-sm font-black text-white uppercase italic">Your Data Sovereignty</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Under global data protection standards, you maintain the right to audit, export, or permanently purge your account data from our primary clusters and backups.
                </p>
                <button onClick={() => setView('marketplace')} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95">Acknowledge & Back</button>
              </section>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white max-w-4xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
            <div className="flex justify-between items-start mb-10">
              <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none">Terms of <span className="text-red-600">Service</span></h2>
              <div className="bg-slate-100 p-3 rounded-2xl"><span className="text-2xl">⚖️</span></div>
            </div>
            <div className="space-y-8 text-slate-600">
              <div className="p-6 bg-slate-50 rounded-[2rem] border-l-4 border-red-600">
                <p className="font-bold text-slate-800 italic leading-relaxed">
                  By accessing the Truck Board Pro ecosystem, you enter into a legally binding agreement. Ensure you meet our compliance standards before posting freight.
                </p>
              </div>
              <div className="grid gap-8">
                <div className="group transition-all">
                  <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] italic">01</span>
                    User Eligibility & Verification
                  </h3>
                  <p className="pl-11 text-sm leading-relaxed">Access is strictly limited to verified logistics professionals. Users must provide valid GST/Business documentation upon request.</p>
                </div>
                <div className="group transition-all">
                  <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] italic">02</span>
                    Load Integrity & Data Accuracy
                  </h3>
                  <p className="pl-11 text-sm leading-relaxed">All posted freight must include precise weight, dimensions, and commodity types. Purposeful misrepresentation is strictly prohibited.</p>
                </div>
                <div className="group transition-all">
                  <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] italic">03</span>
                    Financial Settlements
                  </h3>
                  <p className="pl-11 text-sm leading-relaxed">Truck Board Pro operates as a neutral marketplace. Freight payments must be settled directly between the shipper and carrier.</p>
                </div>
              </div>
              <div className="mt-12 bg-slate-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-white font-black uppercase text-sm italic">Accept terms to continue</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Your IP and Consent will be logged</p>
                </div>
                <button onClick={() => setView('marketplace')} className="bg-red-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-white hover:text-red-600 transition-all shadow-xl active:scale-95">Agree & Access Board</button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white max-w-3xl mx-auto relative overflow-hidden text-center">
            <div className="inline-block bg-red-50 text-red-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Direct Assistance</div>
            <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none mb-4">Support <span className="text-red-600">Center</span></h2>
            <p className="text-slate-400 font-bold mb-10 uppercase tracking-widest text-[10px]">Connecting Brokers & Carriers 24/7</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100"><p className="text-xs font-black text-slate-400 uppercase mb-1">Hotline</p><p className="font-black text-slate-800 text-lg">+91 98664 78554</p></div>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100"><p className="text-xs font-black text-slate-400 uppercase mb-1">Email Queries</p><p className="font-black text-slate-800 text-lg lowercase">support@truckpro.com</p></div>
            </div>
            <button onClick={() => setView('marketplace')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">Return to Dashboard</button>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center"><h2 className="text-white text-xl font-black uppercase italic tracking-widest">Post Freight</h2></div>
                <form onSubmit={handlePost} className="p-8 space-y-4">
                  <input type="text" placeholder="Origin (City)" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} required />
                  <input type="text" placeholder="Destination (City)" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="KG" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} required />
                    <input type="number" placeholder="Pallets" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold" value={form.pallets} onChange={e => setForm({ ...form, pallets: e.target.value })} required />
                  </div>
                  <input type="number" placeholder="Price $" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-green-500 outline-none transition-all font-black text-xl text-green-600" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                  <button disabled={loading} className="w-full bg-[#E11D48] text-white py-5 rounded-2xl font-black uppercase hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    {loading ? 'Broadcasting...' : 'Post Load'}
                  </button>
                </form>
              </div>
            </aside>

            <section className="lg:col-span-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="bg-yellow-100 backdrop-blur-md p-1.5 rounded-2xl shadow-lg flex border border-white/50">
                  <button onClick={() => setActiveTab('all')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-[#E11D48] text-white shadow-md' : 'text-slate-500'}`}>Live Loads</button>
                  <button onClick={() => setActiveTab('mine')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'mine' ? 'bg-[#E11D48] text-white shadow-md' : 'text-slate-500'}`}>My Posts</button>
                </div>
                <div className="relative w-full md:w-80 group">
                  <input type="text" placeholder="Search city..." className="w-full p-4 pl-12 bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white outline-none focus:ring-4 ring-red-500/10 font-bold transition-all shadow-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <span className="absolute left-5 top-4 opacity-40 group-focus-within:opacity-100 transition-opacity">🔍</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredLoads.length > 0 ? filteredLoads.map((l, index) => (
                  <motion.div key={l._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }} className="bg-white/90 backdrop-blur-lg rounded-[2.5rem] p-10 border border-white shadow-xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <span className="bg-yellow-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic">Available</span>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter">${l.price}</div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic leading-tight mb-4 relative z-10">{l.origin} <span className="text-red-500">→</span> {l.destination}</h3>
                    <div className="flex gap-4 py-4 border-y border-slate-100 mb-6 text-slate-500 font-bold text-[11px] uppercase tracking-widest relative z-10">{l.weight} KG • {l.pallets} Pallets</div>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Broker: {l.postedBy}</span>
                      <button onClick={() => setSelectedLoad(l)} className="bg-slate-900 text-white text-[10px] font-black uppercase px-8 py-3.5 rounded-2xl hover:bg-red-600 transition-all shadow-lg active:scale-95">View Details</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-white/30 rounded-[4rem] border-2 border-dashed border-white/50 italic font-black text-slate-400 tracking-widest uppercase">No matching loads found</div>
                )}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-slate-900 selection:bg-red-500 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}>
        <div className="absolute inset-0 bg-[#FFFBEB]/90 backdrop-blur-[4px]"></div>
      </div>
      <main className="relative z-10 flex-grow max-w-[1500px] mx-auto p-8 w-full mt-5">
        {renderContent()}
      </main>
      <AnimatePresence>
        {selectedLoad && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLoad(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full relative z-10 shadow-3xl border border-white">
              <h2 className="text-4xl font-black uppercase italic mb-8 leading-none">Shipment <span className="text-red-600">Details</span></h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-end border-b pb-4"><span className="text-[10px] font-black text-slate-400 uppercase">Route</span><span className="font-black text-xl">{selectedLoad.origin} ➔ {selectedLoad.destination}</span></div>
                <div className="flex justify-between items-end border-b pb-4"><span className="text-[10px] font-black text-slate-400 uppercase">Rate</span><span className="font-black text-3xl text-green-600">${selectedLoad.price}</span></div>
                <div className="flex justify-between items-end border-b pb-4"><span className="text-[10px] font-black text-slate-400 uppercase">Manifest</span><span className="font-bold text-slate-800">{selectedLoad.weight} KG / {selectedLoad.pallets} PLT</span></div>
              </div>
              {/* UPDATED BUTTON: "Confirm Booking" logic triggered here */}
              <button 
                onClick={() => handleBookLoad(selectedLoad._id)} 
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl active:scale-95 mb-4"
              >
                Confirm Booking
              </button>
              <button onClick={() => setSelectedLoad(null)} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-bold uppercase text-[10px] hover:bg-slate-200 transition-all">Go Back</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}