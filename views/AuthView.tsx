import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, UserPlus, LogIn } from 'lucide-react';

interface AuthViewProps {
    onClose?: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onClose }) => {
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
                setSuccess('注册成功！请检查邮箱验证链接。');
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message || '操作失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="size-16 mx-auto mb-4 bg-primary rounded-3xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="text-2xl font-black">企</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">企服宝</h1>
                    <p className="text-sm text-slate-500 mt-1">专业工商代办平台</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-2xl mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white dark:bg-slate-600 shadow-sm text-primary' : 'text-slate-500'
                                }`}
                        >
                            登录
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white dark:bg-slate-600 shadow-sm text-primary' : 'text-slate-500'
                                }`}
                        >
                            注册
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                placeholder="邮箱地址"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                placeholder="密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-xl">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : isLogin ? (
                                <>
                                    <LogIn size={18} />
                                    登录
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    注册
                                </>
                            )}
                        </button>
                    </form>

                    {isLogin && (
                        <button className="w-full text-center text-xs text-slate-400 mt-4 hover:text-primary transition-colors">
                            忘记密码？
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthView;
