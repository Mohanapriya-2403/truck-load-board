import React, { useState } from 'react';
import axios from 'axios';

export default function LoadForm({ refreshLoads }) {
  const [formData, setFormData] = useState({ origin: '', destination: '', weight: '', pallets: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/loads', formData);
    setFormData({ origin: '', destination: '', weight: '', pallets: '', price: '' });
    refreshLoads();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border-4 border-truckRed shadow-lg">
      <h2 className="text-xl font-black text-truckRed mb-4 uppercase">Post New LTL Load</h2>
      <input className="w-full p-2 mb-2 border-2 rounded" placeholder="Origin" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
      <input className="w-full p-2 mb-2 border-2 rounded" placeholder="Destination" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input type="number" className="p-2 border-2 rounded" placeholder="Weight (kg)" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
        <input type="number" className="p-2 border-2 rounded" placeholder="Pallets" value={formData.pallets} onChange={e => setFormData({...formData, pallets: e.target.value})} />
      </div>
      <input type="number" className="w-full p-2 mb-4 border-2 rounded" placeholder="Offer Price ($)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
      <button className="w-full bg-truckRed text-white font-bold py-2 rounded uppercase hover:bg-red-800 transition">List Load</button>
    </form>
  );
}