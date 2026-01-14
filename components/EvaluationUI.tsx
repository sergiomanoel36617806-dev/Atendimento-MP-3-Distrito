
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Send, MessageSquareText } from 'lucide-react';

export const EvaluationUI: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [fulfilled, setFulfilled] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || fulfilled === null) {
      alert('Por favor, preencha a nota e se sua solicitação foi atendida.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ThumbsUp size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Obrigado pela Avaliação!</h2>
        <p className="text-slate-500 mb-8 px-10">
          Seu feedback é fundamental para que o Vereador Marquinho da Pipa continue melhorando o atendimento no 3º Distrito.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors"
        >
          Nova Avaliação
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
            <Star size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Avaliar Atendimento</h2>
            <p className="text-slate-500">Dê sua opinião sobre os nossos serviços</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Rating Section */}
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Como você avalia o atendimento geral?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star 
                    size={42} 
                    className={`transition-colors ${
                      star <= (hoveredRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-2 text-amber-600 font-bold text-sm">
                {rating === 1 && 'Péssimo'}
                {rating === 2 && 'Regular'}
                {rating === 3 && 'Bom'}
                {rating === 4 && 'Muito Bom'}
                {rating === 5 && 'Excelente!'}
              </p>
            )}
          </div>

          {/* Fulfillment Section */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-sm font-bold text-slate-700 mb-6 text-center uppercase tracking-wider">
              Sua solicitação foi atendida pelo gabinete?
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFulfilled(true)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold border-2 transition-all ${
                  fulfilled === true 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-200'
                }`}
              >
                <ThumbsUp size={20} /> Sim, foi atendida
              </button>
              <button
                type="button"
                onClick={() => setFulfilled(false)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold border-2 transition-all ${
                  fulfilled === false 
                  ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-100' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-red-200'
                }`}
              >
                <ThumbsDown size={20} /> Não, ainda não
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider px-2">
              <MessageSquareText size={18} className="text-sky-500" /> Comentários Adicionais (Opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos um pouco mais sobre sua experiência..."
              rows={4}
              className="w-full px-5 py-4 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all resize-none text-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-3xl shadow-xl shadow-sky-100 flex items-center justify-center gap-3 transition-all transform active:scale-95"
          >
            Enviar Avaliação <Send size={20} />
          </button>

          <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter">
            Sua avaliação é anônima e serve para fins de controle de qualidade do gabinete.
          </p>
        </form>
      </div>
    </div>
  );
};
