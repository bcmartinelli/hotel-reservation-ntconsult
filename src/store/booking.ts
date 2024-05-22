import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotification } from '@/services/notificationService';
import { BookingDetails } from '@/types';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    status: '' as string,
  }),
  actions: {
    async bookRoom(details: BookingDetails) {
      const { notify } = useNotification();
      try {
        await axios.post('/api/book', details);
        this.status = 'Reserva bem-sucedida!';
        notify({ message: 'Reserva realizada com sucesso.', color: 'success' });
      } catch (error) {
        this.status = 'Erro na reserva.';
        notify({
          message: 'Erro ao realizar a reserva, tente novamente.',
          color: 'error',
        });
      }
    },
  },
});
