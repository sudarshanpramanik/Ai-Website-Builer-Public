import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../types';
import { getUserProjects } from '../services/mockBackend';
import { Loader, Package } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserProjects(user.id).then(data => {
        setProjects(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-royal-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-serif font-bold text-white mb-8">
        Welcome Back, <span className="text-royal-gold">{user?.name}</span>
      </h1>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 min-h-[400px]">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-royal-gold" /> My Generated Projects
        </h2>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Package className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">No projects yet.</p>
            <p className="text-sm">Head over to the Builder to create your first masterpiece.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-black border border-gray-800 rounded-lg p-5 hover:border-royal-gold/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white truncate">{project.name || 'Untitled Project'}</h3>
                  <span className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3 bg-gray-900/50 p-3 rounded italic">
                  "{project.prompt}"
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                   <span className="text-xs uppercase tracking-wider font-bold text-royal-gold">{project.type}</span>
                   <button className="text-sm text-gray-300 hover:text-white underline">Download</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
