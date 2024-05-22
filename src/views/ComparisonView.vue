<template>
  <div v-if="selectedHotels.length">
    <h2>Comparação de Hotéis</h2>
    <div class="comparison-container">
      <div
        v-for="hotel in selectedHotels"
        :key="hotel.id"
        class="hotel-comparison"
      >
        <h3>{{ hotel.name }}</h3>
        <p>Preço: {{ hotel.price }}</p>
        <p>Avaliação: {{ hotel.rating }}</p>
        <button @click="selectHotel(hotel)">Reservar</button>
      </div>
    </div>
    <BookingForm v-if="selectedHotel" />
  </div>
  <div v-else>
    <p>Nenhum hotel selecionado para comparação.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useComparisonStore } from '@/store/comparison';
import BookingForm from '@/components/forms/BookingForm.vue';
import { Hotel } from '@/types';

export default defineComponent({
  components: { BookingForm },
  setup() {
    const comparisonStore = useComparisonStore();
    const selectedHotel = ref<Hotel | null>(null);

    const selectHotel = (hotel: Hotel) => {
      selectedHotel.value = hotel;
    };

    return {
      selectedHotels: comparisonStore.selectedHotels,
      selectedHotel,
      selectHotel,
    };
  },
});
</script>

<style lang="scss" scoped>
.comparison-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.hotel-comparison {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
}

@media (max-width: 600px) {
  .comparison-container {
    flex-direction: column;
  }
}
</style>
