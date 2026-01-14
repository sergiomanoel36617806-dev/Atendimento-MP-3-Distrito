
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: string;
}

export interface Occurrence {
  id: string;
  type: 'Buraco' | 'Iluminação' | 'Segurança' | 'Outros';
  description: string;
  address: string;
  status: 'Pendente' | 'Em Analise' | 'Concluido';
  date: string;
}

export interface Person {
  id: string;
  fullName: string;
  cpf: string;
  neighborhood: string;
  phone: string;
  birthDate: string;
}

export interface WorkAlert {
  id: string;
  neighborhood: string;
  description: string;
  startDate: string;
  status: 'Iniciada' | 'Em Andamento' | 'Concluída';
}

export interface ServiceTicket {
  id: string;
  number: string;
  time: string;
  category: string;
  status: 'Aguardando' | 'Chamado' | 'Atendido';
  userName?: string;
}

export interface Evaluation {
  id: string;
  rating: number;
  fulfilled: boolean;
  comment: string;
  date: string;
  userName?: string;
}

export type View = 'dashboard' | 'jobs' | 'occurrences' | 'registration' | 'ticket' | 'about' | 'weather' | 'evaluation' | 'birthdays' | 'admin' | 'database' | 'admin_auth' | 'works_alerts';
