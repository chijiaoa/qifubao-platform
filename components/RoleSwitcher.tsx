
import React from 'react';
import { Role } from '../types';
import { User, ShieldCheck, Cog, Sun, Moon } from 'lucide-react';

interface Props {
  currentRole: Role;
  onSwitch: (role: Role) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const RoleSwitcher: React.FC<Props> = ({ currentRole, onSwitch, isDark, toggleDark }) => {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div className="pointer-events-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
        <button 
          onClick={() => onSwitch('user')}
          className={`p-2 rounded-xl transition-all ${currentRole === 'user' ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="切换至用户端"
        >
          <User size={20} />
        </button>
        <button 
          onClick={() => onSwitch('agent')}
          className={`p-2 rounded-xl transition-all ${currentRole === 'agent' ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="切换至代办端"
        >
          <ShieldCheck size={20} />
        </button>
        <button 
          onClick={() => onSwitch('admin')}
          className={`p-2 rounded-xl transition-all ${currentRole === 'admin' ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="切换至管理端"
        >
          <Cog size={20} />
        </button>
        <div className="h-px bg-slate-200 dark:bg-slate-700 mx-1" />
        <button 
          onClick={toggleDark}
          className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
