import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppRoute } from '../types';
import Button from '../components/Button';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(AppRoute.BUILDER);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal-gold/10 text-royal-gold mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your credentials to access your royal dashboard.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-gold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                required
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-royal-gold outline-none transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
               <button type="button" className="text-xs text-gray-500 hover:text-royal-gold">Forgot Password?</button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Log In <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
          Don't have an account? <Link to={AppRoute.SIGNUP} className="text-royal-gold hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;