
import React, { useState, useEffect } from 'react';
import {
  Search, Bell, Plus, ChevronLeft, ChevronRight, Building2, Store, Clock, Home,
  Briefcase, MessageSquare, User, FileText, ShieldCheck, Zap, ArrowRight,
  CheckCircle2, Info, Upload, Check, Filter, Camera, RefreshCw, X, Loader2,
  Settings, CreditCard, LogOut, ShieldAlert, Gift
} from 'lucide-react';

const SCOPE_TEMPLATES = [
  { id: 'tech', category: '科技类', items: ['软件开发', '信息系统集成服务', '人工智能应用软件开发', '数据处理服务'] },
  { id: 'catering', category: '餐饮类', items: ['餐饮服务', '食品销售', '外卖递送服务', '单位后勤管理服务'] },
  { id: 'retail', category: '零售类', items: ['日用品销售', '服装服饰零售', '化妆品零售', '互联网销售'] },
  { id: 'culture', category: '文化传媒', items: ['组织文化艺术交流活动', '广告设计、代理', '会议及展览服务'] },
];

const NOTIFICATIONS = [
  { id: 1, title: '订单状态更新', content: '您申请的“杭州未来元宇宙科技有限公司”已进入预核名阶段。', time: '10分钟前', unread: true },
  { id: 2, title: '限时优惠', content: '新客专享！现在办理代理记账可领 500 元现金券。', time: '1小时前', unread: true },
  { id: 3, title: '实名认证成功', content: '您的个人高级实名认证已通过，可以开始办理业务了。', time: '昨天', unread: false },
];

const UserHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showScopeSelector, setShowScopeSelector] = useState(false);
  const [showCameraView, setShowCameraView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [idCardCaptured, setIdCardCaptured] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // 提交状态逻辑
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // 处理提交申请
  const handleSubmit = () => {
    if (!idCardCaptured) {
      alert('请先完成身份证件上传');
      return;
    }

    setSubmissionStatus('submitting');

    setTimeout(() => {
      setSubmissionStatus('success');

      setTimeout(() => {
        setSubmissionStatus('idle');
        setSelectedService(null);
        setSelectedScopes([]);
        setIdCardCaptured(false);
        setActiveTab('orders');
      }, 1500);
    }, 1200);
  };


  // 当有弹出层时，直接返回弹出层内容，完全替换主页面
  if (showNotifications) {
    return (
      <div className="h-full w-full bg-slate-50 dark:bg-slate-950 flex flex-col">
        <header className="px-6 py-4 flex items-center gap-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <button onClick={() => setShowNotifications(false)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">通知中心</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {NOTIFICATIONS.map((notif) => (
            <div key={notif.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 relative shadow-sm">
              {notif.unread && <div className="absolute top-4 right-4 size-2 bg-primary rounded-full" />}
              <h4 className="font-bold text-sm mb-1">{notif.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{notif.content}</p>
              <span className="text-[10px] text-slate-300 mt-2 block">{notif.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showProfileDetail) {
    return (
      <div className="h-full w-full bg-slate-50 dark:bg-slate-950 flex flex-col">
        <header className="px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowProfileDetail(false)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">个人信息</h2>
          </div>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <Settings size={20} className="text-slate-500" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col items-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div className="size-24 rounded-[2rem] overflow-hidden mb-4 shadow-xl border-4 border-white dark:border-slate-800">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <h3 className="text-xl font-black">Felix Zhang</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">UID: 882039123</p>
            <div className="flex gap-4 mt-6 w-full">
              <div className="flex-1 bg-primary/5 p-4 rounded-2xl text-center">
                <p className="text-[10px] text-primary/60 font-bold uppercase mb-1">账户余额</p>
                <p className="text-lg font-black text-primary">¥2,480.00</p>
              </div>
              <div className="flex-1 bg-orange-500/5 p-4 rounded-2xl text-center">
                <p className="text-[10px] text-orange-500/60 font-bold uppercase mb-1">信用积分</p>
                <p className="text-lg font-black text-orange-500">765</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <section className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">账户管理</h4>
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                {[
                  { icon: <ShieldCheck size={18} className="text-emerald-500" />, label: '实名认证', value: '已认证' },
                  { icon: <CreditCard size={18} className="text-blue-500" />, label: '银行卡', value: '2张' },
                  { icon: <Gift size={18} className="text-purple-500" />, label: '邀请奖励', value: '¥100' }
                ].map((item, i) => (
                  <button key={i} className="w-full p-4 flex items-center justify-between active:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">{item.value}</span>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
            <button className="w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm py-4 bg-red-50 dark:bg-red-500/10 rounded-2xl active:scale-95 transition-all">
              <LogOut size={18} /> 退出当前登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submissionStatus === 'success') {
    return (
      <div className="h-full w-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-10">
        <div className="size-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6">
          <Check size={48} strokeWidth={4} />
        </div>
        <h2 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">申请已提交</h2>
        <p className="text-slate-500 text-center text-sm">代办专员正在加急为您审核材料，请保持通讯畅通</p>
        <div className="mt-12 flex flex-col items-center gap-2">
          <Loader2 size={24} className="text-primary animate-spin" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">正在跳转至代办列表...</span>
        </div>
      </div>
    );
  }

  if (showCameraView) {
    return (
      <div className="h-full w-full bg-black flex flex-col">
        <div className="p-6 flex justify-between items-center text-white">
          <button onClick={() => setShowCameraView(false)} className="p-2 bg-white/10 rounded-full">
            <X size={24} />
          </button>
          <span className="text-sm font-bold tracking-widest uppercase">身份核验采集</span>
          <div className="size-10" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="w-full aspect-[1.58/1] border-2 border-white/30 rounded-2xl relative">
            <div className="absolute top-0 left-0 size-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
            <div className="absolute top-0 right-0 size-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
              <User size={80} className="text-white mb-2" />
              <p className="text-[10px] text-white font-bold uppercase tracking-widest">请将身份证正面对准框内</p>
            </div>
          </div>
          <p className="mt-8 text-white/50 text-xs text-center max-w-[200px]">
            请保持光线充足，避免反光或模糊，系统将自动识别并加密上传
          </p>
        </div>
        <div className="p-10 flex flex-col items-center gap-8 bg-gradient-to-t from-black to-transparent">
          <button
            onClick={() => {
              setIsCapturing(true);
              setTimeout(() => {
                setIsCapturing(false);
                setIdCardCaptured(true);
                setShowCameraView(false);
              }, 1500);
            }}
            disabled={isCapturing}
            className="size-20 bg-white rounded-full p-1 border-4 border-white/20 active:scale-90 transition-transform flex items-center justify-center overflow-hidden"
          >
            {isCapturing ? (
              <RefreshCw size={32} className="text-primary animate-spin" />
            ) : (
              <div className="size-full bg-white rounded-full border-2 border-black/5 shadow-inner" />
            )}
          </button>
          <div className="flex gap-10 text-white/40">
            <div className="flex flex-col items-center gap-2">
              <div className="size-10 bg-white/10 rounded-full flex items-center justify-center"><Plus size={20} /></div>
              <span className="text-[10px]">相册</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-10 bg-white/10 rounded-full flex items-center justify-center"><RefreshCw size={20} /></div>
              <span className="text-[10px]">翻转</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showScopeSelector) {
    return (
      <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-slate-950">
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowScopeSelector(false)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">选择经营范围</h2>
          </div>
          <button onClick={() => setShowScopeSelector(false)} className="text-primary font-bold text-sm">完成({selectedScopes.length})</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="搜索关键词..." className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs shadow-sm focus:ring-2 focus:ring-primary/20" />
          </div>
          {SCOPE_TEMPLATES.map((cat) => (
            <div key={cat.id} className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider flex items-center gap-2"><Filter size={12} /> {cat.category}</h3>
              <div className="grid grid-cols-1 gap-2">
                {cat.items.map((item) => {
                  const isSelected = selectedScopes.includes(item);
                  return (
                    <button key={item} onClick={() => isSelected ? setSelectedScopes(prev => prev.filter(s => s !== item)) : setSelectedScopes(prev => [...prev, item])}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${isSelected ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      {isSelected && <Check size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {selectedScopes.length > 0 && (
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 safe-area-bottom">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedScopes.map(s => <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full">{s}</span>)}
            </div>
            <button onClick={() => setShowScopeSelector(false)} className="w-full bg-primary text-white py-4 rounded-2xl font-bold active:scale-95 transition-all">确定并返回</button>
          </div>
        )}
      </div>
    );
  }

  if (selectedService) {
    return (
      <div className="h-full w-full flex flex-col bg-white dark:bg-slate-900">
        <header className="px-6 py-4 flex items-center gap-4 border-b border-slate-50 dark:border-slate-800">
          <button onClick={() => setSelectedService(null)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">{selectedService}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex justify-between relative px-2">
            <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
            {[{ step: 1, label: '填写信息' }, { step: 2, label: '上传资料' }, { step: 3, label: '签名提交' }].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${s.step === 1 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{s.step}</div>
                <span className="text-[10px] font-medium text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">预核准公司名称</label>
              <input placeholder="请输入拟定公司全称" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">经营范围</label>
              <button onClick={() => setShowScopeSelector(true)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center text-sm text-slate-400 active:bg-slate-100 transition-colors text-left">
                <div className="flex flex-col gap-1">
                  <span className={selectedScopes.length > 0 ? 'text-slate-900 dark:text-white font-medium' : ''}>{selectedScopes.length > 0 ? selectedScopes.slice(0, 2).join('、') + (selectedScopes.length > 2 ? '...' : '') : '选择经营范围模板'}</span>
                  {selectedScopes.length > 0 && <span className="text-[10px] text-primary">已选择 {selectedScopes.length} 项</span>}
                </div>
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">上传身份证明</label>
              {idCardCaptured ? (
                <div className="relative group overflow-hidden rounded-3xl border-2 border-emerald-500/50">
                  <div className="aspect-[1.58/1] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-emerald-500">
                      <CheckCircle2 size={40} />
                      <span className="text-xs font-bold">证件已成功识别采集</span>
                    </div>
                  </div>
                  <button onClick={() => setShowCameraView(true)} className="absolute bottom-2 right-2 bg-black/60 text-white p-2 rounded-xl text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                    <RefreshCw size={12} /> 重新拍摄
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowCameraView(true)} className="w-full border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center gap-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95">
                  <Camera size={32} />
                  <span className="text-xs">点击拍摄或上传身份证正反面</span>
                </button>
              )}
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex gap-3">
            <Info size={20} className="text-primary shrink-0" />
            <p className="text-[11px] text-primary/80 leading-relaxed">温馨提示：根据杭州市工商局最新政策，新办企业可同步申请免费印章刻制服务，预计办理时长 1-3 个工作日。</p>
          </div>
        </div>
        <div className="p-6 border-t border-slate-50 dark:border-slate-800 pb-10">
          <button onClick={handleSubmit} disabled={submissionStatus !== 'idle'} className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100">
            {submissionStatus === 'submitting' ? <><Loader2 className="animate-spin" size={20} /> 正在提交信息...</> : <><ArrowRight size={18} /> 提交申请</>}
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {activeTab === 'home' && !selectedService && !showScopeSelector && !showCameraView && submissionStatus === 'idle' && !showNotifications && !showProfileDetail && (
        <header className="px-6 py-4 flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <div onClick={() => setShowProfileDetail(true)} className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-all">
              <div className="size-10 rounded-2xl overflow-hidden shadow-md group-hover:ring-2 ring-primary/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Entrepreneur</p>
                <h2 className="text-slate-900 dark:text-white font-black leading-tight">下午好, 创业者</h2>
              </div>
            </div>
            <button onClick={() => setShowNotifications(true)} className="size-10 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-all hover:bg-slate-50">
              <div className="relative">
                <Bell size={18} />
                <div className="absolute -top-1 -right-1 size-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full" />
              </div>
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
            <input placeholder="查询政策、进度或代办..." className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {!selectedService && !showScopeSelector && !showCameraView && submissionStatus !== 'success' && !showNotifications && !showProfileDetail && (
          (() => {
            switch (activeTab) {
              case 'orders':
                return (
                  <div className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold">我的代办</h2>
                    {[
                      { name: '杭州示例科技有限公司', status: '进行中', progress: 66, date: '2024-05-24' },
                      { name: '西湖区某某工作室', status: '待补件', progress: 30, date: '2024-05-22' }
                    ].map((order, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all">
                        <div className="flex justify-between mb-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${order.status === '进行中' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'}`}>{order.status}</span>
                          <span className="text-[10px] text-slate-400">{order.date}</span>
                        </div>
                        <h4 className="font-bold text-sm mb-4">{order.name}</h4>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${order.status === '进行中' ? 'bg-primary' : 'bg-orange-500'}`} style={{ width: `${order.progress}%` }}></div>
                          </div>
                          <span className="text-[10px] font-black">{order.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              case 'messages':
                return (
                  <div className="flex flex-col h-full bg-white dark:bg-slate-900 animate-in fade-in duration-500">
                    <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                      <h2 className="text-xl font-bold">消息中心</h2>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center opacity-50">
                      <MessageSquare size={48} className="mb-4 text-slate-300" />
                      <p className="text-sm">暂无新消息</p>
                    </div>
                  </div>
                );
              case 'profile':
                return (
                  <div className="p-6 space-y-6 animate-in slide-in-from-right-4 duration-500">
                    <div onClick={() => setShowProfileDetail(true)} className="flex items-center gap-4 bg-primary p-6 rounded-[2.5rem] text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer">
                      <div className="size-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl font-bold overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Felix Zhang</h3>
                        <p className="text-xs opacity-70">138 **** 8888</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2 active:scale-95 transition-all">
                        <ShieldCheck size={24} className="text-primary" />
                        <span className="text-xs font-bold">企业认证</span>
                      </button>
                      <button className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2 active:scale-95 transition-all">
                        <FileText size={24} className="text-orange-500" />
                        <span className="text-xs font-bold">我的发票</span>
                      </button>
                    </div>
                  </div>
                );
              default:
                return (
                  <div className="space-y-6 pb-24 px-4 animate-in fade-in duration-700">
                    <div className="relative w-full h-44 rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-500/10">
                      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Banner" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                        <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-2 text-white">独家权益</span>
                        <h3 className="text-white text-xl font-bold">初创企业 0 元领证</h3>
                        <p className="text-white/70 text-xs">限时申请领取创业大礼包</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {[
                        { id: 'registration', icon: <Building2 className="text-blue-500" />, label: '公司注册' },
                        { id: 'cancellation', icon: <Zap className="text-yellow-500" />, label: '极速注销' },
                        { id: 'bookkeeping', icon: <FileText className="text-emerald-500" />, label: '代理记账' },
                        { id: 'trademark', icon: <ShieldCheck className="text-indigo-500" />, label: '商标申请' }
                      ].map((item, i) => (
                        <button key={i} onClick={() => setSelectedService(item.label)} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                          <div className="size-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center">{item.icon}</div>
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setSelectedService('新办注册')} className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-left active:scale-95 transition-all">
                        <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4"><Building2 size={20} /></div>
                        <h3 className="text-slate-900 dark:text-white font-bold text-sm">新办注册</h3>
                        <p className="text-slate-500 text-[9px] mt-1">全程网办 · 极速出证</p>
                      </button>
                      <button onClick={() => setSelectedService('执照注销')} className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-left active:scale-95 transition-all">
                        <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mb-4"><Store size={20} /></div>
                        <h3 className="text-slate-900 dark:text-white font-bold text-sm">执照注销</h3>
                        <p className="text-slate-500 text-[9px] mt-1">简易程序 · 线上审批</p>
                      </button>
                    </div>
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-slate-900 dark:text-white text-lg font-extrabold">办理进度</h2>
                        <button onClick={() => setActiveTab('orders')} className="text-primary text-xs font-bold">查看详情</button>
                      </div>
                      <div onClick={() => setActiveTab('orders')} className="bg-slate-900 dark:bg-black rounded-[2rem] p-5 text-white shadow-xl relative overflow-hidden active:scale-[0.98] transition-all cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Building2 size={80} /></div>
                        <div className="relative z-10">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Current Task</p>
                          <h3 className="font-bold text-sm truncate pr-12">杭州未来元宇宙科技有限公司</h3>
                          <div className="mt-6 flex justify-between items-end">
                            <div>
                              <p className="text-2xl font-black text-primary">65<span className="text-xs ml-0.5">%</span></p>
                              <p className="text-[9px] text-slate-500">正在进行：材料预审</p>
                            </div>
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => <div key={i} className="size-6 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" /></div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                );
            }
          })()
        )}
      </main>

      {!selectedService && !showScopeSelector && !showCameraView && submissionStatus === 'idle' && !showNotifications && !showProfileDetail && (
        <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 pt-3 pb-8 flex justify-between items-center z-50 animate-in slide-in-from-bottom duration-300">
          {[
            { id: 'home', icon: <Home size={22} />, label: '首页' },
            { id: 'orders', icon: <Briefcase size={22} />, label: '代办' },
            { id: 'messages', icon: <MessageSquare size={22} />, label: '消息' },
            { id: 'profile', icon: <User size={22} />, label: '我的' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1 transition-all flex-1 ${activeTab === tab.id ? 'text-primary' : 'text-slate-300 dark:text-slate-600'}`}>
              <div className={`p-1 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-primary/10' : ''}`}>{tab.icon}</div>
              <span className={`text-[9px] font-bold ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}>{tab.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default UserHome;
