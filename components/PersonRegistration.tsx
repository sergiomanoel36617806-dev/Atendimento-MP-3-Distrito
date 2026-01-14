
import React, { useState } from 'react';
import { UserPlus, Save, CheckCircle, Search, Users, ShieldCheck, Database, Trash2 } from 'lucide-react';
import { Person } from '../types';

interface PersonRegistrationProps {
  isAdmin?: boolean;
  people: Person[];
  onRegister: (person: Person) => void;
}

export const PersonRegistration: React.FC<PersonRegistrationProps> = ({ isAdmin, people, onRegister }) => {
  const [view, setView] = useState<'form' | 'list'>(isAdmin ? 'list' : 'form');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    neighborhood: 'Imbariê',
    phone: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPerson: Person = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    };

    onRegister(newPerson);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: '',
        cpf: '',
        birthDate: '',
        neighborhood: 'Imbariê',
        phone: ''
      });
      if (isAdmin) setView('list');
    }, 2000);
  };

  const filteredPeople = people.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm) ||
    p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
      {isAdmin && (
        <div className="flex gap-2 p-1.5 bg-slate-200 rounded-2xl w-fit mb-8 mx-auto">
          <button
            onClick={() => setView('form')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${view === 'form' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Novo Cadastro
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${view === 'list' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Lista de Munícipes
          </button>
        </div>
      )}

      {view === 'form' ? (
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
          {isSuccess && (
            <div className="absolute inset-0 bg-emerald-500/95 z-50 flex flex-col items-center justify-center text-white animate-in zoom-in duration-300">
              <CheckCircle size={80} className="mb-4" />
              <h3 className="text-3xl font-black mb-2">Cadastro Realizado!</h3>
              <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs">Ficha integrada ao banco MP</p>
            </div>
          )}

          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-emerald-100 transform -rotate-3">
              <UserPlus size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ficha Cadastral MP</h2>
              <p className="text-sm text-slate-400 font-medium">Cadastre moradores para benefícios e alertas comunitários.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Nome Completo do Munícipe</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-sm" 
                  placeholder="Nome sem abreviações" 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">CPF (Apenas números)</label>
                <input 
                  type="text" 
                  required
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-sm" 
                  placeholder="000.000.000-00" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Data de Nascimento</label>
                <input 
                  type="date" 
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-sm" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Bairro do 3º Distrito</label>
                <select 
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-sm appearance-none"
                >
                  <option>Imbariê</option>
                  <option>Parada Angélica</option>
                  <option>Santa Cruz da Serra</option>
                  <option>Chácara Rio-Petrópolis</option>
                  <option>Vila Maria Helena</option>
                  <option>Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Telefone Principal (Celular)</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-sm" 
                  placeholder="(21) 99999-9999" 
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-[30px] border border-slate-100 flex items-center gap-4 group cursor-pointer">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="w-6 h-6 rounded-lg border-slate-300 text-emerald-500 focus:ring-emerald-500 transition-all" 
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed font-medium group-hover:text-slate-700 transition-colors">
                Estou ciente que meus dados serão utilizados pelo gabinete do Vereador Marquinho da Pipa para fins de assistência social, alertas comunitários e envio de mensagens de aniversário automáticas.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-3xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all transform active:scale-95 tracking-widest uppercase text-sm"
            >
              SALVAR NO BANCO DE DADOS <Save size={20} />
            </button>
          </form>
          <div className="absolute top-[-20%] right-[-10%] opacity-5 text-[300px] select-none pointer-events-none">🪁</div>
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
           <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Database size={24} />
                 </div>
                 <div>
                    <h3 className="font-black text-xl text-slate-900">Base de Munícipes</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sincronizado com Banco de Dados</p>
                 </div>
              </div>
              <div className="relative">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Buscar munícipe..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500 text-sm md:w-64" 
                 />
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {filteredPeople.map(person => (
                <div key={person.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-sky-200 transition-all group">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xs font-black text-sky-600 border border-sky-100 shadow-sm">
                         {person.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                         <h4 className="font-black text-slate-900 text-sm truncate">{person.fullName}</h4>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{person.neighborhood}</p>
                      </div>
                   </div>
                   <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-slate-400 uppercase">CPF:</span>
                         <span className="text-slate-600">{person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.***-$4")}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-slate-400 uppercase">Telefone:</span>
                         <span className="text-slate-600">{person.phone}</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-400 hover:text-sky-600 hover:border-sky-200 rounded-xl text-[10px] font-black uppercase transition-all">Ver Detalhes</button>
                      <button className="px-3 py-2 bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 rounded-xl transition-all">
                         <ShieldCheck size={14} />
                      </button>
                   </div>
                </div>
              ))}
              {filteredPeople.length === 0 && (
                <div className="col-span-full py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                   Nenhum cadastro encontrado na busca.
                </div>
              )}
           </div>
           
           {people.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total de {people.length} Munícipes Cadastrados</p>
            </div>
           )}
        </div>
      )}
    </div>
  );
};
