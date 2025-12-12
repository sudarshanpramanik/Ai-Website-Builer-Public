import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X, User as UserIcon, LogOut, Code, Layout as LayoutIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AppRoute } from '../types';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold';

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-royal-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={AppRoute.HOME} className="flex-shrink-0 flex items-center gap-2 group">
            <Crown className="h-8 w-8 text-royal-gold group-hover:animate-pulse" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-white leading-none">
                MAKE YOUR WEBSITE
              </span>
              <span className="text-royal-gold text-[10px] font-sans tracking-[0.2em] font-light leading-none">
                IN 5 MINUTES
              </span>
            </div>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to={AppRoute.HOME} className={`${isActive(AppRoute.HOME)} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Home</Link>
              <Link to={AppRoute.TEMPLATES} className={`${isActive(AppRoute.TEMPLATES)} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Templates</Link>
              {isAuthenticated && (
                <>
                  <Link to={AppRoute.BUILDER} className={`${isActive(AppRoute.BUILDER)} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>AI Builder</Link>
                  <Link to={AppRoute.DASHBOARD} className={`${isActive(AppRoute.DASHBOARD)} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Dashboard</Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-royal-gold">Welcome, {user?.name}</span>
                <button onClick={logout} className="text-gray-400 hover:text-white transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={AppRoute.LOGIN} className="text-gray-300 hover:text-royal-gold text-sm font-medium">Log In</Link>
                <Link to={AppRoute.SIGNUP} className="bg-royal-gold text-black hover:bg-white px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_10px_rgba(212,175,55,0.3)]">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-royal-gold hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-royal-darkGrey border-b border-royal-gold/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to={AppRoute.HOME} className="text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to={AppRoute.TEMPLATES} className="text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Templates</Link>
            {isAuthenticated ? (
               <>
                <Link to={AppRoute.BUILDER} className="text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">AI Builder</Link>
                <Link to={AppRoute.DASHBOARD} className="text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <button onClick={logout} className="text-left w-full text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Log Out</button>
               </>
            ) : (
              <>
                <Link to={AppRoute.LOGIN} className="text-gray-300 hover:text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Log In</Link>
                <Link to={AppRoute.SIGNUP} className="text-royal-gold block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-royal-gold/20 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-royal-gold" />
            <span className="font-serif text-xl font-bold text-white">Make Your Website</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting the future of digital presence with AI-driven precision and royal aesthetics. Build your empire in 5 minutes.
          </p>
        </div>
        
        <div>
          <h3 className="text-royal-gold font-serif text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to={AppRoute.TEMPLATES} className="hover:text-royal-gold transition-colors">Templates</Link></li>
            <li><Link to={AppRoute.LOGIN} className="hover:text-royal-gold transition-colors">Login</Link></li>
            <li><Link to={AppRoute.SIGNUP} className="hover:text-royal-gold transition-colors">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-royal-gold font-serif text-lg mb-4">Contact Us</h3>
          <div className="space-y-3 text-sm text-gray-400">
             <p className="flex items-center gap-2">
               <span className="text-white font-medium">Email:</span> 
               <a href="mailto:pramaniksudarshan2007@gmail.com" className="hover:text-royal-gold transition-colors">pramaniksudarshan2007@gmail.com</a>
             </p>
             <p className="flex items-center gap-2">
               <span className="text-white font-medium">Phone:</span> 
               <span className="hover:text-royal-gold transition-colors">+91 8910290440</span>
             </p>
             <p className="text-xs text-gray-500 mt-4">
               Admin notifications enabled for user activity.
             </p>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Make Your Website in 5 Minutes. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-royal-darkGrey flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;