import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // 💡 NEW: Determine the base path for GitHub Pages
    // IMPORTANT: 'Make-your-website-in-5-min' must match your actual GitHub repository name
    const githubRepoName = 'Make-your-website-in-5-min'; 
    const base = mode === 'production' ? `/${githubRepoName}/` : '/';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // 🚨 NEW: Add the base property for deployment
      base: base,
    };
});