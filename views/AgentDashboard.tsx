
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import {
  TrendingUp, Users, DollarSign, Timer, ChevronRight, Award,
  Home, FileText, Target, Award as AwardIcon, User as UserIcon,
  Zap, MapPin, Search
} from 'lucide-react';

const DATA_RADAR = [
  { subject: '效率', A: 120, fullMark: 150 },
  { subject: '满意度', A: 98, fullMark: 150 },
  { subject: '政策', A: 86, fullMark: 150 },
  { subject: '疑难', A: 99, fullMark: 150 },
  { subject: '合规', A: 85, fullMark: 150 },
  { subject: '沟通', A: 65, fullMark: 150 },
];

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="p-4 space-y-4 animate-in slide-up-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input placeholder="搜索周边订单..." className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs" />
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1">
              <span>发现 12 个新需求</span>
              <span className="text-primary flex items-center gap-1">智能排序 <ChevronRight size={12} className="rotate-90" /></span>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-emerald-500">附近优质单</span>
                  </div>
                  <span className="text-primary font-bold text-lg">¥{i * 200}.00</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">有限责任公司注册（包刻章）</h4>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><MapPin size={10} /> 杭州市余杭区 · 2.5km</p>
                </div>
                <button className="w-full bg-primary py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">立即抢单</button>
              </div>
            ))}
          </div>
        );
      case 'earnings':
        return (
          <div className="p-4 flex flex-col items-center justify-center h-full opacity-50 space-y-4">
            <DollarSign size={48} />
            <p className="text-sm font-bold">收益统计模块开发中</p>
          </div>
        );
      default:
        return (
          <div className="p-4 space-y-6 animate-in fade-in duration-500">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Timer size={16} />
                  <span className="text-xs font-medium">平均办理时长</span>
                </div>
                <p className="text-2xl font-black">2.4<span className="text-xs text-slate-500 ml-1">天</span></p>
                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded w-fit flex items-center gap-1">
                  <TrendingUp size={10} /> 10%
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Award size={16} className="text-yellow-500" />
                  <span className="text-xs font-medium">综合评分</span>
                </div>
                <p className="text-2xl font-black">4.8<span className="text-xs text-slate-500 ml-1">/5.0</span></p>
                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded w-fit">
                  +2% 环比
                </div>
              </div>
            </div>

            {/* Radar Chart Card */}
            <section className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Zap size={16} className="text-primary" /> 能力雷达图</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={DATA_RADAR}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Radar name="Ability" dataKey="A" stroke="#137fec" fill="#137fec" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Focus List */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold px-1">正在跟进的客户</h3>
              {[
                { name: '王经理', company: '美滋滋餐饮中心', status: '待审核', color: 'orange' },
                { name: '李总', company: '大华科技集团', status: '已通过', color: 'emerald' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-primary">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.company}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.name}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded bg-${item.color}-500/10 text-${item.color}-500`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-hidden relative">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-900 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-black tracking-tight">
            {activeTab === 'dashboard' ? '能力画像' : activeTab === 'orders' ? '抢单大厅' : '我的收益'}
          </h1>
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-900 pb-10 pt-3 px-6 flex justify-between z-[100]">
        {[
          { id: 'dashboard', label: '概览', icon: <Home size={22} /> },
          { id: 'orders', label: '接单', icon: <Target size={22} /> },
          { id: 'earnings', label: '收益', icon: <TrendingUp size={22} /> },
          { id: 'profile', label: '我的', icon: <UserIcon size={22} /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-primary' : 'text-slate-600'}`}
          >
            {item.icon}
            <span className={`text-[9px] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AgentDashboard;
