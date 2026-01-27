
import React from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  Search, 
  MessageSquare, 
  PlusCircle,
  Briefcase,
  TrendingUp,
  CreditCard,
  Target,
  Award
} from 'lucide-react';

export const USER_NAV = [
  { id: 'home', label: '首页', icon: <Home size={24} /> },
  { id: 'orders', label: '服务', icon: <Briefcase size={24} /> },
  { id: 'messages', label: '消息', icon: <MessageSquare size={24} /> },
  { id: 'profile', label: '我的', icon: <Users size={24} /> },
];

export const AGENT_NAV = [
  { id: 'dashboard', label: '概览', icon: <Home size={24} /> },
  { id: 'orders', label: '接单', icon: <FileText size={24} /> },
  { id: 'earnings', label: '收益', icon: <TrendingUp size={24} /> },
  { id: 'leaderboard', label: '风云榜', icon: <Award size={24} /> },
  { id: 'profile', label: '我的', icon: <Users size={24} /> },
];

export const ADMIN_NAV = [
  { id: 'stats', label: '看板', icon: <Target size={24} /> },
  { id: 'users', label: '用户', icon: <Users size={24} /> },
  { id: 'audit', label: '审计', icon: <FileText size={24} /> },
  { id: 'settings', label: '设置', icon: <Settings size={24} /> },
];
