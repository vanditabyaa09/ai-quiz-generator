import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiHome, FiUser } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Smart Notes Summarizer</span>
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center">
              <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
                <FiHome className="mr-1" />
                Dashboard
              </Link>
              <div className="flex items-center ml-4 px-3 py-2 text-sm font-medium text-gray-700">
                <FiUser className="mr-1" />
                {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600"
              >
                <FiLogOut className="mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link 
                to="/signup" 
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;