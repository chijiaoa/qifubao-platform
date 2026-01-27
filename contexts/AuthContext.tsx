import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import type { Role } from '../types';

interface Profile {
    id: string;
    email: string;
    role: Role;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    isDemo: boolean;
    signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    enterDemoMode: (role?: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);

    const enterDemoMode = (role: Role = 'user') => {
        setIsDemo(true);
        setUser({ id: 'demo-user', email: 'demo@example.com' } as User);
        setProfile({
            id: 'demo-user',
            email: 'demo@example.com',
            role: role,
        });
        setLoading(false);
    };

    useEffect(() => {
        // If Supabase is not configured, go straight to demo mode
        if (!isSupabaseConfigured) {
            console.log('🎮 Demo mode: Supabase not configured');
            enterDemoMode('user');
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (!error && data) {
            setProfile({
                id: data.id,
                email: data.email,
                role: data.role as Role,
            });
        }
        setLoading(false);
    };

    const signUp = async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
            enterDemoMode();
            return { error: null };
        }
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error };

        // Create profile entry
        if (data.user) {
            await supabase.from('profiles').insert({
                id: data.user.id,
                email: email,
                role: 'user',
            });
        }
        return { error: null };
    };

    const signIn = async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
            enterDemoMode();
            return { error: null };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signOut = async () => {
        if (!isSupabaseConfigured || isDemo) {
            setIsDemo(false);
            setSession(null);
            setUser(null);
            setProfile(null);
            return;
        }
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ session, user, profile, loading, isDemo, signUp, signIn, signOut, enterDemoMode }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
