import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Layout } from 'lucide-react';
import { AppRoute } from '../types';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-blue/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-green/5 rounded-full blur-[128px]" />
        {/* Abstract Texture */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block py-1 px-3 rounded-full bg-royal-gold/10 border border-royal-gold/30 text-royal-gold text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            The Royal Standard of AI Generation
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-serif text-white mb-6 leading-tight drop-shadow-lg">
            Make Your Website <br />
            <span className="gold-text-gradient drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">In 5 Minutes</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 font-light leading-relaxed">
            Generate fully functional, production-ready websites and mobile app prototypes instantly. 
            Experience <span className="text-royal-gold">luxury speed</span> and royal quality with a single prompt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={AppRoute.BUILDER}>
              <Button className="w-full sm:w-auto px-10 py-4 text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]">
                Start Building Now <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to={AppRoute.TEMPLATES}>
              <Button variant="outline" className="w-full sm:w-auto px-10 py-4 text-lg">
                Explore Templates
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 w-full max-w-5xl rounded-t-xl border-t border-x border-royal-gold/30 shadow-[0_-20px_80px_-20px_rgba(212,175,55,0.15)] overflow-hidden bg-black/60 backdrop-blur-md"
        >
          <div className="bg-gray-900/80 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 flex-1 bg-gray-800 h-6 rounded-md w-1/3 opacity-50" />
          </div>
          <div className="aspect-[16/7] relative bg-slate-900 flex items-center justify-center">
             <div className="text-center z-10">
               <div className="animate-spin mb-4 mx-auto w-12 h-12 border-t-2 border-royal-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
               <p className="text-royal-gold/80 font-mono text-sm tracking-widest">INITIALIZING ROYAL ENGINE...</p>
             </div>
             {/* Overlay Image */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
             <img 
               src="https://picsum.photos/1200/600?grayscale" 
               alt="Dashboard Preview" 
               className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
             />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-black/80 py-24 border-t border-royal-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Code className="h-8 w-8" />, 
                title: "Production Ready Code", 
                desc: "Get clean, documented HTML, Tailwind CSS, and React code instantly." 
              },
              { 
                icon: <Smartphone className="h-8 w-8" />, 
                title: "App Prototypes", 
                desc: "High-fidelity mobile app layouts ready for implementation." 
              },
              { 
                icon: <Layout className="h-8 w-8" />, 
                title: "Live Previews", 
                desc: "Interact with your generation in real-time as you build." 
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-royal-gold/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
              >
                <div className="h-14 w-14 rounded-lg bg-royal-gold/10 flex items-center justify-center text-royal-gold mb-6 group-hover:bg-royal-gold group-hover:text-black transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-serif">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;