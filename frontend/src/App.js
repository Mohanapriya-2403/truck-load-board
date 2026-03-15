import React, { useState } from 'react'; // ✅ useState import pannanum
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Signup from './pages/signup'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 

// Layout wrapper to handle conditional Header/Footer
function Layout({ children, view, setView }) {
  const location = useLocation();
  // Login matrum Signup pages-la Header/Footer vendaam-na intha condition help pannum
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header setView={setView} />} 
      
      <main className="flex-grow">
        {children}
      </main>

      {!isAuthPage && <Footer setView={setView} />}
    </div>
  );
}

function App() {
  // ✅ 1. State-ah inga define pannanum, appo thaan Header matrum Footer-ku anuppa mudiyum
  const [view, setView] = useState('marketplace');

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout view={view} setView={setView}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ✅ 2. Marketplace-ku props-ah pass pannanum */}
          <Route path="/marketplace" element={<Marketplace view={view} setView={setView} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;