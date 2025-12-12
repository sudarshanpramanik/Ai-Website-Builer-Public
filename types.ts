export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  prompt: string;
  type: 'website' | 'app';
  code: string;
  createdAt: number;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'website' | 'app';
  imageUrl: string;
  prompt: string; // The natural language prompt used to generate this
  code: string;   // The starter code for immediate preview
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export enum AppRoute {
  HOME = '/',
  BUILDER = '/builder',
  TEMPLATES = '/templates',
  LOGIN = '/login',
  SIGNUP = '/signup',
  DASHBOARD = '/dashboard',
}