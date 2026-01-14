
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  AlertCircle, 
  UserPlus, 
  Ticket, 
  CloudSun, 
  User, 
  LogOut,
  Bell,
  Menu,
  X,
  Star,
  Cake,
  ShieldCheck,
  CheckCircle2,
  Info,
  Settings,
  ChevronRight,
  Database,
  Lock,
  ShieldAlert,
  HardHat,
  MessageSquareQuote,
  RefreshCcw,
  Cloud
} from 'lucide-react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Jobs } from './components/Jobs';
import { Occurrences } from './components/Occurrences';
import { PersonRegistration } from './components/PersonRegistration';
import { ServiceTicketUI } from './components/ServiceTicketUI';
import { Weather } from './components/Weather';
import { AboutMarquinho } from './components/AboutMarquinho';
import { EvaluationUI } from './components/EvaluationUI';
import { BirthdaySystem } from './components/BirthdaySystem';
import { AdminPanel } from './components/AdminPanel';
import { DatabaseView } from './components/DatabaseView';
import { WorksAlerts } from './components/WorksAlerts';
import { View, User as UserType, Person, WorkAlert } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [works, setWorks] = useState<WorkAlert[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'alert' } | null>(null);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const ADMIN_PASSWORD_DEFAULT = "8970";

  // Inicialização do Banco de Dados Local (Persistência "Eterna")
  useEffect(() => {
    const savedPeople = localStorage.getItem('mp_digital_people');
    if (savedPeople) {
      try {
        setPeople(JSON.parse(savedPeople));
      } catch (e) {
        console.error("Erro ao carregar banco de dados:", e);
      }
    }
    
    const savedWorks = localStorage.getItem('mp_digital_works');
    if (savedWorks) setWorks(JSON.parse(savedWorks));

    const auth = localStorage.getItem('mp_admin_auth');
    if (auth === 'true') setIsAuthorizedAdmin(true);
  }, []);

  const handleRegisterPerson = (person: Person) => {
    const updatedPeople = [person, ...people];
    setPeople(updatedPeople);
    localStorage.setItem('mp_digital_people', JSON.stringify(updatedPeople));
    triggerToast(`Munícipe ${person.fullName} registrado permanentemente!`, 'success');
  };

  const handleBulkImport = (importedPeople: Person[]) => {
    setPeople(importedPeople);
    localStorage.setItem('mp_digital_people', JSON.stringify(importedPeople));
    triggerToast("Banco de dados restaurado com sucesso!", "success");
  };

  const handleSendWorkAlert = (work: WorkAlert) => {
    const updatedWorks = [work, ...works];
    setWorks(updatedWorks);
    localStorage.setItem('mp_digital_works', JSON.stringify(updatedWorks));
    
    const targetedPeople = people.filter(p => p.neighborhood === work.neighborhood);
    triggerToast(`Alerta SMS enviado para ${targetedPeople.length} moradores em ${work.neighborhood}!`, 'success');
  };

  const handleDeletePerson = (id: string) => {
    const updatedPeople = people.filter(p => p.id !== id);
    setPeople(updatedPeople);
    localStorage.setItem('mp_digital_people', JSON.stringify(updatedPeople));
    triggerToast("Registro removido do banco de dados.", "info");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD_DEFAULT) {
      setIsAuthorizedAdmin(true);
      localStorage.setItem('mp_admin_auth', 'true');
      setShowAdminLogin(false);
      setActiveView('admin');
      triggerToast("Sessão administrativa protegida iniciada.", "success");
    } else {
      triggerToast("Acesso negado. Chave incorreta.", "alert");
    }
    setAdminPassword('');
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (message: string, type: 'success' | 'info' | 'alert' = 'info') => {
    setToast({ message, type });
  };

  if (!user) {
    return <Auth onLogin={(u) => setUser(u)} />;
  }

  const isAdmin = user.role === 'admin';

  const renderView = () => {
    return (
      <div key={activeView} className="animate-slide-up">
        {(() => {
          switch (activeView) {
            case 'dashboard': return <Dashboard onNavigate={setActiveView} isAdmin={isAdmin} activeWorks={works} />;
            case 'jobs': return <Jobs isAdmin={isAdmin} user={user} onNotifyAdmin={(msg) => triggerToast(msg, 'success')} />;
            case 'occurrences': return <Occurrences isAdmin={isAdmin} />;
            case 'registration': return <PersonRegistration isAdmin={isAdmin} people={people} onRegister={handleRegisterPerson} />;
            case 'ticket': return <ServiceTicketUI isAdmin={isAuthorizedAdmin} user={user} />;
            case 'weather': return <Weather />;
            case 'about': return <AboutMarquinho isAdmin={isAdmin} />;
            case 'evaluation': return <EvaluationUI />;
            case 'birthdays': return <BirthdaySystem people={people} />;
            case 'works_alerts': return <WorksAlerts works={works} onSendAlert={handleSendWorkAlert} isAdmin={isAuthorizedAdmin} />;
            case 'admin': return isAuthorizedAdmin ? <AdminPanel people={people} onDeletePerson={handleDeletePerson} /> : <Dashboard onNavigate={setActiveView} isAdmin={isAdmin} activeWorks={works} />;
            case 'database': return isAuthorizedAdmin ? <DatabaseView people={people} onDeletePerson={handleDeletePerson} isAdmin={isAdmin} onBulkImport={handleBulkImport} /> : <Dashboard onNavigate={setActiveView} isAdmin={isAdmin} activeWorks={works} />;
            default: return <Dashboard onNavigate={setActiveView} isAdmin={isAdmin} activeWorks={works} />;
          }
        })()}
      </div>
    );
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Painel Inicial' },
    ...(isAuthorizedAdmin ? [
      { id: 'database', icon: Database, label: 'Banco de Dados' },
      { id: 'works_alerts', icon: HardHat, label: 'Alertas de Obras' }
    ] : []),
    { id: 'ticket', icon: Ticket, label: 'Senhas' },
    { id: 'jobs', icon: Briefcase, label: 'Empregos' },
    { id: 'occurrences', icon: AlertCircle, label: 'Ocorrências' },
    { id: 'registration', icon: UserPlus, label: isAdmin ? 'Munícipes' : 'Meus Dados' },
    { id: 'about', icon: User, label: 'Marquinho' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden font-medium">
      {showAdminLogin && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white w-full max-w-md rounded-[45px] shadow-2xl overflow-hidden animate-scale-in">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 text-amber-500 rounded-2xl flex items-center justify-center animate-float">
                       <Lock size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 leading-none">Acesso Administrador</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gabinete de Gestão</p>
                    </div>
                 </div>
                 <button onClick={() => setShowAdminLogin(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-90">
                    <X size={20} className="text-slate-400" />
                 </button>
              </div>
              <form onSubmit={handleAdminLogin} className="p-10 space-y-6">
                 <div className="space-y-2 text-center mb-4">
                    <p className="text-sm text-slate-500 font-medium">Insira a chave de acesso restrito (8970) para controlar o aplicativo.</p>
                 </div>
                 <div className="relative group">
                    <ShieldAlert className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                    <input 
                       type="password"
                       autoFocus
                       value={adminPassword}
                       onChange={(e) => setAdminPassword(e.target.value)}
                       placeholder="Senha Digital"
                       className="w-full pl-14 pr-6 py-4.5 rounded-[22px] bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-black text-slate-700 tracking-[0.3em] text-center transition-all"
                    />
                 </div>
                 <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-slate-200">
                    AUTORIZAR ACESSO <ChevronRight size={18} />
                 </button>
              </form>
           </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 animate-slide-up">
          <div className={`
            flex items-center gap-4 p-5 rounded-[28px] shadow-2xl border backdrop-blur-xl
            ${toast.type === 'success' ? 'bg-emerald-600 border-emerald-400 text-white' : 
              toast.type === 'alert' ? 'bg-amber-500 border-amber-300 text-white' : 
              'bg-slate-900 border-slate-700 text-white'}
          `}>
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
               {toast.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-0.5">Sistema MP</p>
              <p className="text-sm font-bold leading-tight">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transition-all duration-500 cubic-bezier
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-sky-100 ring-4 ring-sky-50 animate-float">
              🪁
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tighter text-slate-900">MP DIGITAL</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3º Distrito Unificado</p>
            </div>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto">
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Menu Principal</p>
               <div className="space-y-1">
                 {menuItems.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => { setActiveView(item.id as View); setSidebarOpen(false); }}
                     className={`
                       w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all group hover:scale-[1.02] active:scale-95
                       ${activeView === item.id ? 'sidebar-active text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                     `}
                   >
                     <div className="flex items-center gap-4">
                       <item.icon size={18} className={`${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-sky-500'} transition-transform group-hover:rotate-12`} />
                       {item.label}
                     </div>
                     <ChevronRight size={14} className={`${activeView === item.id ? 'opacity-50 translate-x-1' : 'opacity-0'} transition-all`} />
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Utilidades</p>
               <div className="space-y-1">
                 {[
                   { id: 'weather', icon: CloudSun, label: 'Clima' },
                   { id: 'evaluation', icon: Star, label: 'Feedback' },
                   { id: 'birthdays', icon: Cake, label: 'Aniversários' }
                 ].map(item => (
                   <button
                      key={item.id}
                      onClick={() => { setActiveView(item.id as View); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-[13px] font-bold transition-all hover:scale-[1.02] active:scale-95 ${activeView === item.id ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                      <item.icon size={18} className={`${activeView === item.id ? 'text-sky-500' : 'text-slate-400'} transition-transform group-hover:scale-110`} />
                      {item.label}
                   </button>
                 ))}
               </div>
             </div>

             <div className="pt-4 border-t border-slate-50">
               {isAuthorizedAdmin ? (
                  <button
                    onClick={() => { setActiveView('admin'); setSidebarOpen(false); }}
                    className={`
                      w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 pulse-glow
                      ${activeView === 'admin' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'bg-slate-900 text-amber-400 hover:bg-black'}
                    `}
                  >
                    <ShieldCheck size={18} className="animate-pulse" />
                    Administrador (Ativo)
                  </button>
               ) : (
                  <button
                    onClick={() => { setShowAdminLogin(true); setSidebarOpen(false); }}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all bg-slate-100 text-slate-500 hover:bg-slate-200 hover:scale-[1.02] active:scale-95"
                  >
                    <Lock size={18} />
                    Administrador
                  </button>
               )}
             </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50">
             <div className="px-4 py-3 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                   <Cloud size={10} className="text-sky-500" />
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Backup Local</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-slate-600">{people.length} Registros</span>
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
             </div>
            <button 
              onClick={() => { setUser(null); setIsAuthorizedAdmin(false); localStorage.removeItem('mp_admin_auth'); }}
              className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-rose-500 font-bold transition-all rounded-2xl hover:bg-rose-50 hover:scale-[1.02] active:scale-95"
            >
              <LogOut size={18} />
              Finalizar Sessão
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 glass sticky top-0 z-30 px-6 lg:px-12 flex items-center justify-between border-b border-white">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 bg-white shadow-sm rounded-xl text-slate-600 transition-all hover:bg-slate-50 active:scale-90">
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-3">
             <div className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 border border-emerald-100 animate-fade-in">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Sistema Operacional Ativo
             </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all text-slate-400 active:scale-90">
               <Bell size={20} />
               <span className="absolute top-3 right-3 w-2 h-2 bg-sky-500 rounded-full ring-4 ring-white animate-pulse" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 animate-fade-in">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.name}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAuthorizedAdmin ? 'GESTOR MASTER' : 'MODERADOR'}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl p-1 border-2 ${isAuthorizedAdmin ? 'border-amber-400 pulse-glow' : 'border-sky-200'} bg-white overflow-hidden shadow-sm transition-all hover:scale-110`}>
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-xl bg-slate-50 object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
             {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
