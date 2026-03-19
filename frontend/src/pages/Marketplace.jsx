import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Marketplace({ view, setView }) {
  const [activeTab, setActiveTab] = useState('all');
  const [loads, setLoads] = useState([]);
  const [form, setForm] = useState({ origin: '', destination: '', weight: '', pallets: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoad, setSelectedLoad] = useState(null);

  const currentUser = localStorage.getItem("userName") || "Guest";

  const getLoadImage = (weight) => {
    const numWeight = Number(weight);
    if (numWeight > 20000) return "/Images/truck3.avif";
    if (numWeight > 5000) return "/Images/truck3.avif";
    return "/Images/truck3.jpg";
  };

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
      alert("Error posting load.");
    }
    setLoading(false);
  };

  const handleBookLoad = async (loadId) => {
    try {
      const bookedBy = localStorage.getItem("userName") || "Guest User";
      const response = await axios.put(`http://localhost:5000/api/loads/book/${loadId}`, {
        bookedBy: bookedBy
      });

      if (response.status === 200) {
        alert("Load Booked Successfully! 🎉");
        fetchData(); 
        setSelectedLoad(null); 
      }
    } catch (err) {
      alert("Booking failed.");
    }
  };

  const baseDisplayedLoads = activeTab === 'all'
    ? loads.filter(l => l.status !== 'booked')
    : activeTab === 'mine'
    ? loads.filter(l => l.postedBy === currentUser)
    : loads.filter(l => l.bookedBy === currentUser);

  const filteredLoads = baseDisplayedLoads.filter(l =>
    l.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (view) {
      case 'privacy':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white max-w-4xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none">
                  Privacy <span className="text-red-600">Protocols</span>
                </h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Data Governance & Security Framework</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl shadow-lg"><span className="text-2xl">🛡️</span></div>
            </div>

            {/* POLICY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { 
                  icon: "📊", 
                  title: "01. Operational Intelligence", 
                  desc: "Collection of corporate identities, tax IDs, and freight specs required to synchronize the marketplace." 
                },
                { 
                  icon: "🛰️", 
                  title: "02. Real-Time Telemetry", 
                  desc: "Processing of location data exclusively during active engagement to provide accurate logistics lead times." 
                },
                { 
                  icon: "🔐", 
                  title: "03. Infrastructure Security", 
                  desc: "Hosted on encrypted MongoDB Atlas clusters with end-to-end SSL/TLS encryption for all data in transit." 
                },
                { 
                  icon: "🚫", 
                  title: "04. Zero-Monetization", 
                  desc: "Strict non-disclosure policy. We never sell your shipment history or pricing strategies to data brokers." 
                }
              ].map((policy, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-red-200 transition-colors">
                  <div className="text-2xl mb-3">{policy.icon}</div>
                  <h3 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-wider">{policy.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{policy.desc}</p>
                </div>
              ))}
            </div>

            {/* FULL WIDTH POLICY 05 */}
            <div className="space-y-8 text-slate-600">
              <section className="bg-slate-900 p-8 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:scale-110 transition-transform">🗑️</div>
                <div className="relative z-10">
                  <h3 className="text-sm font-black text-white uppercase italic mb-3 flex items-center gap-2">
                    05. Data Sovereignty & Erasure
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-xl">
                    Full "Right to be Forgotten" privileges. Upon request, all associated load histories and profile metadata are purged from our production clusters within 72 hours.
                  </p>
                  <button 
                    onClick={() => setView('marketplace')} 
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-95 text-[10px]"
                  >
                    Acknowledge & Return to Board
                  </button>
                </div>
              </section>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white max-w-4xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none">
                  Terms of <span className="text-red-600">Service</span>
                </h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Legal Operating Agreement </p>
              </div>
              <div className="bg-red-600 p-4 rounded-2xl shadow-lg shadow-red-200 text-white font-black italic text-xl">TS</div>
            </div>

            {/* TERMS ACCORDION/LIST */}
            <div className="space-y-4 mb-10">
              {[
                { title: "01. Acceptance of Risk", desc: "By posting or booking, you acknowledge that Truck Board Pro is a facilitator, not a carrier or broker. You assume all operational risks." },
                { title: "02. Verification Integrity", desc: "Users must provide valid GST/Business documentation. Providing fraudulent credentials results in an immediate permanent ban." },
                { title: "03. Real-Time Accuracy", desc: "Load posters are legally obligated to mark loads as 'Booked' immediately upon securing a carrier to maintain board integrity." },
                { title: "04. Payment Responsibility", desc: "All financial transactions and freight payments occur outside this platform. We are not liable for non-payment or collection issues." },
                { title: "05. Rate Transparency", desc: "Posted rates are considered binding offers. Bait-and-switch pricing is strictly prohibited and monitored by our audit team." },
                { title: "06. Cargo Liability", desc: "Insurance coverage and cargo liability remain the sole responsibility of the carrier and broker per standard logistics law." },
                { title: "07. Zero-Spam Mandate", desc: "Duplicate posting or automated bot-posting is strictly forbidden to ensure fair visibility for all marketplace participants." },
                { title: "08. Communication Protocol", desc: "Professionalism is mandatory. Any harassment or unethical negotiation tactics will result in account suspension." },
                { title: "09. Platform Uptime", desc: "While we strive for 99.9% uptime, we are not liable for losses resulting from temporary maintenance or technical synchronization delays." },
                { title: "10. Termination Sovereignty", desc: "Truck Board Pro reserves the right to terminate any account that compromises the security or reputation of the logistics network." }
              ].map((term, idx) => (
                <div key={idx} className="group p-5 bg-slate-50 hover:bg-slate-900 rounded-2xl border border-slate-100 transition-all duration-300">
                  <h3 className="text-[11px] font-black text-slate-900 group-hover:text-red-500 uppercase italic mb-1 tracking-tight">
                    {term.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 group-hover:text-slate-300 leading-snug font-medium">
                    {term.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* AGREEMENT ACTION */}
            <div className="bg-slate-900 p-8 rounded-[3rem] text-center border-4 border-red-600/20">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-6 opacity-70">
                Continuing implies digital signature of these 10 articles.
              </p>
              <button 
                onClick={() => setView('marketplace')} 
                className="bg-red-600 text-white px-16 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl active:scale-95 text-xs"
              >
                Accept Terms & Enter Dashboard
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="bg-white/95 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl border border-white max-w-5xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
            {/* HEADER */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black uppercase italic text-slate-900 leading-none tracking-tighter">
                  Support <span className="text-red-600">Center</span>
                </h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.3em] text-[10px]">24/7 Logistics Coordination Hub</p>
              </div>
              <button 
                onClick={() => setView('marketplace')} 
                className="bg-slate-100 text-slate-900 px-6 py-3 rounded-2xl font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all active:scale-95"
              >
                ← Back to Board
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* LEFT COLUMN: DIRECT CHANNELS */}
              <div className="space-y-6">
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-7xl opacity-10 group-hover:rotate-12 transition-transform">📞</div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-red-500 mb-4">Urgent Dispatch Hotlines</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black">Primary Support</p>
                      <p className="text-xl font-black italic">+1 (800) TRK-PRO-01</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black">Carrier Relations</p>
                      <p className="text-xl font-black italic">+1 (800) LOGIST-X</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                    <span className="text-2xl">📧</span>
                    <h4 className="text-[10px] font-black uppercase mt-3 text-blue-900">Email Ops</h4>
                    <p className="text-[11px] font-bold text-blue-700 mt-1">ops@truckpro.io</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-[2rem] border border-green-100">
                    <span className="text-2xl">💬</span>
                    <h4 className="text-[10px] font-black uppercase mt-3 text-green-900">Live Chat</h4>
                    <p className="text-[11px] font-bold text-green-700 mt-1">Available Now</p>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Global Headquarters</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    1024 Logistics Way, Suite 500<br/>
                    Tech Corridor, CA 94021
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: CONTACT FORM */}
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Transmission Sent! 📡"); }}>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Request Type</label>
                    <select className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold text-xs appearance-none">
                      <option>Technical Support</option>
                      <option>Billing Inquiry</option>
                      <option>Carrier Verification</option>
                      <option>Account Dispute</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="FULL NAME" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold text-[10px] uppercase" />
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold text-[10px] uppercase" />
                  </div>
                  <textarea rows="4" placeholder="DESCRIBE THE LOGISTICS ISSUE..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold text-[10px] uppercase resize-none"></textarea>
                  
                  <button className="w-full bg-[#E11D48] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 text-xs">
                    Dispatch Message 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <div className="sticky top-28 bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden">
                <div className="bg-slate-900 p-6 text-center">
                  <h2 className="text-white text-lg font-black uppercase italic tracking-widest">Post Freight</h2>
                </div>
                <form onSubmit={handlePost} className="p-6 space-y-3">
                  <input type="text" placeholder="Origin (City)" className="w-full p-3 bg-white/50 rounded-xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold text-sm" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} required />
                  <input type="text" placeholder="Destination (City)" className="w-full p-3 bg-white/50 rounded-xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold text-sm" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="KG" className="w-full p-3 bg-white/50 rounded-xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold text-sm" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} required />
                    <input type="number" placeholder="Pallets" className="w-full p-3 bg-white/50 rounded-xl border-2 border-transparent focus:border-red-600 outline-none transition-all font-bold text-sm" value={form.pallets} onChange={e => setForm({ ...form, pallets: e.target.value })} required />
                  </div>
                  <input type="number" placeholder="Price $" className="w-full p-3 bg-white/50 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all font-black text-lg text-green-600" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                  <button disabled={loading} className="w-full bg-[#E11D48] text-white py-4 rounded-xl font-black uppercase text-xs hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    {loading ? 'Broadcasting...' : 'Post Load'}
                  </button>
                </form>
              </div>
            </aside>

            <section className="lg:col-span-9">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="bg-yellow-100/80 backdrop-blur-md p-1 rounded-xl shadow-lg flex border border-white/50">
                  <button onClick={() => setActiveTab('all')} className={`px-6 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-[#E11D48] text-white shadow-md' : 'text-slate-500'}`}>Live Loads</button>
                  <button onClick={() => setActiveTab('mine')} className={`px-6 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'mine' ? 'bg-[#E11D48] text-white shadow-md' : 'text-slate-500'}`}>My Posts</button>
                  <button onClick={() => setActiveTab('bookings')} className={`px-6 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-[#E11D48] text-white shadow-md' : 'text-slate-500'}`}>My Bookings</button>
                </div>
                <div className="relative w-full md:w-64 group">
                  <input type="text" placeholder="Search city..." className="w-full p-3 pl-10 bg-white/80 backdrop-blur-md rounded-xl border border-white outline-none focus:ring-4 ring-red-500/10 font-bold text-sm transition-all shadow-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <span className="absolute left-4 top-3 text-xs opacity-40">🔍</span>
                </div>
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredLoads.length > 0 ? filteredLoads.map((l) => (
                  <motion.div 
                    key={l._id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/90 backdrop-blur-lg rounded-[2.5rem] p-6 border border-white shadow-xl relative overflow-hidden flex flex-col h-full"
                  >
                    {/* FIXED IMAGE CONTAINER BLOCK */}
                    <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 bg-slate-100 border border-slate-100">
                      <img 
                        src={getLoadImage(l.weight)} 
                        alt="freight" 
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/400x225?text=Truck'; 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>

                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase italic ${l.status === 'booked' ? 'bg-green-100 text-green-600' : 'bg-yellow-400 text-slate-900'}`}>
                          {l.status === 'booked' ? 'Booked' : 'Available'}
                        </span>
                        <div className="text-2xl font-black text-slate-900 tracking-tighter">${l.price}</div>
                      </div>

                      <h3 className="text-lg font-black text-slate-800 uppercase italic leading-tight mb-2">
                        {l.origin} <span className="text-red-500">→</span> {l.destination}
                      </h3>
                      
                      <div className="flex gap-3 py-3 border-y border-slate-100 mb-4 text-slate-500 font-bold text-[9px] uppercase tracking-widest">
                        {l.weight} KG • {l.pallets} PLT
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-[9px] font-black text-slate-400 uppercase">Broker: {l.postedBy}</span>
                        {l.status !== 'booked' && (
                          <button 
                            onClick={() => setSelectedLoad(l)} 
                            className="bg-slate-900 text-white text-[9px] font-black uppercase px-5 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-md active:scale-95"
                          >
                            Details
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-12 text-center bg-white/30 rounded-[2rem] border-2 border-dashed border-white/50 italic font-black text-slate-400 text-xs uppercase tracking-widest">No matching loads found</div>
                )}
              </motion.div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-slate-900 selection:bg-red-500 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0" style={{ backgroundImage: `url('/Images/truck4.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}>
        <div className="absolute inset-0 bg-[#FFFBEB]/70 backdrop-blur-[4px]"></div>
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
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBookLoad(selectedLoad._id)} 
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl mb-4"
              >
                Confirm Booking
              </motion.button>
              <button onClick={() => setSelectedLoad(null)} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-bold uppercase text-[10px] hover:bg-slate-200 transition-all">Go Back</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}