import { useState } from 'react';

const Navbar = () => {
  // Track which menu item is expanded ('Work', 'Services', or null)
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div 
        className="bg-[#0a0a0a] border border-white/10 rounded-[24px] p-2 flex flex-col justify-end transition-all duration-300 ease-in-out shadow-2xl backdrop-blur-md min-w-[320px]"
        onMouseLeave={() => setActiveMenu(null)}
      >
        
        {/* Expanded Content Area */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeMenu ? 'max-h-[200px] opacity-100 mb-4 mt-2 px-6' : 'max-h-0 opacity-0 m-0 p-0'
          }`}
        >
          {activeMenu === 'Work' && (
            <div className="flex flex-col gap-3 items-center">
              <a href="#work" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">Portfolio</a>
              <a href="#case-studies" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">Case Studies</a>
              <a href="#products" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">Products</a>
            </div>
          )}
          {activeMenu === 'Services' && (
            <div className="flex flex-col gap-3 items-center">
              <a href="#websites" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">Business Websites</a>
              <a href="#ecommerce" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">E-commerce Stores</a>
              <a href="#apps" className="text-white font-medium text-[13px] hover:text-gray-300 transition-colors">Web Applications</a>
            </div>
          )}
        </div>

        {/* Bottom Dock Area */}
        <div className="flex items-center gap-2">
          {/* Home Icon Button */}
          <button 
            onClick={() => setActiveMenu(null)}
            className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-[14px] transition-colors"
            aria-label="Home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-5 px-3">
            <button 
              onMouseEnter={() => setActiveMenu('Work')}
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                activeMenu === 'Work' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {activeMenu === 'Work' ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
              </svg>
            </button>

            <button 
              onMouseEnter={() => setActiveMenu('Services')}
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                activeMenu === 'Services' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {activeMenu === 'Services' ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
              </svg>
            </button>

            <a 
              href="#contact"
              onMouseEnter={() => setActiveMenu(null)}
              className="text-[13px] font-medium text-gray-400 hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
