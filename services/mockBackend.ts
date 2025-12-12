import { User, Project } from '../types';

/**
 * 💾 DATA LAYER: POSTGRESQL SCHEMA PLACEHOLDER
 * 
 * Although this application currently uses LocalStorage for demonstration, 
 * the production architecture is designed for a relational PostgreSQL database.
 * 
 * -- Users Table
 * CREATE TABLE users (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   name VARCHAR(255) NOT NULL,
 *   password_hash VARCHAR(255) NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * -- Projects Table
 * CREATE TABLE projects (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 *   name VARCHAR(255),
 *   prompt TEXT,
 *   type VARCHAR(50) CHECK (type IN ('website', 'app')),
 *   code TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 * );
 */

// Constants for LocalStorage keys
const USERS_KEY = 'regalis_users';
const PROJECTS_KEY = 'regalis_projects';
const CURRENT_USER_KEY = 'regalis_current_user';

// Admin Contact for Notifications
const ADMIN_EMAIL = 'pramaniksudarshan2007@gmail.com';

interface StoredUser extends User {
  passwordHash: string; // Simulating hashed password storage
}

// --- Phase 4: Admin Notification System ---

/**
 * Triggered ONLY after successful password-based Log In or Sign Up.
 * Sends an automated notification to the developer's email.
 */
const sendNotification = (eventType: string, email: string) => {
  // Placeholder for email service API call
  console.log(
    `%c[ADMIN NOTIFICATION] %cTo: ${ADMIN_EMAIL}\nSubject: New User Activity - ${eventType}\nBody: User ${email} has just performed: ${eventType}.`,
    'color: #D4AF37; font-weight: bold; font-size: 14px; background: #000; padding: 4px; border: 1px solid #D4AF37;',
    'color: #fff; background: #111; padding: 4px;'
  );
};

// --- Helper: Mock Password Hashing ---
const hashPassword = (password: string): string => {
  // In a real app, use bcrypt. Here we just base64 encode for a mock "hash".
  return btoa(password);
};

// --- Auth Services ---

export const signupUser = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network

  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

  // CRITICAL RULE: Unique Email Enforcement (Matches Unique constraint in Schema)
  if (users.find(u => u.email === email)) {
    throw new Error('This email is already registered. Please log in.');
  }

  const newUser: StoredUser = {
    id: Math.random().toString(36).substring(2, 9),
    email,
    name,
    passwordHash: hashPassword(password),
    createdAt: Date.now(),
  };

  // Persist User
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Auto-login
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt
  }));

  // Admin Notification (CRITICAL: Only after success)
  sendNotification('SIGN UP', email);

  // Return non-sensitive user data
  const { passwordHash, ...safeUser } = newUser;
  return safeUser;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // Check Password
  if (user.passwordHash !== hashPassword(password)) {
    throw new Error('Invalid email or password.');
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
  
  // Admin Notification (CRITICAL: Only after success)
  sendNotification('LOG IN', email);

  return safeUser;
};

export const logoutUser = async () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// --- Project Services ---

export const saveProject = async (userId: string, name: string, prompt: string, code: string, type: 'website' | 'app'): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const projects: Project[] = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  
  const newProject: Project = {
    id: Math.random().toString(36).substring(2, 9),
    userId,
    name,
    prompt,
    code,
    type,
    createdAt: Date.now(),
  };

  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const projects: Project[] = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  return projects.filter(p => p.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
};