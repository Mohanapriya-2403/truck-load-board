import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Note: Header and Footer are rendered in App.js to avoid double display.
export default function Marketplace({ view, setView }) {
  const [activeTab, setActiveTab] = useState('all');
  const [loads, setLoads] = useState([]);
  const [form, setForm] = useState({ origin: '', destination: '', weight: '', pallets: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Added Search state

  const currentUser = localStorage.getItem("userName") || "Guest";

  // Fetch all loads from the backend
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/loads/all");
      setLoads(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // Trigger fetch only when on the main board
  useEffect(() => {
    if (view === 'marketplace') fetchData();
  }, [view]);

  // Handle posting a new load
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

  // Filter logic: Tabs + Search Bar
  const baseDisplayedLoads = activeTab === 'all' 
    ? loads 
    : loads.filter(l => l.postedBy === currentUser);

  const filteredLoads = baseDisplayedLoads.filter(l => 
    l.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Content rendering based on View state
  const renderContent = () => {
    switch (view) {
      case 'privacy':
  return (
    <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-black uppercase italic mb-8 text-slate-900">
        Privacy <span className="text-red-600">Policy</span>
      </h2>
      
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p className="font-bold text-slate-800">At Truck Board Pro, we are committed to protecting your logistics data through the following practices:</p>
        
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="text-red-600 font-black">•</span>
            <span><strong className="text-slate-900">Purpose-Driven Collection:</strong> We only collect data strictly necessary for logistics operations, such as freight details and contact information.</span>
          </li>
          
          <li className="flex gap-3">
            <span className="text-red-600 font-black">•</span>
            <span><strong className="text-slate-900">Advanced Encryption:</strong> All shipment details and personal identifiers are encrypted and handled securely to prevent unauthorized access.</span>
          </li>
          
          <li className="flex gap-3">
            <span className="text-red-600 font-black">•</span>
            <span><strong className="text-slate-900">Operational Integrity:</strong> Your data is used exclusively to facilitate freight matching and improve platform efficiency.</span>
          </li>
          
          <li className="flex gap-3">
            <span className="text-red-600 font-black">•</span>
            <span><strong className="text-slate-900">Data Ownership:</strong> You retain full control over your posts and can manage your freight history directly from your dashboard.</span>
          </li>
        </ul>
      </div>

      <button 
        onClick={() => setView('marketplace')} 
        className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all active:scale-95"
      >
        Back to Board
      </button>
    </div>
  );
     case 'terms':
  return (
    <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white max-w-4xl mx-auto overflow-y-auto max-h-[80vh]">
      <h2 className="text-3xl font-black uppercase italic mb-8 text-slate-900">
        Terms of <span className="text-red-600">Service</span>
      </h2>
      
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p className="font-bold text-slate-800 italic border-b border-slate-100 pb-4">
          By using Truck Board Pro, you agree to abide by the following operational guidelines:
        </p>
        
        <ul className="space-y-5">
          <li className="flex gap-4">
             <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-1">1</span>
             <span><strong className="text-slate-900">Data Accuracy:</strong> Users are strictly required to provide precise weight, pallet counts, and dimensions. Inaccurate data may lead to vehicle overload and safety hazards.</span>
          </li>
          
          <li className="flex gap-4">
             <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-1">2</span>
             <span><strong className="text-slate-900">Liability Waiver:</strong> Truck Board Pro is a marketplace facilitator. We do not own vehicles or freight; therefore, we are not liable for any cargo damage, delays, or losses during transit.</span>
          </li>
          
          <li className="flex gap-4">
             <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-1">3</span>
             <span><strong className="text-slate-900">Professional Conduct:</strong> Any form of fraudulent posting, price manipulation, or spamming will result in immediate and permanent account suspension.</span>
          </li>
          
          <li className="flex gap-4">
             <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-1">4</span>
             <span><strong className="text-slate-900">Payment Agreements:</strong> Payment terms are negotiated directly between the shipper and the carrier. Truck Board Pro is not responsible for payment defaults or disputes.</span>
          </li>

          <li className="flex gap-4">
             <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-1">5</span>
             <span><strong className="text-slate-900">Verification:</strong> Users must be authorized logistics professionals. We reserve the right to verify documentation or business credentials at any time.</span>
          </li>
        </ul>
      </div>

      <button 
        onClick={() => setView('marketplace')} 
        className="mt-10 bg-red-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all active:scale-95"
      >
        I Agree & Back to Board
      </button>
    </div>
  );
      case 'contact':
        return (
          <div className="bg-white/80 backdrop-blur-lg p-12 rounded-[3rem] shadow-2xl border border-white text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black uppercase italic mb-4">Support Center</h2>
            <p className="text-xl font-bold text-slate-800 mb-2">24/7 Logistics Assistance</p>
            <p className="text-slate-500">Email: support@truckboardpro.com</p>
            <p className="text-slate-500">Contact: +91 98664 78554</p>
            <button onClick={() => setView('marketplace')} className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase">
              Close
            </button>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Form */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                  <h2 className="text-white text-xl font-black uppercase italic tracking-widest">Post Freight</h2>
                </div>
                <form onSubmit={handlePost} className="p-8 space-y-4">
                  <input type="text" placeholder="Origin (City)" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} required />
                  <input type="text" placeholder="Destination (City)" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Weight (KG)" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} required />
                    <input type="number" placeholder="Pallets" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none transition-all" value={form.pallets} onChange={e => setForm({ ...form, pallets: e.target.value })} required />
                  </div>
                  <input type="number" placeholder="Price $" className="w-full p-4 bg-white/50 rounded-2xl border-2 border-transparent focus:border-green-500 outline-none transition-all" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                  <button disabled={loading} className="w-full bg-[#E11D48] text-white py-5 rounded-2xl font-black hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    {loading ? 'Broadcasting...' : 'Post Load'}
                  </button>
                </form>
              </div>
            </aside>

            {/* Main Feed */}
            <section className="lg:col-span-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="bg-yellow-100 backdrop-blur-md p-1.5 rounded-2xl shadow-lg flex border border-white/50">
                  <button onClick={() => setActiveTab('all')} className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-[#E11D48] text-white' : 'text-slate-500 hover:text-slate-800'}`}>Live Loads</button>
                  <button onClick={() => setActiveTab('mine')} className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'mine' ? 'bg-[#E11D48] text-white' : 'text-slate-500 hover:text-slate-800'}`}>My Posts</button>
                </div>

                {/* Added Search Bar UI */}
                <div className="relative w-full md:w-64">
                   <input 
                    type="text" 
                    placeholder="Search city..." 
                    className="w-full p-3.5 pl-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white outline-none focus:ring-2 ring-red-500/20 font-bold text-xs"
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <span className="absolute left-4 top-3.5 opacity-40">🔍</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredLoads.length > 0 ? filteredLoads.map(l => (
                  <div key={l._id} className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] p-8 border-2 border-white shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-yellow-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase italic">Available</span>
                      <div className="text-3xl font-black text-slate-900">${l.price}</div>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">{l.origin} ➔ {l.destination}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{l.weight} KG • {l.pallets} Pallets</p>
                    <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Posted By: {l.postedBy}</span>
                       <button className="text-[10px] font-black uppercase text-red-600 hover:underline">View Details</button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-white/80 rounded-[3rem] border-2 border-dashed border-white/50">
                    <p className="font-black uppercase text-slate-400 italic tracking-widest">No matching loads found</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-slate-900">
      {/* Background Image Wrapper */}
      <div className="fixed inset-0" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        zIndex: -1 
      }}>
        <div className="absolute inset-0 bg-[#FFFBEB]/85 backdrop-blur-[3px]"></div>
      </div>

      <main className="relative z-10 flex-grow max-w-[1400px] mx-auto p-8 w-full mt-5">
        {renderContent()}
      </main>
    </div>
  );
}