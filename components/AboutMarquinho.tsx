
import React from 'react';
import { Heart, Star, CheckCircle } from 'lucide-react';

interface AboutMarquinhoProps {
  isAdmin: boolean;
}

export const AboutMarquinho: React.FC<AboutMarquinhoProps> = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="relative h-80 rounded-[40px] overflow-hidden shadow-2xl">
        <img 
          src="https://picsum.photos/seed/district3/1200/400" 
          className="w-full h-full object-cover"
          alt="3º Distrito"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-10 left-10 flex items-end gap-6">
          <div className="pb-2">
            <h1 className="text-4xl font-black text-white leading-none mb-1">Marquinho da Pipa</h1>
            <p className="text-sky-400 font-bold tracking-widest uppercase text-sm">O Amigo do 3º Distrito</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Star className="text-sky-500" /> Compromisso com Você
            </h2>
            <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
              <p>
                O <strong>Vereador Marquinho da Pipa</strong> é uma voz incansável em prol dos moradores do 3º Distrito de Duque de Caxias. Conhecido por seu carisma e humildade, Marquinho não é apenas um político, mas um vizinho que entende as dores e as necessidades de cada rua de nossa região.
              </p>
              <p>
                Sua atuação se destaca pela <strong>presença constante</strong>. Seja em Imbariê, Santa Cruz da Serra ou Parada Angélica, Marquinho está sempre nas ruas, fiscalizando obras, ouvindo as solicitações das pessoas e buscando soluções imediatas junto aos órgãos públicos.
              </p>
              <div className="bg-sky-50 p-6 rounded-3xl border-l-4 border-sky-500 my-8">
                <p className="italic text-sky-900 m-0">
                  "Meu gabinete é a rua. Minha missão é servir. Enquanto houver um morador do 3º Distrito precisando de ajuda, eu estarei lá, atendendo com o mesmo sorriso e dedicação de sempre."
                </p>
                <p className="text-right text-sky-700 font-bold mt-2">— Marquinho da Pipa</p>
              </div>
              <p>
                Ele acredita que a política deve ser feita com transparência e proximidade. Por isso, este aplicativo é mais uma ferramenta para que você possa alcançar seu representante de forma rápida e eficiente.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <CheckCircle className="text-emerald-500 mb-3" size={24} />
              <h4 className="font-bold text-slate-900 mb-1">Ações Sociais</h4>
              <p className="text-sm text-slate-500">Projetos que levam lazer, esporte e cultura para crianças e jovens carentes.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <CheckCircle className="text-sky-500 mb-3" size={24} />
              <h4 className="font-bold text-slate-900 mb-1">Infraestrutura</h4>
              <p className="text-sm text-slate-500">Mais de 100 ruas pavimentadas e iluminadas com LED através de suas solicitações.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-sky-500 p-10 rounded-[40px] text-white shadow-xl shadow-sky-100 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mb-6">🪁</div>
             <h3 className="font-bold text-2xl mb-4 uppercase tracking-tighter">Sempre Presente</h3>
             <p className="text-sky-100 text-sm leading-relaxed mb-8">
               Marquinho da Pipa acredita que o trabalho não para. Estamos juntos construindo um 3º Distrito melhor para todos.
             </p>
             <Heart size={48} className="fill-white animate-pulse" />
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl">
             <p className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] mb-4">Contato do Gabinete</p>
             <p className="text-sm text-slate-400 leading-relaxed">
               Solicitações também podem ser feitas presencialmente no gabinete local ou através de nossos canais digitais.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
