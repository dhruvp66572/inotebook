import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  let history = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('token');
    history('/login');
  }
  
  let location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg" : "bg-gradient-to-r from-blue-700 to-blue-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="flex items-center space-x-2 text-white font-bold text-xl" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-extrabold tracking-tight">DP Inotebook</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === "/" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-100 hover:bg-blue-700/70 hover:text-white hover:scale-105"
                  }`} 
                  to="/"
                >
                  Home
                </Link>
                <Link 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === "/about" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-100 hover:bg-blue-700/70 hover:text-white hover:scale-105"
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
                  className="ml-3 px-5 py-2 rounded-md text-sm font-medium bg-white text-blue-700 hover:bg-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                  to="/login"
                >
                  Login
                </Link>
                <Link 
                  className="ml-3 px-5 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button 
                onClick={handlelogout} 
                className="ml-3 px-5 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 hover:text-white focus:outline-none transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
      <div className={`${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'} transform transition-all duration-300 ease-in-out md:hidden absolute w-full bg-blue-800 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              location.pathname === "/" 
                ? "bg-blue-600 text-white" 
                : "text-gray-200 hover:bg-blue-700 hover:text-white"
            }`} 
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              location.pathname === "/about" 
                ? "bg-blue-600 text-white" 
                : "text-gray-200 hover:bg-blue-700 hover:text-white"
            }`} 
            to="/about"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-blue-700">
          {!localStorage.getItem('token') ? (
            <div className="flex flex-col px-5 space-y-3 pb-3">
              <Link 
                className="px-4 py-2 text-center rounded-md text-sm font-medium bg-white text-blue-700 hover:bg-gray-100 transition-all duration-200 shadow-sm"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                className="px-4 py-2 text-center rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm"
                to="/signup"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="px-5 pb-3">
              <button 
                onClick={() => {
                  handlelogout();
                  setIsOpen(false);
                }} 
                className="w-full px-4 py-2 text-center rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
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
