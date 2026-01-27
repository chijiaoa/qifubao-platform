
export type Role = 'user' | 'agent' | 'admin';

export interface Order {
  id: string;
  companyName: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  amount: number;
  time: string;
  agent?: string;
  applicant: string;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  unread: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  time: string;
  ip: string;
  priority: 'low' | 'medium' | 'high';
}
