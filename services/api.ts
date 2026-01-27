import { supabase } from './supabaseClient';
import type { Order, Message, AuditLog } from '../types';

// ===== Orders =====

export interface CreateOrderParams {
    companyName: string;
    type: string;
    amount: number;
    applicantId: string;
}

export async function fetchOrders(userId?: string) {
    let query = supabase.from('orders').select('*');
    if (userId) {
        query = query.eq('applicant_id', userId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data?.map(mapOrderFromDb) || [];
}

export async function fetchAgentOrders(agentId: string) {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data?.map(mapOrderFromDb) || [];
}

export async function fetchPendingOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data?.map(mapOrderFromDb) || [];
}

export async function createOrder(params: CreateOrderParams) {
    const { data, error } = await supabase.from('orders').insert({
        company_name: params.companyName,
        type: params.type,
        amount: params.amount,
        applicant_id: params.applicantId,
        status: 'pending',
    }).select().single();
    if (error) throw error;
    return mapOrderFromDb(data);
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();
    if (error) throw error;
    return mapOrderFromDb(data);
}

export async function claimOrder(orderId: string, agentId: string) {
    const { data, error } = await supabase
        .from('orders')
        .update({ agent_id: agentId, status: 'processing' })
        .eq('id', orderId)
        .select()
        .single();
    if (error) throw error;
    return mapOrderFromDb(data);
}

function mapOrderFromDb(row: any): Order {
    return {
        id: row.id,
        companyName: row.company_name,
        type: row.type,
        status: row.status,
        amount: parseFloat(row.amount),
        time: new Date(row.created_at).toLocaleDateString(),
        agent: row.agent_id,
        applicant: row.applicant_id,
    };
}

// ===== Messages =====

export async function fetchMessages(userId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data?.map(mapMessageFromDb) || [];
}

export async function markMessageAsRead(messageId: string) {
    const { error } = await supabase
        .from('messages')
        .update({ unread: false })
        .eq('id', messageId);
    if (error) throw error;
}

function mapMessageFromDb(row: any): Message {
    return {
        id: row.id,
        title: row.title,
        content: row.content,
        time: new Date(row.created_at).toLocaleString(),
        type: row.type,
        unread: row.unread,
    };
}

// ===== Audit Logs (Admin) =====

export async function fetchAuditLogs() {
    const { data, error } = await supabase
        .from('audit_logs')
        .select('*, profiles:user_id(email)')
        .order('created_at', { ascending: false })
        .limit(50);
    if (error) throw error;
    return data?.map(mapAuditLogFromDb) || [];
}

export async function createAuditLog(params: { userId: string; action: string; module: string; priority?: AuditLog['priority'] }) {
    const { error } = await supabase.from('audit_logs').insert({
        user_id: params.userId,
        action: params.action,
        module: params.module,
        priority: params.priority || 'low',
        // IP is typically captured server-side; for demo, we skip or use placeholder
        ip: 'client',
    });
    if (error) throw error;
}

function mapAuditLogFromDb(row: any): AuditLog {
    return {
        id: row.id,
        user: row.profiles?.email || row.user_id,
        action: row.action,
        module: row.module,
        time: new Date(row.created_at).toLocaleString(),
        ip: row.ip,
        priority: row.priority,
    };
}

// ===== Profiles =====

export async function fetchProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error) throw error;
    return data;
}

export async function fetchAllProfiles() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    return data || [];
}

// ===== Stats (Admin) =====

export async function fetchAdminStats() {
    const ordersResult = await supabase.from('orders').select('amount, status');
    const profilesResult = await supabase.from('profiles').select('id').eq('role', 'user');

    const orders = ordersResult.data || [];
    const totalGMV = orders.reduce((sum, o) => sum + parseFloat(o.amount || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalUsers = profilesResult.data?.length || 0;

    return {
        totalGMV: (totalGMV / 10000).toFixed(1), // 万元
        completedOrders,
        totalUsers,
    };
}
