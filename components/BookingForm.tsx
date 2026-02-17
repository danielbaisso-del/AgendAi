
import React, { useState } from 'react';
import { Service, Professional, Appointment } from '../types';
import { MOCK_SERVICES, MOCK_PROFESSIONALS } from '../constants';

interface BookingFormProps {
  onBook: (appointment: Omit<Appointment, 'id'>) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBook, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    professionalId: '',
    date: '',
    time: '',
    clientName: '',
    clientEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = MOCK_SERVICES.find(s => s.id === formData.serviceId);
    if (!service) return;

    const start = new Date(`${formData.date}T${formData.time}`);
    const end = new Date(start.getTime() + service.durationMinutes * 60000);

    onBook({
      serviceId: formData.serviceId,
      professionalId: formData.professionalId,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: 'pending'
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Novo Agendamento</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex mb-8 space-x-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-indigo-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Escolha o Serviço</span>
              <select 
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={formData.serviceId}
                onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                required
              >
                <option value="">Selecione...</option>
                {MOCK_SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium">Escolha o Profissional</span>
              <select 
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={formData.professionalId}
                onChange={(e) => setFormData({...formData, professionalId: e.target.value})}
                required
              >
                <option value="">Selecione...</option>
                {MOCK_PROFESSIONALS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={nextStep} disabled={!formData.serviceId || !formData.professionalId} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              Próximo Passo
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Data</span>
                <input 
                  type="date" 
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-medium">Hora</span>
                <input 
                  type="time" 
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </label>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={prevStep} className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                Voltar
              </button>
              <button type="button" onClick={nextStep} disabled={!formData.date || !formData.time} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Seu Nome</span>
              <input 
                type="text" 
                placeholder="Ex: João Silva"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium">Seu E-mail</span>
              <input 
                type="email" 
                placeholder="joao@exemplo.com"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                required
              />
            </label>
            <div className="flex gap-4">
              <button type="button" onClick={prevStep} className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                Voltar
              </button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
