
import { Service, Professional, Appointment } from './types';

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Corte de Cabelo Masculino', description: 'Corte clássico ou moderno com acabamento na máquina ou tesoura.', durationMinutes: 45, price: 50, category: 'Cabelo' },
  { id: 's2', name: 'Barba Completa', description: 'Alinhamento, hidratação e toalha quente.', durationMinutes: 30, price: 40, category: 'Barba' },
  { id: 's3', name: 'Coloração', description: 'Cobertura de brancos ou mudança de tom.', durationMinutes: 90, price: 120, category: 'Química' },
  { id: 's4', name: 'Manicure Express', description: 'Cutilagem e esmaltação rápida.', durationMinutes: 40, price: 35, category: 'Unhas' },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  { id: 'p1', name: 'Ricardo Alencar', role: 'Master Barber', avatar: 'https://picsum.photos/seed/ricardo/200', specialties: ['s1', 's2'] },
  { id: 'p2', name: 'Julia Martins', role: 'Stylist & Colorist', avatar: 'https://picsum.photos/seed/julia/200', specialties: ['s1', 's3', 's4'] },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    serviceId: 's1',
    professionalId: 'p1',
    clientName: 'Carlos Mendonça',
    clientEmail: 'carlos@email.com',
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(10, 45, 0, 0)).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'a2',
    serviceId: 's2',
    professionalId: 'p2',
    clientName: 'Ana Souza',
    clientEmail: 'ana@email.com',
    startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
    status: 'pending'
  }
];
