
import React, { useState, useEffect } from 'react';
import { Role } from './types';
import { useAuth } from './contexts/AuthContext';
import UserHome from './views/UserHome';
import AgentDashboard from './views/AgentDashboard';
import AdminDashboard from './views/AdminDashboard';
import AuthView from './views/AuthView';
import RoleSwitcher from './components/RoleSwitcher';
import SmartAssistant from './components/SmartAssistant';
import { Wifi, Battery, Signal, Loader2 } from 'lucide-react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[12px] font-bold z-[100] relative dark:text-white">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={14} className="rotate-90" />
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [role, setRole] = useState<Role>('user');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync role with profile from Supabase
  useEffect(() => {
    if (profile?.role) {
      setRole(profile.role);
    }
  }, [profile]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Loading state
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-slate-900">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden relative">
        <StatusBar />
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <AuthView />
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (role) {
      case 'user': return <UserHome />;
      case 'agent': return <AgentDashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <UserHome />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden relative">
      <StatusBar />
      <RoleSwitcher
        currentRole={role}
        onSwitch={(r) => setRole(r)}
        isDark={isDarkMode}
        toggleDark={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {renderView()}
      </div>

      <SmartAssistant />
    </div>
  );
};

export default AppContent;
