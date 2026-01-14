
import React from 'react';
import { 
  Briefcase, 
  AlertCircle, 
  UserPlus, 
  Ticket, 
  CloudSun, 
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  HardHat,
  Info
} from 'lucide-react';
import { View, WorkAlert } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
  isAdmin: boolean;
  activeWorks?: WorkAlert[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isAdmin, activeWorks = [] }) => {
  const cards = [
    { id: 'jobs', icon: Briefcase, title: 'Oportunidades', desc: 'Vagas exclusivas no distrito.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'occurrences', icon: AlertCircle, title: 'Fiscalização', desc: 'Relate problemas na sua rua.', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'registration', icon: UserPlus, title: 'Meu Perfil', desc: 'Dados e benefícios sociais.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'ticket', icon: Ticket, title: 'Atendimento', desc: 'Sua senha em poucos cliques.', color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Alertas de Obras (Banner Dinâmico) */}
      {activeWorks.length > 0 && (
        <div className="bg-amber-500 rounded-[35px] p-8 text-white shadow-2xl shadow-amber-100 relative overflow-hidden group animate-fade-in animate-float">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md animate-pulse">
                    <HardHat size={28} />
                 </div>
                 <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Obras em Andamento</h4>
                    <p className="text-xl font-black tracking-tight leading-tight">
                       Existem {activeWorks.length} alertas de obras ativas em seu distrito.
                    </p>
                 </div>
              </div>
              <button 
                 onClick={() => onNavigate('works_alerts')}
                 className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all flex items-center gap-3 uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95"
              >
                 VER DETALHES <ChevronRight size={16} />
              </button>
           </div>
           <div className="absolute top-[-20%] right-[-10%] text-[180px] text-white/10 select-none pointer-events-none transform rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">🏗️</div>
        </div>
      )}

      {/* Hero Moderno */}
      <div className="relative group overflow-hidden rounded-[45px] bg-slate-900 min-h-[400px] flex items-center p-8 lg:p-20 shadow-2xl animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-indigo-900/40 z-0" />
        <div className="absolute top-[-20%] right-[-10%] text-[350px] text-white/5 opacity-20 pointer-events-none select-none transform rotate-12 transition-transform duration-[3000ms] group-hover:rotate-[60deg]">
          🪁
        </div>

        <div className="relative z-10 max-w-2xl space-y-8 animate-slide-up">
           <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all cursor-default">
              <TrendingUp size={14} className="text-sky-400 animate-pulse" />
              Conectando o 3º Distrito
           </div>
           
           <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
             Gestão Digital <span className="text-sky-400 inline-block hover:scale-110 transition-transform duration-300">Marquinho</span>
           </h2>
           
           <p className="text-lg text-slate-300 font-medium leading-relaxed">
             Transparência, agilidade e compromisso direto com você morador. O canal oficial para transformar o nosso bairro.
           </p>

           <div className="flex flex-wrap gap-4 pt-4">
             <button 
               onClick={() => onNavigate('about')}
               className="px-10 py-5 bg-white text-slate-900 font-black rounded-3xl hover:bg-sky-50 transition-all flex items-center gap-3 shadow-xl shadow-white/5 active:scale-95 text-sm uppercase tracking-widest hover:translate-y-[-4px]"
             >
               CONHECER AÇÕES <ChevronRight size={18} />
             </button>
             <button 
               onClick={() => onNavigate('evaluation')}
               className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-3xl hover:bg-white/20 transition-all flex items-center gap-3 active:scale-95 text-sm uppercase tracking-widest hover:translate-y-[-4px]"
             >
               AVALIAR ATENDIMENTO
             </button>
           </div>
        </div>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id as View)}
            className={`group relative bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-sky-200 transition-all duration-500 text-left overflow-hidden animate-scale-in stagger-${idx + 1}`}
          >
            <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:translate-y-[-5px]`}>
              <card.icon size={28} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-xl mb-2 flex items-center justify-between">
              {card.title}
              <ArrowUpRight size={18} className="text-slate-300 group-hover:text-sky-500 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium transition-all group-hover:text-slate-700">
              {card.desc}
            </p>
            <div className={`absolute bottom-0 left-0 h-1 bg-sky-500 transition-all duration-500 w-0 group-hover:w-full`} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-indigo-600 to-sky-600 rounded-[45px] p-10 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                 <div className="flex items-center gap-3 mb-8">
                    <CloudSun size={24} className="text-sky-300 animate-float" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sky-100">Clima no Distrito</h3>
                 </div>
                 <div className="mb-10">
                    <p className="text-7xl font-black tracking-tighter mb-2 animate-pulse">29°</p>
                    <p className="text-lg font-bold text-sky-100">Ensolarado • Duque de Caxias</p>
                 </div>
                 <button 
                   onClick={() => onNavigate('weather')}
                   className="px-10 py-4 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/30 transition-all hover:scale-105"
                 >
                    Previsão Detalhada
                 </button>
              </div>
              <div className="text-8xl opacity-20 transform group-hover:scale-150 transition-transform duration-[2000ms]">☀️</div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[45px] p-10 text-white relative overflow-hidden flex flex-col justify-center group">
           <div className="relative z-10">
              <h4 className="text-2xl font-black mb-6 tracking-tighter italic leading-tight transition-transform group-hover:translate-x-2">
                 "Trabalhando pelo futuro do nosso 3º Distrito com transparência e pé no chão."
              </h4>
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-1 bg-sky-500 rounded-full group-hover:w-20 transition-all duration-500" />
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Vereador Marquinho</p>
              </div>
              <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center text-4xl animate-float">
                 🪁
              </div>
           </div>
           <div className="absolute top-[-20%] right-[-10%] text-[200px] text-white/5 pointer-events-none select-none group-hover:rotate-45 transition-transform duration-[3000ms]">🪁</div>
        </div>
      </div>
    </div>
  );
};
