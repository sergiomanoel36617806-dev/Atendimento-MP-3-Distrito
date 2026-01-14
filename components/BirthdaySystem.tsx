
import React, { useState, useMemo } from 'react';
import { Cake, Smartphone, Send, Settings, CheckCircle, BellRing, User, CalendarDays, Gift } from 'lucide-react';
import { Person } from '../types';

interface BirthdaySystemProps {
  people: Person[];
}

export const BirthdaySystem: React.FC<BirthdaySystemProps> = ({ people }) => {
  const [isActive, setIsActive] = useState(true);
  const [template, setTemplate] = useState('Olá {nome}! O Vereador Marquinho da Pipa e toda equipe do 3º Distrito desejam a você um Feliz Aniversário! Muita saúde, paz e realizações. Conte sempre conosco! 🪁🎈');
  const [isSending, setIsSending] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Lógica para detectar aniversariantes de HOJE
  const todayBirthdays = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();

    return people.filter(p => {
      if (!p.birthDate) return false;
      const [year, month, day] = p.birthDate.split('-').map(Number);
      return month === currentMonth && day === currentDay;
    });
  }, [people]);

  const handleSimulateDispatch = () => {
    if (todayBirthdays.length === 0) return;
    
    setIsSending(true);
    // Simulação de delay de envio
    setTimeout(() => {
      setIsSending(false);
      setDispatchSuccess(true);
      setTimeout(() => setDispatchSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Festivo */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-rose-100 group">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float">
              <Cake size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter">Central de Aniversários</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Gabinete de Relações Comunitárias</p>
            </div>
          </div>
          <p className="text-rose-50 max-w-lg mb-8 font-medium leading-relaxed">
            Sincronização automática com o banco de dados. Envie mensagens personalizadas via SMS para os moradores do 3º Distrito em seus dias especiais.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl ${
                isActive ? 'bg-white text-rose-600' : 'bg-rose-700 text-rose-200'
              } active:scale-95`}
            >
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
              {isActive ? 'Serviço Ativo' : 'Serviço Pausado'}
            </button>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center gap-3 text-xs font-bold">
               <Smartphone size={18} className="text-amber-300" /> 
               Gateway MP Digital 🪁
            </div>
          </div>
        </div>
        <div className="absolute top-[-10%] right-[-5%] text-[200px] opacity-10 transform -rotate-12 select-none group-hover:rotate-0 transition-transform duration-1000">🎂</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Aniversariantes de Hoje */}
          <div className="bg-white rounded-[45px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center">
                      <Gift size={24} />
                   </div>
                   <h3 className="font-black text-xl text-slate-900">Aniversariantes de Hoje</h3>
                </div>
                <span className="px-4 py-1.5 bg-rose-100 text-rose-600 text-[10px] font-black rounded-full uppercase">
                   {todayBirthdays.length} Munícipes
                </span>
             </div>
             
             <div className="p-8">
                {todayBirthdays.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {todayBirthdays.map((p) => (
                       <div key={p.id} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-4 group hover:border-rose-300 transition-all">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 font-black border border-rose-100 shadow-sm">
                             {p.fullName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                             <p className="text-sm font-black text-slate-900 truncate">{p.fullName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase">{p.phone}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                     <div className="text-5xl mb-4 opacity-10">📅</div>
                     <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Nenhum aniversário para hoje no banco de dados</p>
                  </div>
                )}
             </div>

             {todayBirthdays.length > 0 && (
               <div className="p-8 bg-slate-900 border-t border-slate-800">
                  <button 
                    disabled={isSending || !isActive}
                    onClick={handleSimulateDispatch}
                    className={`
                      w-full py-5 rounded-[28px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-sky-900/50
                      ${dispatchSuccess ? 'bg-emerald-500 text-white' : 'bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50'}
                    `}
                  >
                    {isSending ? (
                      <>PROCESSANDO DISPARO...</>
                    ) : dispatchSuccess ? (
                      <><CheckCircle size={20} /> MENSAGENS ENVIADAS!</>
                    ) : (
                      <><Send size={18} /> DISPARAR SMS PARA TODOS DE HOJE</>
                    )}
                  </button>
               </div>
             )}
          </div>

          {/* Configuração do Template */}
          <div className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-100 relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                <Settings size={22} className="text-slate-400 group-hover:rotate-90 transition-transform duration-500" /> 
                Template de Mensagem Automática
              </h3>
              <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full uppercase border border-sky-100">SMS Oficial</span>
            </div>
            
            <div className="space-y-6">
              <textarea
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full p-6 rounded-[35px] bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 outline-none transition-all resize-none text-slate-700 font-medium leading-relaxed min-h-[160px] shadow-inner"
                placeholder="Escreva a mensagem de aniversário..."
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest px-2">
                <p className="text-slate-400">Variável disponível: <span className="text-rose-500 font-mono">{"{nome}"}</span></p>
                <p className={`${template.length > 140 ? 'text-amber-500' : 'text-slate-400'}`}>{template.length} / 160 caracteres</p>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 text-xs tracking-widest uppercase">
                SALVAR CONFIGURAÇÃO <CheckCircle size={18} className="text-emerald-400" />
              </button>
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] text-9xl opacity-[0.02] pointer-events-none transform rotate-12">🪁</div>
          </div>
        </div>

        {/* Sidebar de Status */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
              <BellRing size={22} className="text-rose-500 animate-pulse" /> Painel de Controle
            </h3>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                     <User size={18} className="text-slate-300" />
                     <span className="text-xs font-black text-slate-400 uppercase">Base de Dados</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{people.length}</span>
               </div>
               
               <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-3">
                     <CalendarDays size={18} className="text-rose-400" />
                     <span className="text-xs font-black text-rose-400 uppercase">Aniversários Hoje</span>
                  </div>
                  <span className="text-sm font-black text-rose-600">{todayBirthdays.length}</span>
               </div>
            </div>

            <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white text-center">
               <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-2">Próximo Ciclo de Envio</p>
               <p className="text-2xl font-black">08:00 AM</p>
               <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Sincronizado com Horário Local</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[45px] text-white shadow-2xl relative overflow-hidden text-center group">
             <div className="relative z-10">
                <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-500">🎈</div>
                <h4 className="font-black text-xl mb-4 tracking-tight leading-tight uppercase text-sky-400">Compromisso Marquinho</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                   "Pequenos gestos constroem grandes comunidades. Cada munícipe é importante para nós."
                </p>
             </div>
             <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl">🪁</div>
          </div>
        </div>
      </div>
    </div>
  );
};
