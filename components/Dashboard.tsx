
import React from 'react';
import { Appointment, Service, Professional } from '../types';
import { MOCK_SERVICES, MOCK_PROFESSIONALS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: Appointment['status']) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, onStatusChange }) => {
  const stats = [
    { label: 'Total Agendamentos', value: appointments.length, icon: 'fa-calendar-check', color: 'text-indigo-600' },
    { label: 'Pendentes', value: appointments.filter(a => a.status === 'pending').length, icon: 'fa-clock', color: 'text-yellow-500' },
    { label: 'Confirmados', value: appointments.filter(a => a.status === 'confirmed').length, icon: 'fa-check-circle', color: 'text-green-600' },
    { label: 'Cancelados', value: appointments.filter(a => a.status === 'cancelled').length, icon: 'fa-times-circle', color: 'text-red-500' },
  ];

  const chartData = MOCK_SERVICES.map(service => ({
    name: service.name.split(' ')[0],
    count: appointments.filter(a => a.serviceId === service.id).length
  }));

  const getService = (id: string) => MOCK_SERVICES.find(s => s.id === id);
  const getProf = (id: string) => MOCK_PROFESSIONALS.find(p => p.id === id);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Próximos Agendamentos</h3>
            <button className="text-sm text-indigo-600 font-semibold hover:underline">Ver Todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold">
                <tr>
                  <th className="px-6 py-4">Cliente / Serviço</th>
                  <th className="px-6 py-4">Profissional</th>
                  <th className="px-6 py-4">Horário</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{app.clientName}</p>
                      <p className="text-sm text-gray-500">{getService(app.serviceId)?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <img src={getProf(app.professionalId)?.avatar} className="w-6 h-6 rounded-full" alt="" />
                        <span className="text-sm text-gray-600">{getProf(app.professionalId)?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{new Date(app.startTime).toLocaleDateString()}</p>
                      {/* FIX: Corrected typo '2-刻' to '2-digit' for the hour property to resolve TypeScript error */}
                      <p className="text-xs text-gray-400 font-mono">{new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status === 'confirmed' ? 'Confirmado' : app.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {app.status === 'pending' && (
                          <button onClick={() => onStatusChange(app.id, 'confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        <button onClick={() => onStatusChange(app.id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-6">Popularidade de Serviços</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
