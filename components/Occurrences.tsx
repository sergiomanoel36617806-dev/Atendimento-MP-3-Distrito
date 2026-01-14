
import React, { useState } from 'react';
import { AlertTriangle, MapPin, Send, History, CheckCircle2, X, Save, Settings2, Clock, AlertCircle } from 'lucide-react';
import { Occurrence } from '../types';

interface OccurrencesProps {
  isAdmin?: boolean;
}

export const Occurrences: React.FC<OccurrencesProps> = ({ isAdmin }) => {
  const [tab, setTab] = useState<'report' | 'history'>('report');
  const [type, setType] = useState('Iluminação');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  
  const [history, setHistory] = useState<Occurrence[]>([
    { id: '1', type: 'Buraco', address: 'Rua das Pipas, 120', status: 'Pendente', date: '20/10/2023', description: 'Buraco enorme próximo ao bueiro.' },
    { id: '2', type: 'Iluminação', address: 'Av. Principal, 400', status: 'Concluido', date: '15/10/2023', description: 'Poste apagado há 3 dias.' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    
    const newOccurrence: Occurrence = {
      id: Math.random().toString(36).substr(2, 9),
      type: type as any,
      address,
      description,
      status: 'Pendente',
      date: new Date().toLocaleDateString('pt-BR')
    };

    setHistory(prev => [newOccurrence, ...prev]);
    
    setTimeout(() => {
      setIsSuccess(false);
      setAddress('');
      setDescription('');
      setTab('history');
    }, 2000);
  };

  const handleUpdateStatus = (id: string, newStatus: Occurrence['status']) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    setSelectedOccurrence(null);
  };

  const getStatusColor = (status: Occurrence['status']) => {
    switch (status) {
      case 'Concluido': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Em Analise': return 'bg-sky-50 text-sky-600 border-sky-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 relative pb-20">
      {isSuccess && (
        <div className="fixed inset-0 bg-sky-600/90 z-[60] flex flex-col items-center justify-center text-white animate-in zoom-in duration-300">
          <CheckCircle2 size={80} className="mb-4" />
          <h3 className="text-3xl font-black mb-2">Relato Enviado!</h3>
          <p className="text-sky-100 font-medium">O Gabinete do Marquinho foi notificado.</p>
        </div>
      )}

      {/* Modal de Gerenciamento do Admin */}
      {selectedOccurrence && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[45px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 text-amber-500 rounded-2xl flex items-center justify-center">
                       <Settings2 size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Gerenciar Protocolo</h3>
                 </div>
                 <button onClick={() => setSelectedOccurrence(null)} className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                   <X size={20} />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Resumo da Ocorrência</p>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                       <h4 className="font-black text-slate-900 mb-1">{selectedOccurrence.type}</h4>
                       <p className="text-sm text-slate-500 leading-relaxed italic">"{selectedOccurrence.description}"</p>
                       <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-sky-600 uppercase">
                          <MapPin size={12} /> {selectedOccurrence.address}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Alterar Status Atual</p>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                         { id: 'Pendente', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                         { id: 'Em Analise', icon: AlertCircle, color: 'text-sky-500', bg: 'bg-sky-50' },
                         { id: 'Concluido', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                       ].map((statusOption) => (
                         <button
                           key={statusOption.id}
                           onClick={() => handleUpdateStatus(selectedOccurrence.id, statusOption.id as any)}
                           className={`
                             w-full flex items-center justify-between p-5 rounded-[22px] border-2 transition-all group
                             ${selectedOccurrence.status === statusOption.id 
                               ? 'border-slate-900 bg-white' 
                               : 'border-transparent bg-slate-50 hover:bg-white hover:border-slate-200'}
                           `}
                         >
                            <div className="flex items-center gap-4">
                               <div className={`w-10 h-10 ${statusOption.bg} ${statusOption.color} rounded-xl flex items-center justify-center`}>
                                  <statusOption.icon size={20} />
                               </div>
                               <span className={`text-sm font-black uppercase tracking-tight ${selectedOccurrence.status === statusOption.id ? 'text-slate-900' : 'text-slate-500'}`}>
                                  {statusOption.id}
                               </span>
                            </div>
                            {selectedOccurrence.status === statusOption.id && <div className="w-3 h-3 bg-slate-900 rounded-full" />}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                  onClick={() => setSelectedOccurrence(null)}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                 >
                    Fechar e Sincronizar
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Ocorrências Comunitárias</h2>
           <p className="text-slate-500 font-medium">Fiscalização ativa do 3º Distrito com Marquinho da Pipa.</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-[20px] w-fit border border-slate-200">
          <button
            onClick={() => setTab('report')}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === 'report' ? 'bg-white shadow-xl text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Novo Relato
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === 'history' ? 'bg-white shadow-xl text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Monitoramento
          </button>
        </div>
      </div>

      {tab === 'report' ? (
        <div className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100 overflow-hidden relative group">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-amber-100 transform -rotate-3 group-hover:rotate-0 transition-transform">
              <AlertTriangle size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Informar Problema</h3>
               <p className="text-sm text-slate-400 font-medium leading-none mt-1">Marquinho e sua equipe entrarão em ação.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest px-1">Categoria do Problema</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-6 py-4.5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none font-bold text-slate-700 transition-all appearance-none shadow-sm"
                >
                  <option>Iluminação Pública</option>
                  <option>Buraco / Pavimentação</option>
                  <option>Limpeza / Coleta de Lixo</option>
                  <option>Saneamento / Esgoto</option>
                  <option>Poda de Árvores</option>
                  <option>Outros Assuntos</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest px-1">Localização Exata</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, Número e Bairro"
                    className="pl-14 pr-6 py-4.5 w-full rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-bold text-slate-700 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest px-1">Descrição Detalhada</label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte-nos o que está acontecendo..."
                className="w-full px-6 py-5 rounded-[35px] bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-medium text-slate-700 transition-all resize-none shadow-sm"
              />
            </div>

            <div className="p-8 bg-sky-50 rounded-[40px] border border-sky-100 flex items-start gap-5">
              <div className="text-3xl filter drop-shadow-lg">🪁</div>
              <div>
                 <p className="text-base font-black text-sky-900 mb-1 leading-tight">Canal Direto com o Gabinete</p>
                 <p className="text-sm text-sky-700/70 leading-relaxed font-medium">
                   Seu relato será protocolado e acompanhado pela equipe do mandato. Você poderá monitorar o progresso na aba de monitoramento.
                 </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-[28px] shadow-2xl shadow-sky-100 flex items-center justify-center gap-3 transition-all transform active:scale-95 uppercase tracking-widest text-xs"
            >
              PROTOCOLAR SOLICITAÇÃO <Send size={20} />
            </button>
          </form>
          
          <div className="absolute -bottom-20 -right-20 text-[250px] opacity-[0.03] select-none pointer-events-none transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">🪁</div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start gap-8 group hover:border-sky-200 transition-all hover:shadow-xl hover:shadow-slate-100/50">
              <div className={`p-6 rounded-[28px] flex-shrink-0 transition-transform group-hover:scale-105 duration-500 ${item.status === 'Concluido' ? 'bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-50' : item.status === 'Em Analise' ? 'bg-sky-100 text-sky-600 shadow-lg shadow-sky-50' : 'bg-amber-100 text-amber-600 shadow-lg shadow-amber-50'}`}>
                {item.status === 'Concluido' ? <History size={32} /> : item.status === 'Em Analise' ? <AlertCircle size={32} /> : <AlertTriangle size={32} />}
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                     <h3 className="font-black text-slate-900 text-xl tracking-tight leading-none mb-2">{item.type}</h3>
                     <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <MapPin size={14} className="text-sky-400" /> {item.address}
                     </div>
                  </div>
                  <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border self-start lg:self-center transition-colors ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6 italic">"{item.description}"</p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <Clock size={12} /> PROTOCOLADO EM {item.date}
                   </div>
                   {isAdmin && (
                     <button 
                       onClick={() => setSelectedOccurrence(item)}
                       className="px-6 py-2.5 bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-slate-200"
                     >
                       <Settings2 size={14} /> Gerenciar Protocolo
                     </button>
                   )}
                </div>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[50px] border-4 border-dashed border-slate-100 flex flex-col items-center">
               <div className="text-6xl mb-6 opacity-20">🗂️</div>
               <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Nenhum protocolo ativo encontrado</p>
               <button onClick={() => setTab('report')} className="mt-6 text-sky-600 text-xs font-black uppercase tracking-widest hover:underline">Abrir Primeira Ocorrência</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
