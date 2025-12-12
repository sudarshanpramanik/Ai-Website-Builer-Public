import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap, Laptop, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Template, AppRoute } from '../types';

// Helper to generate simple placeholder code for templates so they work immediately in the builder
const createPlaceholderCode = (title: string, color: string = 'text-yellow-500') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { font-family: sans-serif; }</style>
</head>
<body class="bg-gray-900 text-white min-h-screen flex flex-col">
    <nav class="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 class="text-2xl font-bold ${color}">${title}</h1>
        <div class="space-x-4">
            <a href="#" class="hover:text-gray-300">Home</a>
            <a href="#" class="hover:text-gray-300">About</a>
            <a href="#" class="hover:text-gray-300">Contact</a>
        </div>
    </nav>
    <main class="flex-grow flex items-center justify-center p-8 text-center">
        <div>
            <h2 class="text-4xl md:text-6xl font-bold mb-6">Welcome to ${title}</h2>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">This is a starting template. Modify the prompt to customize this design further.</p>
            <button class="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">Get Started</button>
        </div>
    </main>
</body>
</html>
`;

const MOCK_TEMPLATES: Template[] = [
  // --- WEBSITES (12 Items) ---
  { 
    id: '1', 
    title: 'Royal Jewelry Store', 
    category: 'website', 
    description: 'E-commerce platform with vintage aesthetics.', 
    imageUrl: 'https://picsum.photos/400/300?random=1',
    prompt: 'Create a luxurious e-commerce website for a jewelry store named "Royal Gems". Use a gold and black color scheme. Include a hero section with a vintage background, a featured products grid, and an elegant footer.',
    code: createPlaceholderCode('Royal Gems', 'text-yellow-500')
  },
  { 
    id: '2', 
    title: 'FinTech Dashboard', 
    category: 'website', 
    description: 'Dark mode financial analytics dashboard.', 
    imageUrl: 'https://picsum.photos/400/300?random=2',
    prompt: 'Create a modern FinTech dashboard in dark mode. Include a sidebar navigation, a main area with charts (use placeholders), recent transaction list, and a summary card section.',
    code: createPlaceholderCode('FinTech Pro', 'text-blue-500')
  },
  { 
    id: '3', 
    title: 'Travel Portfolio', 
    category: 'website', 
    description: 'Immersive parallax scrolling portfolio.', 
    imageUrl: 'https://picsum.photos/400/300?random=3',
    prompt: 'Create a travel portfolio website with a parallax effect. Use full-screen background images of nature. Sections for "Adventures", "Gallery", and "About Me".',
    code: createPlaceholderCode('Wanderlust', 'text-green-500')
  },
  { 
    id: '4', 
    title: 'SaaS Landing Page', 
    category: 'website', 
    description: 'High-conversion landing page structure.', 
    imageUrl: 'https://picsum.photos/400/300?random=4',
    prompt: 'Create a high-converting SaaS landing page. Include a sticky header, a hero section with a CTA, feature comparison grid, testimonials slider, and a pricing table.',
    code: createPlaceholderCode('SaaSify', 'text-indigo-500')
  },
  { 
    id: '5', 
    title: 'Luxury Real Estate', 
    category: 'website', 
    description: 'Showcase properties with elegant galleries.', 
    imageUrl: 'https://picsum.photos/400/300?random=5',
    prompt: 'Create a luxury real estate website. Use a clean white and gold theme. Include a property search bar in the hero, a grid of high-end listings, and an agent profile section.',
    code: createPlaceholderCode('Estate Elite', 'text-yellow-600')
  },
  { 
    id: '6', 
    title: 'Artisan Coffee Shop', 
    category: 'website', 
    description: 'Warm, rustic design for local cafes.', 
    imageUrl: 'https://picsum.photos/400/300?random=6',
    prompt: 'Create a cozy coffee shop website with a rustic brown and beige color scheme. Include a menu section, an "Our Story" section, and a location map placeholder.',
    code: createPlaceholderCode('The Roasted Bean', 'text-orange-400')
  },
  { 
    id: '7', 
    title: 'Digital Agency', 
    category: 'website', 
    description: 'Modern, clean agency portfolio with grid layout.', 
    imageUrl: 'https://picsum.photos/400/300?random=7',
    prompt: 'Create a minimalist digital agency portfolio. Use a black and white theme with large typography. Include a services grid, client logo strip, and a contact form.',
    code: createPlaceholderCode('Agency X', 'text-white')
  },
  { 
    id: '8', 
    title: 'Personal Brand Blog', 
    category: 'website', 
    description: 'Minimalist blog for thought leaders.', 
    imageUrl: 'https://picsum.photos/400/300?random=8',
    prompt: 'Create a personal branding blog. Clean layout with sidebar. Feature a "Latest Articles" list, an "About Author" widget, and newsletter subscription box.',
    code: createPlaceholderCode('John Doe Blog', 'text-gray-200')
  },
  { 
    id: '9', 
    title: 'Event Conference', 
    category: 'website', 
    description: 'Schedule and speaker management site.', 
    imageUrl: 'https://picsum.photos/400/300?random=9',
    prompt: 'Create a conference event website. Vibrant colors. Include a countdown timer, a speaker lineup grid with photos, and a schedule timeline.',
    code: createPlaceholderCode('TechConf 2025', 'text-purple-500')
  },
  { 
    id: '10', 
    title: 'Non-Profit Organization', 
    category: 'website', 
    description: 'Impactful design focused on donations.', 
    imageUrl: 'https://picsum.photos/400/300?random=10',
    prompt: 'Create a non-profit organization website. Green and earth tones. Prominent "Donate" button, an impact statistics section, and a "Get Involved" form.',
    code: createPlaceholderCode('Earth Save', 'text-green-600')
  },
  { 
    id: '11', 
    title: 'Restaurant Booking', 
    category: 'website', 
    description: 'Elegant table reservation system.', 
    imageUrl: 'https://picsum.photos/400/300?random=11',
    prompt: 'Create an elegant restaurant website. Dark theme with food imagery. Include a reservation form, a categorized menu, and a chef bio section.',
    code: createPlaceholderCode('La Table', 'text-red-400')
  },
  { 
    id: '12', 
    title: 'Online Learning Platform', 
    category: 'website', 
    description: 'Course listing and video player layout.', 
    imageUrl: 'https://picsum.photos/400/300?random=12',
    prompt: 'Create an online learning platform homepage. Search bar for courses, a "Popular Categories" section, and a grid of course cards with progress bars.',
    code: createPlaceholderCode('EduLearn', 'text-blue-400')
  },

  // --- APPS (6 Items) ---
  { 
    id: '13', 
    title: 'Food Delivery App', 
    category: 'app', 
    description: 'Interactive mobile food ordering UI.', 
    imageUrl: 'https://picsum.photos/400/300?random=13',
    prompt: 'Create a mobile app prototype for food delivery. Bottom navigation bar. Home screen with food categories and restaurant list. Detail screen for a selected dish.',
    code: createPlaceholderCode('QuickEats App', 'text-orange-500')
  },
  { 
    id: '14', 
    title: 'Social Connect', 
    category: 'app', 
    description: 'Modern social media feed prototype.', 
    imageUrl: 'https://picsum.photos/400/300?random=14',
    prompt: 'Create a social media mobile app feed. Mobile layout. Top stories bar (circles), vertical scrolling feed of posts with like/comment buttons.',
    code: createPlaceholderCode('Connect App', 'text-blue-600')
  },
  { 
    id: '15', 
    title: 'Fitness Tracker', 
    category: 'app', 
    description: 'Health monitoring dashboard mobile view.', 
    imageUrl: 'https://picsum.photos/400/300?random=15',
    prompt: 'Create a fitness tracker app UI. Dark mode. Dashboard showing rings for steps, calories, and stand hours. List of recent workouts below.',
    code: createPlaceholderCode('FitTrack', 'text-green-400')
  },
  { 
    id: '16', 
    title: 'Crypto Wallet', 
    category: 'app', 
    description: 'Secure digital asset wallet interface.', 
    imageUrl: 'https://picsum.photos/400/300?random=16',
    prompt: 'Create a cryptocurrency wallet app prototype. Modern gradient background. Total balance display, send/receive buttons, and a list of crypto assets.',
    code: createPlaceholderCode('CryptoVault', 'text-purple-400')
  },
  { 
    id: '17', 
    title: 'Task Manager', 
    category: 'app', 
    description: 'Productivity tool with drag-and-drop tasks.', 
    imageUrl: 'https://picsum.photos/400/300?random=17',
    prompt: 'Create a productivity task app. Clean white interface. List of tasks with checkboxes. Floating action button (+) to add new tasks.',
    code: createPlaceholderCode('TaskMaster', 'text-gray-800')
  },
  { 
    id: '18', 
    title: 'Meditation & Calm', 
    category: 'app', 
    description: 'Soothing UI for mindfulness applications.', 
    imageUrl: 'https://picsum.photos/400/300?random=18',
    prompt: 'Create a meditation app UI. Soft pastel colors. Center play button for daily session. Horizontal scroll for "Sleep Stories" and "Focus Music".',
    code: createPlaceholderCode('ZenSpace', 'text-teal-400')
  },
];

const Templates = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'website' | 'app'>('website');
  const navigate = useNavigate();

  const filteredTemplates = activeTab === 'all' 
    ? MOCK_TEMPLATES 
    : MOCK_TEMPLATES.filter(t => t.category === activeTab);

  const handleUseTemplate = (template: Template) => {
    // Navigate to Builder with template data in state
    navigate(AppRoute.BUILDER, { state: { template } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4">Template Library</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Jumpstart your creation process. Select a template to instantly load a base design and prompt into the AI Builder.
        </p>

        {/* Templates Tabs */}
        <div className="inline-flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          {[
            { id: 'website', label: 'Website Designs', icon: Laptop },
            { id: 'app', label: 'Mobile App Prototypes', icon: Smartphone },
            { id: 'all', label: 'View All', icon: Zap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'text-black bg-royal-gold shadow-lg scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredTemplates.map((template) => (
            <motion.div
              layout
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-royal-gold/50 transition-all duration-300 shadow-lg flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={template.imageUrl} 
                  alt={template.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                   <button 
                    onClick={() => handleUseTemplate(template)}
                    className="p-3 bg-royal-gold text-black rounded-full font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)] transform hover:scale-110 transition-transform"
                    title="Generate from this Template"
                   >
                     <Zap className="w-5 h-5" />
                   </button>
                </div>
                {/* Category Badge Overlay */}
                <div className="absolute top-3 left-3">
                   <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-lg backdrop-blur-md ${template.category === 'app' ? 'bg-royal-blue/80 text-white' : 'bg-royal-green/80 text-white'}`}>
                    {template.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-royal-gold transition-colors">{template.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{template.description}</p>
                
                <Button 
                  onClick={() => handleUseTemplate(template)}
                  variant="outline" 
                  className="w-full text-xs py-2 mt-auto hover:bg-royal-gold hover:text-black"
                >
                  <Zap className="w-3 h-3 mr-2" /> Generate from this
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Templates;