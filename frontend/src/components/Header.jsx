// frontend/src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            ADHD Energy Tracker
          </Link>
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`hover:text-purple-200 ${location.pathname === '/' ? 'text-purple-200 font-bold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/log" 
              className={`hover:text-purple-200 ${location.pathname === '/log' ? 'text-purple-200 font-bold' : ''}`}
            >
              New Log
            </Link>
            <button 
              onClick={logout}
              className="px-4 py-1 bg-purple-800 rounded hover:bg-purple-900"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;