import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppRoute } from '../types';
import Button from '../components/Button';
import { Mail, ArrowRight, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate(AppRoute.BUILDER);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
       {/* Background decoration */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal-gold/10 text-royal-gold mb-4">
            <UserIcon className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-center text-white">Join the Elite</h2>
           <p className="text-gray-400 text-sm mt-2">
            Start building your digital empire today.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-gold mb-2">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                required
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-royal-gold outline-none transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-gold mb-2">Email Address</label>
             <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                required
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-royal-gold outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
             </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-gold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white focus:border-royal-gold outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
               <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-gold mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-royal-gold outline-none transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
          Already a member? <Link to={AppRoute.LOGIN} className="text-royal-gold hover:underline font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;