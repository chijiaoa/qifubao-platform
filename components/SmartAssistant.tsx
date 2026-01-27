
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getBusinessAdvice } from '../services/geminiService';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: '您好！我是您的智能办照助手。有什么关于工商财税的问题我可以帮您解答吗？' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const advice = await getBusinessAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-[90]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 w-80 h-[450px] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-slide-up overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold text-sm">智能办照助手</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none animate-pulse text-slate-400">
                  正在思考中...
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="输入问题..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 dark:text-white"
            />
            <button 
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-xl shadow-md shadow-primary/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default SmartAssistant;
