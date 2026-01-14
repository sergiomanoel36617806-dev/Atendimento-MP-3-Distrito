
import React, { useState } from 'react';
// Added Briefcase to imports
import { Search, MapPin, Calendar, ExternalLink, Plus, Trash2, Edit, X, Save, CheckCircle2, UserCheck, Phone, FileText, Briefcase } from 'lucide-react';
import { Job, User as UserType } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Auxiliar Administrativo', company: 'Logística 3D', location: 'Santa Cruz da Serra', description: 'Atendimento telefônico, organização de arquivos e suporte à diretoria.', postedDate: 'Hoje' },
  { id: '2', title: 'Vendedor de Loja', company: 'Moda Pipa', location: 'Imbariê', description: 'Vendas consultivas, organização de estoque e fechamento de caixa.', postedDate: 'Há 2 dias' },
  { id: '3', title: 'Ajudante de Carga', company: 'Transportes Rápidos', location: 'Chácara Rio-Petrópolis', description: 'Carga e descarga de caminhões e conferência de mercadorias.', postedDate: 'Há 1 dia' },
  { id: '4', title: 'Recepcionista', company: 'Clínica Saúde Total', location: 'Parada Angélica', description: 'Marcação de consultas e recepção de pacientes.', postedDate: 'Hoje' },
];

interface JobsProps {
  isAdmin: boolean;
  user?: UserType;
  onNotifyAdmin?: (message: string) => void;
}

export const Jobs: React.FC<JobsProps> = ({ isAdmin, user, onNotifyAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: 'Santa Cruz da Serra', description: '' });

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente remover esta vaga?')) {
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const jobToAdd: Job = {
      id: Math.random().toString(36).substr(2, 9),
      ...newJob,
      postedDate: 'Agora'
    };
    
    setJobs([jobToAdd, ...jobs]);
    setIsModalOpen(false);
    setNewJob({ title: '', company: '', location: 'Santa Cruz da Serra', description: '' });
    
    if (onNotifyAdmin) {
      onNotifyAdmin(`Sucesso! Nova vaga de "${jobToAdd.title}" adicionada ao mural.`);
    }
  };

  const handleOpenApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    setIsApplying(true);
    
    // Simulação de processamento de candidatura
    setTimeout(() => {
      setIsApplying(false);
      setIsApplyModalOpen(false);
      if (onNotifyAdmin && selectedJob) {
        onNotifyAdmin(`Candidatura enviada para "${selectedJob.title}" com sucesso! Boa sorte, ${user?.name}.`);
      }
      setSelectedJob(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vagas de Emprego</h2>
          <p className="text-slate-500">Oportunidades no 3º Distrito e região</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar vaga ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-100 flex items-center gap-2 font-bold px-4"
            >
              <Plus size={20} /> <span className="hidden sm:inline">Nova Vaga</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal para Candidatar-se */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              {isApplying ? (
                <div className="p-16 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center animate-pulse">
                    <UserCheck size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Enviando Candidatura...</h3>
                    <p className="text-slate-400 text-sm mt-2">Estamos enviando seu perfil para a {selectedJob.company}.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center">
                           <Briefcase size={20} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900">Confirmar Candidatura</h3>
                     </div>
                     <button onClick={() => setIsApplyModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                       <X size={20} />
                     </button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Vaga Selecionada</p>
                        <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{selectedJob.title}</h4>
                        <p className="text-sky-600 font-bold text-sm">{selectedJob.company}</p>
                     </div>
                     
                     <div className="space-y-4">
                        <p className="text-sm text-slate-500 font-medium">Seus dados cadastrados serão enviados junto à candidatura:</p>
                        <div className="space-y-2">
                           <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                              <UserCheck size={16} className="text-sky-500" /> {user?.name}
                           </div>
                           <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                              <FileText size={16} className="text-sky-500" /> Perfil Munícipe Ativo
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <button 
                          onClick={() => setIsApplyModalOpen(false)}
                          className="flex-1 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[10px]"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={handleConfirmApply}
                          className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
                        >
                          Confirmar Envio <ExternalLink size={14} />
                        </button>
                     </div>
                  </div>
                </>
              )}
           </div>
        </div>
      )}

      {/* Modal Add Job (Admin) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                 <h3 className="text-xl font-black text-slate-900">Cadastrar Nova Oportunidade</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                   <X size={20} />
                 </button>
              </div>
              <form onSubmit={handleAddJob} className="p-8 space-y-6">
                 <div>
                   <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Cargo / Título</label>
                   <input 
                    type="text" 
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    placeholder="Ex: Auxiliar de Produção" 
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-sky-500/10 outline-none font-bold text-slate-700"
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Empresa</label>
                      <input 
                        type="text" 
                        required
                        value={newJob.company}
                        onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Localização</label>
                      <select 
                        value={newJob.location}
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-slate-700 appearance-none"
                      >
                        <option>Santa Cruz da Serra</option>
                        <option>Imbariê</option>
                        <option>Parada Angélica</option>
                        <option>Chácara Rio-Petrópolis</option>
                      </select>
                    </div>
                 </div>
                 <div>
                   <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest px-1">Descrição Curta</label>
                   <textarea 
                    rows={3}
                    required
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-medium text-slate-700 resize-none"
                   />
                 </div>
                 <button type="submit" className="w-full py-4 bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-100 flex items-center justify-center gap-2 hover:bg-sky-600 transition-all uppercase tracking-widest text-xs">
                    <Save size={18} /> Publicar Vaga Agora
                 </button>
              </form>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-sky-100 transition-colors group relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                <p className="text-sky-600 font-medium text-sm">{job.company}</p>
              </div>
              <div className="flex items-center gap-2">
                 <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold rounded-full">CLT</span>
                 {isAdmin && (
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-sky-500 transition-colors"><Edit size={16}/></button>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                   </div>
                 )}
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-4 line-clamp-2 italic">"{job.description}"</p>
            
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-6">
              <div className="flex items-center gap-1">
                <MapPin size={14} /> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} /> {job.postedDate}
              </div>
            </div>

            <button 
              onClick={() => handleOpenApply(job)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Candidatar-se <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400">Nenhuma vaga encontrada para sua busca.</p>
        </div>
      )}
    </div>
  );
};
