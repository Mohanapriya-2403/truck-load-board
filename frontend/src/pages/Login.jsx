import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Backend API calling
      const res = await axios.post("http://localhost:5000/api/users/login", { 
        email: email.trim(), 
        password: password 
      });
      
      // 2. Storage Updates
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name || "Mohana Priya"); // Fallback name
      
      alert("Login Successful!");
      navigate('/marketplace');
    } catch (err) {
      // 3. Better Error Handling to see exactly what's wrong
      const errorMsg = err.response?.data?.message || "Login Failed. Check Connection.";
      console.error("Login Details:", err.response?.data);
      alert(errorMsg); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB] font-sans text-slate-900 px-4">
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* LEFT SIDE: DESIGN & BRANDING */}
        <div className="w-full md:w-1/2 p-12 bg-slate-900 flex flex-col items-center justify-center text-center text-white">
          <div className="bg-red-600 p-6 rounded-3xl shadow-2xl text-6xl mb-8 animate-bounce">🚛</div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Truck Board <span className="text-red-500">Pro</span>
          </h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Smart Logistics Gateway</p>
          <div className="mt-12 space-y-2 opacity-60">
             <p className="text-sm">✓ Fast Load Matching</p>
             <p className="text-sm">✓ Secure Carrier Network</p>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Welcome Back</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Enter credentials to proceed</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter Your Email Address" 
                className="w-full p-4 mt-2 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold shadow-sm transition-all" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Password</label>
              <input 
                type="password" 
                placeholder="Enter Your Password" 
                className="w-full p-4 mt-2 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-red-600 outline-none font-bold shadow-sm transition-all" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
            >
              {loading ? 'Authenticating...' : 'Login Now'}
            </button>

            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mt-8">
              Don't have an account? <span className="text-red-600 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign Up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}