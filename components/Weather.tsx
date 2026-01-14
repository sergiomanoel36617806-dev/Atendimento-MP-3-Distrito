
import React from 'react';
import { CloudRain, Sun, Wind, Droplets, Thermometer, MapPin } from 'lucide-react';

export const Weather: React.FC = () => {
  const forecast = [
    { day: 'Amanhã', temp: '29°', icon: Sun, color: 'text-amber-500' },
    { day: 'Qua', temp: '26°', icon: CloudRain, color: 'text-sky-500' },
    { day: 'Qui', temp: '30°', icon: Sun, color: 'text-amber-500' },
    { day: 'Sex', temp: '28°', icon: Sun, color: 'text-amber-500' },
    { day: 'Sáb', temp: '25°', icon: CloudRain, color: 'text-sky-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-[40px] p-10 text-white shadow-xl shadow-sky-100 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin size={20} className="text-sky-100" />
              <span className="font-semibold text-sky-100 tracking-wide uppercase text-sm">Duque de Caxias - 3º Distrito</span>
            </div>
            <h2 className="text-8xl font-black mb-2">28°</h2>
            <p className="text-2xl font-medium opacity-90">Céu Limpo e Ensolarado</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 grid grid-cols-2 gap-8 min-w-[300px]">
            <div className="flex items-center gap-3">
              <Thermometer className="text-sky-200" />
              <div>
                <p className="text-xs opacity-70">Sensação</p>
                <p className="font-bold">31°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="text-sky-200" />
              <div>
                <p className="text-xs opacity-70">Vento</p>
                <p className="font-bold">14km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="text-sky-200" />
              <div>
                <p className="text-xs opacity-70">Umidade</p>
                <p className="font-bold">62%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudRain className="text-sky-200" />
              <div>
                <p className="text-xs opacity-70">Chuva</p>
                <p className="font-bold">5%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 right-10 text-[180px] opacity-10 leading-none select-none">☀️</div>
      </div>

      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          Previsão para a Semana
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {forecast.map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-sky-200 transition-colors">
              <span className="text-sm font-bold text-slate-400 mb-4">{item.day}</span>
              <item.icon className={`w-10 h-10 mb-4 ${item.color}`} />
              <span className="text-2xl font-black text-slate-900">{item.temp}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-600">⚠️</div>
        <div>
          <h4 className="font-bold text-amber-900">Alerta de Calor</h4>
          <p className="text-sm text-amber-800">Temperaturas acima da média para esta semana. Hidrate-se e evite exposição direta ao sol entre 10h e 16h.</p>
        </div>
      </div>
    </div>
  );
};
