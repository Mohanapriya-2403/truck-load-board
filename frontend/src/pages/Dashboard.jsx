import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Marketplace() {
  const [loads, setLoads] = useState([]);
  const [formData, setFormData] = useState({
    origin: '', destination: '', weight: '', pallets: '', price: ''
  });

  const fetchLoads = async () => {
    try {
      // Must include /all
      const res = await axios.get("http://localhost:5000/api/loads/all");
      setLoads(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchLoads(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Must include /add
      await axios.post("http://localhost:5000/api/loads/add", formData);
      alert("🚛 Load Posted!");
      setFormData({ origin: '', destination: '', weight: '', pallets: '', price: '' });
      fetchLoads();
    } catch (err) { alert("404 Error: Check Backend URL"); }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      {/* ... (Use the UI code provided in previous response) ... */}
    </div>
  );
}