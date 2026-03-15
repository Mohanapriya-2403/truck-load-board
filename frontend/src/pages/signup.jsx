import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    // 1. Data Structure Check: Name, Email, Password exactly match backend
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // ✅ Check: Port 5000 correct-ah? Server run aagutha?
            const res = await axios.post("http://localhost:5000/api/users/signup", formData);
            
            alert("Signup Successful! Redirecting to Login...");
            navigate('/login');
        } catch (err) {
            // ✅ Dynamic Alert: Detailed error message kaattum
            const errorMsg = err.response?.data?.message || "Signup Failed! Check if Backend is running.";
            console.error("Signup Error Details:", err.response?.data);
            alert(errorMsg); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB] font-sans">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100">
                <h2 className="text-3xl font-black italic uppercase text-center mb-8 text-red-600">Register Pro</h2>
                
                <form onSubmit={handleSignup} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold shadow-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold shadow-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold shadow-sm"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl"
                    >
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>
                
                <p className="text-center mt-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                    Already have an account? 
                    <span className="text-red-600 cursor-pointer ml-2 hover:underline font-black" onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}