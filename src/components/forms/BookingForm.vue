<template>
  <form @submit.prevent="bookRoom">
    <div>
      <label for="name">Nome:</label>
      <input id="name" v-model="name" placeholder="Nome" required />
    </div>
    <div>
      <label for="contact">Contato:</label>
      <input id="contact" v-model="contact" placeholder="Contato" required />
    </div>
    <div>
      <label for="paymentDetails">Detalhes de Pagamento:</label>
      <input
        id="paymentDetails"
        v-model="paymentDetails"
        placeholder="Detalhes de Pagamento"
        required
      />
    </div>
    <button type="submit">Reservar</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBookingStore } from '@/store/booking';

export default defineComponent({
  setup() {
    const bookingStore = useBookingStore();
    const name = ref('');
    const contact = ref('');
    const paymentDetails = ref('');

    const bookRoom = async () => {
      try {
        await bookingStore.bookRoom({
          name: name.value,
          contact: contact.value,
          paymentDetails: paymentDetails.value,
        });
      } catch (error) {
        console.error('Erro na reserva.', error);
      }
    };

    return { name, contact, paymentDetails, bookRoom };
  },
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
div {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: $primary-color-hover;
}
</style>
