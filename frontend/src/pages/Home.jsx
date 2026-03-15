import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoadCard from '../components/LoadCard';

export default function Home() {
  const [loads, setLoads] = useState([]);
  const [formData, setFormData] = useState({ origin: '', destination: '', weight: '', pallets: '', price: '' });

  const fetchLoads = async () => {
    const res = await axios.get('http://localhost:5000/api/loads');
    setLoads(res.data);
  };

  useEffect(() => { fetchLoads(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/loads', formData);
    setFormData({ origin: '', destination: '', weight: '', pallets: '', price: '' });
    fetchLoads();
  };

  return (
    <div className="min-h-screen bg-yellowMain">
      <Navbar />
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Post Load Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border-4 border-redMain shadow-2xl h-fit">
          <h2 className="text-2xl font-black text-redMain mb-4 uppercase">Post LTL Freight</h2>
          <input className="w-full mb-3 p-2 border-2 border-gray-300 rounded" placeholder="Origin" 
            onChange={e => setFormData({...formData, origin: e.target.value})} value={formData.origin} />
          <input className="w-full mb-3 p-2 border-2 border-gray-300 rounded" placeholder="Destination" 
            onChange={e => setFormData({...formData, destination: e.target.value})} value={formData.destination} />
          <input type="number" className="w-full mb-3 p-2 border-2 border-gray-300 rounded" placeholder="Weight (kg)" 
            onChange={e => setFormData({...formData, weight: e.target.value})} value={formData.weight} />
          <input type="number" className="w-full mb-3 p-2 border-2 border-gray-300 rounded" placeholder="Pallets" 
            onChange={e => setFormData({...formData, pallets: e.target.value})} value={formData.pallets} />
          <input type="number" className="w-full mb-4 p-2 border-2 border-gray-300 rounded" placeholder="Price ($)" 
            onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price} />
          <button className="w-full bg-redMain text-white py-3 font-bold rounded-lg uppercase">Post to Board</button>
        </form>

        {/* Load List */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-redMain mb-6 uppercase italic">Live Loads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loads.map(l => <LoadCard key={l._id} load={l} />)}
          </div>
        </div>
      </div>
    </div>
  );
}