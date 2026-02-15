import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'worker';

export type JobType = 'plumber' | 'electrician' | 'decorator' | 'pharmacist';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface WorkerProfile extends UserProfile {
  phone: string;
  jobType: JobType;
  experienceYears: number;
  price: number;
  rating: number;
  diplomaName?: string;
  cvName?: string;
  certificateNames?: string[];
}

interface AuthContextType {
  user: UserProfile | WorkerProfile | null;
  login: (email: string, password: string) => boolean;
  registerUser: (name: string, email: string, password: string) => boolean;
  registerWorker: (data: Omit<WorkerProfile, 'id' | 'rating'> & { password: string }) => boolean;
  logout: () => void;
  updateWorkerProfile: (updates: Partial<WorkerProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const generateId = () => Math.random().toString(36).substring(2, 10);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | WorkerProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hcm_current_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const persist = (u: UserProfile | WorkerProfile) => {
    setUser(u);
    localStorage.setItem('hcm_current_user', JSON.stringify(u));
  };

  const getUsers = (): Record<string, { profile: UserProfile | WorkerProfile; password: string }> => {
    return JSON.parse(localStorage.getItem('hcm_users') || '{}');
  };

  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('hcm_users', JSON.stringify(users));
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const entry = Object.values(users).find(u => u.profile.email === email && u.password === password);
    if (entry) {
      persist(entry.profile);
      return true;
    }
    return false;
  };

  const registerUser = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    if (Object.values(users).some(u => u.profile.email === email)) return false;
    const id = generateId();
    const profile: UserProfile = { id, name, email, role: 'user' };
    users[id] = { profile, password };
    saveUsers(users);
    persist(profile);
    return true;
  };

  const registerWorker = (data: Omit<WorkerProfile, 'id' | 'rating'> & { password: string }): boolean => {
    const users = getUsers();
    if (Object.values(users).some(u => u.profile.email === data.email)) return false;
    const id = generateId();
    const { password, ...rest } = data;
    const profile: WorkerProfile = { ...rest, id, rating: Math.round((3 + Math.random() * 2) * 10) / 10 };
    users[id] = { profile, password };
    saveUsers(users);
    // Also add to workers list
    const workers: WorkerProfile[] = JSON.parse(localStorage.getItem('hcm_workers') || '[]');
    workers.push(profile);
    localStorage.setItem('hcm_workers', JSON.stringify(workers));
    persist(profile);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hcm_current_user');
  };

  const updateWorkerProfile = (updates: Partial<WorkerProfile>) => {
    if (!user || user.role !== 'worker') return;
    const updated = { ...user, ...updates } as WorkerProfile;
    persist(updated);
    // Update in users store
    const users = getUsers();
    if (users[user.id]) {
      users[user.id].profile = updated;
      saveUsers(users);
    }
    // Update in workers list
    const workers: WorkerProfile[] = JSON.parse(localStorage.getItem('hcm_workers') || '[]');
    const idx = workers.findIndex(w => w.id === user.id);
    if (idx >= 0) workers[idx] = updated;
    else workers.push(updated);
    localStorage.setItem('hcm_workers', JSON.stringify(workers));
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, registerWorker, logout, updateWorkerProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
