export interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  country: string;
  image: string;
}

export interface Notification {
  message: string;
  color?: string;
  timeout?: number;
  active: boolean;
}

export interface BookingDetails {
  name: string;
  contact: string;
  paymentMethod: string | null;
}

export interface SearchCriteria {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guests: number;
}
