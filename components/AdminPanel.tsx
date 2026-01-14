
import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  AlertCircle, 
  BarChart3, 
  Search, 
  Plus, 
  Trash2, 
  Ticket, 
  UserPlus, 
  Calendar, 
  ShieldAlert, 
  Save, 
  Edit2, 
  FileText, 
  Settings, 
  Zap,
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import { Person } from '../types';

interface AdminPanelProps {
  people: Person[];
  onDeletePerson: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ people, onDeletePerson }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'people' | 'jobs' | 'occurrences' | 'settings'>('stats');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const filteredPeople = people.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm) ||
    p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Admin Title Bar */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
           <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-[20px] flex items-center justify-center shadow-xl shadow-slate-200 border-2 border-amber-500/30">
                <ShieldAlert size={28} />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Console de Gestão</h2>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mt-2">MP Atendimento • Gabinete Digital</p>
              </div>
           </div>
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-3xl border border-slate-200">
          {[
            { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
            { id: 'people', label: 'Munícipes', icon: Users },
            { id: 'jobs', label: 'Empregos', icon: Briefcase },
            { id: 'occurrences', label: 'Fiscalização', icon: AlertCircle },
            { id: 'settings', label: 'Ajustes', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id 
                ? 'bg-white text-sky-600 shadow-xl shadow-slate-200 border border-slate-100' 
                : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Board */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <StatCard title="Total Cadastrados" value={people.length.toString()} trend="+ Nova base" icon={Users} color="bg-blue-600" />
           <StatCard title="Senhas Emitidas" value="472" trend="+5%" icon={Ticket} color="bg-emerald-600" />
           <StatCard title="Ocorrências" value="12" trend="-15%" icon={AlertCircle} color="bg-amber-600" />
           <StatCard title="Uptime Sistema" value="99.9%" trend="Estável" icon={Zap} color="bg-indigo-600" />

           <div className="lg:col-span-3 bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Fluxo de Atendimento</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Dados das últimas 24 horas</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-sky-600 transition-colors"><ListFilter size={20} /></button>
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-sky-600 transition-colors"><LayoutGrid size={20} /></button>
                 </div>
              </div>
              
              <div className="space-y-6">
                 {[
                   { label: 'Santa Cruz da Serra', val: 78, col: 'bg-sky-500' },
                   { label: 'Imbariê', val: 62, col: 'bg-indigo-500' },
                   { label: 'Parada Angélica', val: 45, col: 'bg-amber-500' },
                   { label: 'Chácara Rio-Petrópolis', val: 30, col: 'bg-slate-200' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">
                         <span>{item.label}</span>
                         <span>{item.val}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full ${item.col} transition-all duration-1000 ease-out w-0 group-hover:w-[${item.val}%]`} style={{ width: `${item.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[45px] p-10 text-white relative flex flex-col justify-between shadow-2xl">
              <div className="space-y-6">
                 <h3 className="text-xl font-black leading-tight">Relatórios de Mandato</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">Gere arquivos em PDF ou XLSX para prestação de contas do mandato.</p>
              </div>
              <button className="w-full py-5 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-3xl transition-all shadow-xl shadow-sky-900/50 flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                 <Save size={18} /> DOWNLOAD RELATÓRIO
              </button>
           </div>
        </div>
      )}

      {/* People Management Table */}
      {activeTab === 'people' && (
        <div className="bg-white rounded-[45px] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-emerald-500 text-white rounded-[22px] flex items-center justify-center shadow-xl shadow-emerald-100">
                   <Users size={28} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Banco de Munícipes</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Dados Sincronizados em Tempo Real</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="text" 
                      placeholder="Nome, CPF ou Bairro..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-14 pr-8 py-4 w-full md:w-96 bg-white border border-slate-200 rounded-3xl text-sm font-bold outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm" 
                    />
                 </div>
                 <button className="p-4 bg-emerald-500 text-white rounded-3xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                    <UserPlus size={24} />
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50/50">
                   <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Identificação</th>
                   <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Bairro / Local</th>
                   <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Contato</th>
                   <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Controle</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {filteredPeople.map((p) => (
                   <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-black text-sm">
                             {p.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                             <p className="text-[15px] font-black text-slate-900 leading-none mb-2">{p.fullName}</p>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{p.cpf}</p>
                          </div>
                       </div>
                     </td>
                     <td className="px-10 py-8">
                        <span className="px-4 py-2 bg-slate-100 text-slate-600 text-[11px] font-black uppercase rounded-xl border border-slate-200">{p.neighborhood}</span>
                     </td>
                     <td className="px-10 py-8">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-600">{p.phone}</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verificado</span>
                        </div>
                     </td>
                     <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                           <button onClick={() => setSelectedPerson(p)} title="Ver Detalhes" className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all shadow-sm">
                              <FileText size={18} />
                           </button>
                           <button onClick={() => onDeletePerson(p.id)} title="Remover Cadastro" className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-300 transition-all shadow-sm">
                              <Trash2 size={18} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
                 {filteredPeople.length === 0 && (
                   <tr>
                     <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-black uppercase text-xs tracking-[0.2em]">
                       Nenhum registro encontrado no banco de dados.
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: any;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:shadow-2xl transition-all">
    <div className="flex items-start justify-between mb-8">
      <div className={`w-14 h-14 ${color} text-white rounded-[20px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  </div>
);
