<template>
  <form @submit.prevent="searchHotels">
    <div>
      <label for="destination">Destino:</label>
      <input
        id="destination"
        v-model="destination"
        placeholder="Destino"
        required
      />
    </div>
    <div>
      <label for="checkInDate">Check-in:</label>
      <input id="checkInDate" type="date" v-model="checkInDate" required />
    </div>
    <div>
      <label for="checkOutDate">Check-out:</label>
      <input id="checkOutDate" type="date" v-model="checkOutDate" required />
    </div>
    <div>
      <label for="rooms">Quartos:</label>
      <input id="rooms" type="number" v-model="rooms" min="1" required />
    </div>
    <div>
      <label for="guests">Hóspedes:</label>
      <input id="guests" type="number" v-model="guests" min="1" required />
    </div>
    <button type="submit">Pesquisar</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSearchStore } from '@/store/search';

export default defineComponent({
  setup() {
    const searchStore = useSearchStore();
    const destination = ref('');
    const checkInDate = ref('');
    const checkOutDate = ref('');
    const rooms = ref(1);
    const guests = ref(1);

    const searchHotels = () => {
      searchStore.setCriteria({
        destination: destination.value,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        rooms: rooms.value,
        guests: guests.value,
      });
      searchStore.fetchHotels();
    };

    return {
      destination,
      checkInDate,
      checkOutDate,
      rooms,
      guests,
      searchHotels,
    };
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

@media (max-width: 600px) {
  form {
    padding: 10px;
  }
}
</style>
