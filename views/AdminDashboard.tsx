
import React, { useState } from 'react';
import {
  LayoutDashboard, Search, Bell, Filter,
  Activity, Users, ClipboardList, ShieldAlert,
  ChevronRight, ArrowRight, CheckCircle2, AlertTriangle, Info,
  TrendingUp, DollarSign, Settings, FileText, Target
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="p-4 space-y-4 animate-in fade-in">
            <h3 className="text-lg font-bold">用户管理</h3>
            <div className="bg-slate-800 border border-slate-700 rounded-3xl divide-y divide-slate-700 overflow-hidden">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-4 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="size-10 bg-slate-700 rounded-xl" />
                    <div>
                      <p className="text-sm font-bold">User_{i}0293</p>
                      <p className="text-[10px] text-slate-500">杭州 · 注册用户</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold">详情</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'audit':
        return (
          <div className="p-4 space-y-4 animate-in fade-in">
            <h3 className="text-lg font-bold">审计流水</h3>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-[10px] flex justify-between items-center">
                  <span className="text-slate-400">2024-05-24 14:00:2{i}</span>
                  <span className="text-emerald-400">系统登录 [Success]</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 space-y-6 animate-in slide-up-4 duration-500">
            {/* Real-time Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-[2rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><TrendingUp size={64} className="text-cyan-400" /></div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">累计 GMV (万元)</p>
                <p className="text-2xl font-black text-cyan-400 font-mono">8,942.5</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-[10px] font-bold">
                  <TrendingUp size={12} /> +12.5%
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-[2rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><ClipboardList size={64} className="text-blue-400" /></div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">办结执照</p>
                <p className="text-2xl font-black text-blue-400 font-mono">12,458</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-[10px] font-bold">
                  <TrendingUp size={12} /> +5.2%
                </div>
              </div>
            </div>

            {/* Audit Logs Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <ShieldAlert className="text-primary" size={18} /> 敏感操作告警
                </h3>
                <button onClick={() => setActiveTab('audit')} className="text-primary text-xs font-bold">全部</button>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                  <div className="flex justify-between items-start mb-2 pl-2">
                    <div className="flex gap-3">
                      <div className="size-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm">批量转账</h4>
                          <span className="bg-red-500/20 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">紧急</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">RULE-2023-001</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-12 leading-relaxed">
                    用户 <span className="text-slate-100 font-bold">Admin-04</span> 触发紧急规则。涉及金额: ¥55,000。
                  </p>
                  <div className="mt-4 pl-12 flex gap-2">
                    <button className="flex-1 bg-red-500 text-white text-[10px] font-bold py-2 rounded-xl active:scale-95 transition-transform">锁定</button>
                    <button className="flex-1 bg-slate-700 text-slate-300 text-[10px] font-bold py-2 rounded-xl active:scale-95 transition-transform">忽略</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden relative">
      {/* Visual Tech Header */}
      <div className="header-gradient p-6 relative overflow-hidden bg-slate-950 border-b border-slate-800 shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-3 border border-cyan-500/30">
            <Activity className="text-cyan-400" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {activeTab === 'stats' ? '业务监控中心' : activeTab === 'users' ? '用户全景管理' : '审计安全中心'}
          </h1>
          <span className="text-[8px] text-slate-600 tracking-[0.3em] uppercase mt-1">Real-time Admin System</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderContent()}
      </main>

      {/* Bottom Nav Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 pb-10 pt-3 px-6 flex justify-between z-[110]">
        {[
          { id: 'stats', label: '看板', icon: <Target size={22} /> },
          { id: 'users', label: '用户', icon: <Users size={22} /> },
          { id: 'audit', label: '审计', icon: <FileText size={22} /> },
          { id: 'settings', label: '设置', icon: <Settings size={22} /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-cyan-400 scale-105' : 'text-slate-600'}`}
          >
            {item.icon}
            <span className={`text-[9px] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-30'}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
