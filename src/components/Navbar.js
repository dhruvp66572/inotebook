import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  let history = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('token');
    history('/login');
  }
  
  let location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="flex-shrink-0 text-white font-bold text-xl" to="/">
              DP notebook
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                    location.pathname === "/" 
                      ? "bg-blue-800 text-white" 
                      : "text-gray-100 hover:bg-blue-800 hover:text-white"
                  }`} 
                  to="/"
                >
                  Home
                </Link>
                <Link 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                    location.pathname === "/about" 
                      ? "bg-blue-800 text-white" 
                      : "text-gray-100 hover:bg-blue-800 hover:text-white"
                  }`} 
                  to="/about"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {!localStorage.getItem('token') ? (
              <div className="flex items-center ml-4 md:ml-6">
                <Link 
                  className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-700 hover:bg-gray-200 transition-colors duration-200"
                  to="/login"
                >
                  Login
                </Link>
                <Link 
                  className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button 
                onClick={handlelogout} 
                className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/" 
                ? "bg-blue-800 text-white" 
                : "text-gray-100 hover:bg-blue-800 hover:text-white"
            }`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/about" 
                ? "bg-blue-800 text-white" 
                : "text-gray-100 hover:bg-blue-800 hover:text-white"
            }`} 
            to="/about"
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-blue-800">
          {!localStorage.getItem('token') ? (
            <div className="flex flex-col px-5 space-y-2">
              <Link 
                className="px-4 py-2 text-center rounded-md text-sm font-medium bg-white text-blue-700 hover:bg-gray-200 transition-colors duration-200"
                to="/login"
              >
                Login
              </Link>
              <Link 
                className="px-4 py-2 text-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="px-5">
              <button 
                onClick={handlelogout} 
                className="w-full px-4 py-2 text-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
