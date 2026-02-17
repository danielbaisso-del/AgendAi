
import React, { useState } from 'react';
import { Appointment, ViewType } from './types';
import { INITIAL_APPOINTMENTS, MOCK_SERVICES, MOCK_PROFESSIONALS } from './constants';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('client');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleNewBooking = (data: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAppointments(prev => [newAppointment, ...prev]);
    setIsBookingModalOpen(false);
    alert('Agendamento realizado com sucesso!');
  };

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition">
              <i className="fas fa-calendar-alt text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                AgendAI
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Booking Hub</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button 
              onClick={() => setView('client')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${view === 'client' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="fas fa-user mr-2"></i> Cliente
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${view === 'admin' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="fas fa-chart-line mr-2"></i> Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {view === 'admin' ? (
          <div className="animate-fadeIn">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Painel de Controle</h2>
              <p className="text-gray-500">Gerencie seus compromissos e acompanhe o crescimento.</p>
            </header>
            <Dashboard 
              appointments={appointments} 
              onStatusChange={handleUpdateStatus} 
            />
          </div>
        ) : (
          <div className="animate-fadeIn">
            {/* Client Landing Section */}
            <div className="flex flex-col lg:flex-row gap-12 items-center py-12">
              <div className="flex-1 space-y-6">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                  Transforme seu Tempo
                </span>
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  Agendamentos <br />
                  <span className="text-indigo-600">Inteligentes</span> para seu Dia.
                </h2>
                <p className="text-xl text-gray-500 max-w-lg">
                  Otimize sua rotina com nosso sistema ultra-rápido. Escolha o serviço, o profissional e o melhor horário em segundos.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 active:scale-95"
                  >
                    Agendar Agora
                  </button>
                  <button className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition border border-gray-200">
                    Nossos Serviços
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 pt-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/${i + 10}/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">+2.4k</span> clientes satisfeitos</p>
                </div>
              </div>

              <div className="flex-1 w-full lg:max-w-md relative">
                <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-60"></div>
                
                {/* Visual Service Cards */}
                <div className="space-y-4">
                  {MOCK_SERVICES.slice(0, 3).map((s, idx) => (
                    <div key={s.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 transform transition hover:-translate-y-1 ${idx === 1 ? 'ml-6' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${['bg-blue-500', 'bg-indigo-500', 'bg-violet-500'][idx]}`}>
                        <i className={`fas ${['fa-cut', 'fa-brush', 'fa-magic'][idx]}`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{s.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">A partir de R$ {s.price}</p>
                      </div>
                      <div className="text-indigo-600">
                        <i className="fas fa-chevron-right text-xs"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
              {[
                { title: 'IA Generativa', desc: 'Assistente inteligente para ajudar você a decidir.', icon: 'fa-robot' },
                { title: 'Tempo Real', desc: 'Disponibilidade atualizada instantaneamente.', icon: 'fa-bolt' },
                { title: 'Lembretes', desc: 'Notificações para você nunca esquecer o horário.', icon: 'fa-bell' }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <i className={`fas ${feat.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feat.title}</h3>
                  <p className="text-gray-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-lg">
            <BookingForm 
              onBook={handleNewBooking} 
              onCancel={() => setIsBookingModalOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2024 AgendAI - Sistema de Agendamento Inteligente. Feito com paixão.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition">Termos</a>
            <a href="#" className="hover:text-indigo-600 transition">Privacidade</a>
            <a href="#" className="hover:text-indigo-600 transition">Suporte</a>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant */}
      <AIChatAssistant />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
};

export default App;
