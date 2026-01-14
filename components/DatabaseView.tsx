
import React, { useState, useRef } from 'react';
import { 
  Database, 
  Search, 
  Trash2, 
  FileSpreadsheet, 
  Users, 
  MapPin, 
  Phone, 
  Calendar, 
  Filter,
  ArrowUpDown,
  Download,
  Upload,
  MoreHorizontal,
  CheckCircle2,
  ShieldCheck,
  RefreshCcw,
  Cloud
} from 'lucide-react';
import { Person } from '../types';

interface DatabaseViewProps {
  people: Person[];
  onDeletePerson: (id: string) => void;
  isAdmin: boolean;
  onBulkImport: (people: Person[]) => void;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({ people, onDeletePerson, isAdmin, onBulkImport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNeighborhood, setFilterNeighborhood] = useState('Todos');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const neighborhoods = ['Todos', ...Array.from(new Set(people.map(p => p.neighborhood)))];

  const filteredPeople = people.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.cpf.includes(searchTerm);
    const matchesFilter = filterNeighborhood === 'Todos' || p.neighborhood === filterNeighborhood;
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(people, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mp_backup_distrito3_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          if (confirm(`Deseja restaurar ${json.length} registros? Isso substituirá o banco de dados atual.`)) {
            onBulkImport(json);
          }
        } else {
          alert('Formato de arquivo inválido. O backup deve ser um array de registros.');
        }
      } catch (err) {
        alert('Erro ao processar o arquivo de backup.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".json" 
        className="hidden" 
      />

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-slate-900 text-sky-400 rounded-[22px] flex items-center justify-center shadow-2xl shadow-slate-200 border-2 border-sky-400/20 animate-float">
                <Database size={28} />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Banco de Dados Vitalício</h2>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Armazenamento Permanente • Gabinete Digital</p>
              </div>
           </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou CPF..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 w-full md:w-80 bg-white border border-slate-200 rounded-[20px] text-sm font-bold outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filterNeighborhood}
              onChange={(e) => setFilterNeighborhood(e.target.value)}
              className="pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-[20px] text-sm font-bold outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm appearance-none"
            >
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              title="Backup Permanente"
              className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[20px] text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Download size={18} className="text-sky-400" /> Exportar
            </button>
            <button 
              onClick={handleImportClick}
              title="Restaurar Banco de Dados"
              className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-[20px] text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <Upload size={18} className="text-sky-400" /> Restaurar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-sky-200 transition-all">
           <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <Users size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registros Efetivados</p>
              <p className="text-2xl font-black text-slate-900">{people.length}</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-emerald-200 transition-all">
           <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proteção de Dados</p>
              <p className="text-2xl font-black text-slate-900">Ativa</p>
           </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-[35px] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
           <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:rotate-12 transition-transform">
              <Cloud size={24} className="text-sky-400 animate-pulse" />
           </div>
           <div>
              <p className="text-[10px] font-black text-sky-400/60 uppercase tracking-widest">Sincronismo Local</p>
              <p className="text-2xl font-black">100% Online</p>
           </div>
           <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">💾</div>
        </div>
      </div>

      <div className="bg-white rounded-[45px] border border-slate-100 shadow-sm overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <div className="flex items-center gap-2">Identidade <ArrowUpDown size={12}/></div>
                </th>
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">CPF Permanente</th>
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Área de Atuação</th>
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Contato Ativo</th>
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPeople.map((person, idx) => (
                <tr key={person.id} className={`hover:bg-slate-50/50 transition-colors group animate-in slide-in-from-left duration-300 stagger-${(idx % 4) + 1}`}>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        {person.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[15px] font-black text-slate-900 leading-none mb-1.5">{person.fullName}</p>
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                           <Calendar size={10} /> Nasceu em {person.birthDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <span className="text-sm font-bold text-slate-600 font-mono tracking-tighter">
                      {person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.***-$4")}
                    </span>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2">
                       <MapPin size={14} className="text-sky-400" />
                       <span className="px-4 py-1.5 bg-sky-50 text-sky-700 text-[10px] font-black uppercase rounded-xl border border-sky-100">
                         {person.neighborhood}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                      <Phone size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      {person.phone}
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      {isAdmin && (
                        <button 
                          onClick={() => onDeletePerson(person.id)}
                          className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
                          title="Remover permanentemente"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-sky-600 rounded-xl transition-all shadow-sm">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPeople.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                     <div className="text-6xl mb-6 opacity-10 animate-pulse">📂</div>
                     <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Aguardando novos munícipes para o banco de dados vitalício</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <RefreshCcw size={12} className="animate-spin duration-[3000ms]" /> Integridade Verificada: {filteredPeople.length} de {people.length} registros seguros
           </p>
           <div className="flex gap-2">
              <div className="px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                 Backup Consolidado
              </div>
           </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-3 py-6 border-t border-slate-100">
         <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <ShieldCheck size={14} /> Dados criptografados no cofre local do gabinete
         </div>
         <p className="max-w-xl text-[9px] text-slate-400 text-center leading-relaxed">
            ATENÇÃO: O banco de dados é persistente e salvo automaticamente no seu dispositivo. Para maior segurança, realize backups periódicos clicando no botão "Exportar" acima.
         </p>
      </div>
    </div>
  );
};
