export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  conditions: string[];
  allergies: string[];
  venue: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface EmergencyAlert {
  id: string;
  status: 'pending' | 'responding' | 'resolved';
  eta?: number; // minutes
}

export interface SeatInfo {
  block: string;
  seatNumber: string;
}
