
import React, { useState } from 'react';
import { User as UserType } from '../types';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthProps {
  onLogin: (user: UserType) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email === 'admin@atendimentomp.com' ? 'admin' : 'user';
    const userName = isLogin ? (email === 'admin@atendimentomp.com' ? 'Marquinho' : email.split('@')[0]) : name;
    onLogin({ id: Math.random().toString(36).substr(2, 9), name: userName, email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-400/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full" />

      <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white rounded-[55px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden p-8 lg:p-16">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-sky-500 rounded-[30px] mx-auto flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-sky-200 transform rotate-3 ring-8 ring-sky-50">
              🪁
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-3">ATENDIMENTO MP</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Gestão Municipal Digital • 3º Distrito</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Seu Nome</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-14 pr-6 py-4.5 rounded-[22px] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm font-bold text-slate-700"
                    placeholder="Nome Completo"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4.5 rounded-[22px] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm font-bold text-slate-700"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4.5 rounded-[22px] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm font-bold text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black rounded-[25px] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              {isLogin ? 'Entrar no Portal' : 'Finalizar Cadastro'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="px-6 py-3 rounded-2xl hover:bg-slate-50 text-sky-600 text-[11px] font-black uppercase tracking-wider transition-all"
            >
              {isLogin ? 'Não tem uma conta? Clique para criar' : 'Já possui conta? Fazer Login'}
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
             <ShieldCheck size={12} /> Gabinete Criptografado
          </div>
        </div>
      </div>
    </div>
  );
};
