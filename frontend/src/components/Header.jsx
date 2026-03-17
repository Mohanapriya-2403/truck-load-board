import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ setView }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  
  const handleLogoClick = () => {
    navigate('/marketplace');
    if (setView) setView('marketplace');
  };

  return (
    <header className="bg-slate-900 text-white py-4 px-8 flex justify-between items-center shadow-lg border-b border-slate-800">
      
      {/* Logo Section */}
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={handleLogoClick}
      >
        <span className="bg-red-600 p-2 rounded-lg text-xl group-hover:scale-110 transition-transform">
          🚛
        </span>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">
          Truck Board <span className="text-red-600">Pro</span>
        </h1>
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700">
          {/* User Avatar Circle */}
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-black text-white shadow-inner">
            {userName.charAt(0).toUpperCase()}
          </div>
          
          {/* Username */}
          <span className="text-sm font-bold tracking-tight">{userName}</span>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="ml-2 text-[10px] bg-slate-700 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-all uppercase font-black tracking-widest"
          >
            Logout
          </button>
        </div>
      </div>

    </header>
  );
}