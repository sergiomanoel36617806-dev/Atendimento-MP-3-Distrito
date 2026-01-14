
import React, { useState, useEffect } from 'react';
import { Ticket, Printer, Clock, Bell, UserCheck, ChevronRight, Play, CheckCircle2, X, Trash2, Smartphone, AlertCircle } from 'lucide-react';
import { ServiceTicket, User as UserType } from '../types';

interface ServiceTicketUIProps {
  isAdmin?: boolean;
  user?: UserType;
}

export const ServiceTicketUI: React.FC<ServiceTicketUIProps> = ({ isAdmin, user }) => {
  const [view, setView] = useState<'request' | 'admin'>(isAdmin ? 'admin' : 'request');
  const [activeTicket, setActiveTicket] = useState<ServiceTicket | null>(null);
  const [queue, setQueue] = useState<ServiceTicket[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedQueue = localStorage.getItem('mp_service_queue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }

    const myTicket = localStorage.getItem('mp_user_active_ticket');
    if (myTicket) {
      setActiveTicket(JSON.parse(myTicket));
    }
  }, []);

  // Sincronizar fila local com as mudanças
  const saveQueue = (newQueue: ServiceTicket[]) => {
    setQueue(newQueue);
    localStorage.setItem('mp_service_queue', JSON.stringify(newQueue));
  };

  const generateTicket = (category: string) => {
    const num = Math.floor(Math.random() * 900) + 100;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newTicket: ServiceTicket = {
      id: Math.random().toString(36).substr(2, 9),
      number: `${category[0].toUpperCase()}-${num}`,
      category,
      time: timeStr,
      status: 'Aguardando',
      userName: user?.name || 'Munícipe'
    };

    setActiveTicket(newTicket);
    localStorage.setItem('mp_user_active_ticket', JSON.stringify(newTicket));
    
    const newQueue = [...queue, newTicket];
    saveQueue(newQueue);
  };

  const cancelTicket = () => {
    if (activeTicket) {
      const newQueue = queue.filter(q => q.id !== activeTicket.id);
      saveQueue(newQueue);
      setActiveTicket(null);
      localStorage.removeItem('mp_user_active_ticket');
    }
  };

  const callNext = (id: string) => {
    const newQueue = queue.map(q => 
      q.id === id ? { ...q, status: 'Chamado' as const } : q
    );
    saveQueue(newQueue);
    
    // Alerta sonoro visual simulado
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(() => {});
  };

  const finishTicket = (id: string) => {
    const newQueue = queue.map(q => 
      q.id === id ? { ...q, status: 'Atendido' as const } : q
    );
    saveQueue(newQueue);
  };

  const clearQueue = () => {
    if (confirm('Deseja limpar todo o histórico de atendimento do dia?')) {
      saveQueue([]);
    }
  };

  // Filtrar apenas quem está aguardando ou foi chamado (Fila Ativa)
  const activeQueue = queue.filter(q => q.status !== 'Atendido');
  const calledTicket = activeQueue.find(q => q.status === 'Chamado');

  return (
    <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500 pb-20">
      {isAdmin && (
        <div className="flex gap-2 p-1.5 bg-slate-200 rounded-2xl w-fit mb-10 mx-auto">
          <button
            onClick={() => setView('request')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${view === 'request' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Terminal
          </button>
          <button
            onClick={() => setView('admin')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${view === 'admin' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Painel Chamador
          </button>
        </div>
      )}

      {view === 'admin' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
           {/* Painel Principal de Chamada */}
           <div className="bg-slate-900 p-10 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b-8 border-amber-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl">🛎️</div>
              <div className="text-center md:text-left relative z-10">
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">SENHA ATUAL NO PAINEL</p>
                 <h2 className="text-9xl font-black leading-none animate-pulse">
                   {calledTicket ? calledTicket.number : '---'}
                 </h2>
                 <p className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-tight">
                   {calledTicket ? `Atendimento ${calledTicket.category} • ${calledTicket.userName}` : 'Aguardando Próximo'}
                 </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center min-w-[240px] relative z-10">
                 <Bell size={48} className={`mx-auto mb-4 text-amber-500 ${calledTicket ? 'animate-bounce' : 'opacity-20'}`} />
                 <div className="space-y-3">
                    <button 
                      disabled={activeQueue.length === 0}
                      onClick={() => activeQueue[0] && callNext(activeQueue[0].id)}
                      className="w-full py-4 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-amber-400 transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       CHAMAR PRÓXIMO
                    </button>
                    <button 
                      onClick={clearQueue}
                      className="w-full py-2 text-[10px] font-black text-slate-500 hover:text-rose-500 uppercase tracking-widest transition-colors"
                    >
                      Limpar Dia
                    </button>
                 </div>
              </div>
           </div>

           {/* Lista de Espera Ordenada */}
           <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                 <div>
                    <h3 className="font-black text-xl text-slate-900">Ordens de Senha (Fila Ativa)</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gabinete Marquinho da Pipa</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-4 py-1.5 bg-sky-100 text-sky-700 text-[10px] font-black rounded-full uppercase">
                      {activeQueue.length} em espera
                    </span>
                 </div>
              </div>
              <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
                 {activeQueue.length > 0 ? activeQueue.map((q, i) => (
                   <div key={q.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-8">
                         <div className="w-16 text-center border-r border-slate-100 pr-8">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Posição {i+1}</p>
                            <p className="text-xl font-black text-slate-900">{q.number}</p>
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{q.category} • <span className="text-sky-600">{q.userName}</span></p>
                            <div className="flex items-center gap-2 mt-1">
                               <Clock size={12} className="text-slate-300" />
                               <span className="text-[10px] font-bold text-slate-400 uppercase">{q.time}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                           q.status === 'Chamado' ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse' : 'bg-slate-50 text-slate-400 border-slate-100'
                         }`}>
                           {q.status}
                         </span>
                         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {q.status === 'Aguardando' ? (
                              <button 
                                onClick={() => callNext(q.id)}
                                className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 shadow-md transition-all active:scale-95"
                              >
                                 <Play size={18} fill="currentColor" />
                              </button>
                            ) : (
                              <button 
                                onClick={() => finishTicket(q.id)}
                                className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-md transition-all active:scale-95"
                              >
                                 <UserCheck size={18} />
                              </button>
                            )}
                         </div>
                      </div>
                   </div>
                 )) : (
                   <div className="p-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">
                      Nenhuma senha na fila no momento
                   </div>
                 )}
              </div>
           </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {!activeTicket ? (
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100 text-center relative overflow-hidden group">
              <div className="w-24 h-24 bg-sky-500 text-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sky-100 transform -rotate-6 group-hover:rotate-0 transition-transform animate-float">
                <Ticket size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Retirar Senha</h2>
              <p className="text-slate-500 font-medium mb-12 italic">Selecione o serviço para entrar na fila digital.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {[
                  { id: 'Geral', icon: '📋', desc: 'Dúvidas e Orientações' },
                  { id: 'Social', icon: '🤝', desc: 'Auxílios e Benefícios' },
                  { id: 'Saúde', icon: '⚕️', desc: 'Encaminhamentos' },
                  { id: 'Jurídico', icon: '⚖️', desc: 'Consultoria Gratuita' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => generateTicket(cat.id)}
                    className="p-8 bg-slate-50 border-2 border-slate-50 rounded-[35px] hover:border-sky-500 hover:bg-sky-50 transition-all text-left group shadow-sm active:scale-95"
                  >
                    <span className="block text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight group-hover:text-sky-600 transition-colors">{cat.id}</h3>
                    <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{cat.desc}</p>
                  </button>
                ))}
              </div>
              <div className="absolute top-[-20%] left-[-20%] text-[400px] opacity-5 pointer-events-none select-none transform -rotate-12">🪁</div>
            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="bg-slate-900 p-12 rounded-[50px] flex flex-col items-center shadow-2xl border-b-8 border-sky-500 relative">
                <div className="bg-white w-full max-w-[360px] rounded-[40px] shadow-2xl p-10 relative overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 left-0 w-full h-3 bg-sky-500"></div>
                  
                  <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-6">SENHA SALVA NO DISPOSITIVO</p>
                  <div className="text-sky-500 text-4xl mb-6 animate-float">🪁</div>
                  
                  <h2 className="text-8xl font-black text-slate-900 mb-2 leading-none">{activeTicket.number}</h2>
                  <p className="font-black text-sky-600 text-xl mb-6 tracking-widest uppercase">{activeTicket.category}</p>
                  
                  <div className={`px-6 py-2 rounded-full text-xs font-black uppercase mb-10 transition-colors ${
                    activeTicket.status === 'Chamado' ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                    Status: {activeTicket.status === 'Chamado' ? '🛎️ CHAMANDO AGORA!' : '⌛ AGUARDANDO VEZ'}
                  </div>

                  <div className="w-full pt-8 border-t-4 border-dashed border-slate-100 flex justify-between items-center text-slate-400">
                    <div className="flex items-center gap-2 text-xs font-black">
                      <Clock size={16} className="text-sky-400" /> {activeTicket.time}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-tighter">3º Distrito Digital</div>
                  </div>

                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 rounded-full"></div>
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 rounded-full"></div>
                </div>

                {activeTicket.status === 'Chamado' && (
                  <div className="mt-8 bg-amber-500 text-slate-900 p-6 rounded-3xl border border-amber-400 flex items-center gap-4 animate-bounce">
                    <Bell size={24} className="animate-pulse" />
                    <p className="font-black uppercase text-sm tracking-tight">Dirija-se ao balcão de atendimento!</p>
                  </div>
                )}

                <div className="mt-12 flex gap-4 w-full max-w-[360px]">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-4 bg-white/10 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all uppercase text-xs tracking-widest"
                  >
                    <Printer size={18} /> Imprimir
                  </button>
                  <button 
                    onClick={cancelTicket}
                    className="flex-1 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 transition-all shadow-lg uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Desistir
                  </button>
                </div>
                
                <div className="mt-8 flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                   <Smartphone size={16} className="text-sky-400" />
                   <p className="text-[10px] text-sky-100/60 font-medium uppercase tracking-widest">Sua senha está salva. Não feche o app.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
