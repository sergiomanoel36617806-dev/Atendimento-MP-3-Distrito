
import React, { useState } from 'react';
import { HardHat, Send, MapPin, History, CheckCircle2, ShieldAlert, X, Smartphone, Construction } from 'lucide-react';
import { WorkAlert } from '../types';

interface WorksAlertsProps {
  works: WorkAlert[];
  onSendAlert: (work: WorkAlert) => void;
  isAdmin: boolean;
}

export const WorksAlerts: React.FC<WorksAlertsProps> = ({ works, onSendAlert, isAdmin }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    neighborhood: 'Santa Cruz da Serra',
    description: '',
    status: 'Iniciada' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWork: WorkAlert = {
      id: Math.random().toString(36).substr(2, 9),
      neighborhood: formData.neighborhood,
      description: formData.description,
      startDate: new Date().toLocaleDateString('pt-BR'),
      status: formData.status
    };
    onSendAlert(newWork);
    setShowForm(false);
    setFormData({ neighborhood: 'Santa Cruz da Serra', description: '', status: 'Iniciada' });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Obras e Infraestrutura</h2>
           <p className="text-slate-500 font-medium">Alertas automáticos via SMS para moradores do 3º Distrito.</p>
        </div>
        {isAdmin && (
           <button 
             onClick={() => setShowForm(true)}
             className="px-8 py-4 bg-slate-900 text-amber-400 font-black rounded-3xl hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs"
           >
             <Construction size={18} /> NOVO ALERTA DE OBRA
           </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[45px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 text-sky-400 rounded-2xl flex items-center justify-center">
                       <Smartphone size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900">Disparo de Alerta SMS</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronizado com Munícipes</p>
                    </div>
                 </div>
                 <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                   <X size={20} className="text-slate-400" />
                 </button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                 <div className="space-y-4">
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Bairro Alvo (Geofencing)</label>
                       <select 
                         value={formData.neighborhood}
                         onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                         className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-bold text-slate-700"
                       >
                         <option>Santa Cruz da Serra</option>
                         <option>Imbariê</option>
                         <option>Parada Angélica</option>
                         <option>Chácara Rio-Petrópolis</option>
                         <option>Vila Maria Helena</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Mensagem do SMS (Até 160 caracteres)</label>
                       <textarea 
                         required
                         rows={4}
                         maxLength={160}
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                         placeholder="Ex: Atenção! Obras de pavimentação iniciam amanhã na Rua Principal. Evite estacionar no local."
                         className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-medium text-slate-700 resize-none"
                       />
                       <p className="text-[9px] text-right font-black text-slate-300 uppercase mt-1">{formData.description.length}/160 caracteres</p>
                    </div>
                 </div>

                 <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
                    <ShieldAlert size={20} className="text-amber-500 flex-shrink-0" />
                    <p className="text-[11px] text-amber-800 font-bold leading-relaxed uppercase">
                       Ao salvar, o sistema enviará AUTOMATICAMENTE um SMS para todos os munícipes cadastrados neste bairro.
                    </p>
                 </div>

                 <button type="submit" className="w-full py-6 bg-sky-500 text-white font-black rounded-[28px] hover:bg-sky-600 transition-all shadow-xl shadow-sky-100 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    ENVIAR SMS AGORA <Send size={18} />
                 </button>
              </form>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {works.length > 0 ? works.map((work) => (
           <div key={work.id} className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-sky-100 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl group-hover:rotate-12 transition-transform duration-700">🏗️</div>
              
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <HardHat size={28} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">{work.neighborhood}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <MapPin size={12} className="text-sky-400" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Obra Ativo</span>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 italic">
                 <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    "{work.description}"
                 </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-emerald-500" /> STATUS: {work.status}
                 </div>
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Início: {work.startDate}</span>
              </div>
           </div>
         )) : (
           <div className="col-span-full py-32 bg-white rounded-[50px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center">
              <div className="text-7xl mb-6 opacity-10">🏗️</div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Nenhum alerta de obra registrado</p>
           </div>
         )}
      </div>
    </div>
  );
};
