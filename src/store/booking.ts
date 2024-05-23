import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotification } from '@/services/notificationService';
import { BookingDetails, Hotel } from '@/types';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    hotel: null as Hotel | null,
  }),
  actions: {
    async bookRoom(details: BookingDetails) {
      const { notify } = useNotification();
      try {
        await axios.post('/api/book', details);
        notify({ message: 'Reserva realizada com sucesso.', color: 'success' });
      } catch (error) {
        notify({
          message: 'Erro ao realizar a reserva, tente novamente.',
          color: 'error',
        });
      }
    },
    setHotel(hotel: Hotel | null) {
      this.hotel = hotel;
    },
  },
});
