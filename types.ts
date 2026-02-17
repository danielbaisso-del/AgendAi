
export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  professionalId: string;
  clientName: string;
  clientEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export type ViewType = 'client' | 'admin';
