<template>
  <div>
    <h2>Resultados da Pesquisa</h2>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.id">
        <input type="checkbox" :value="hotel" v-model="selectedHotels" />
        <h3>{{ hotel.name }}</h3>
        <p>Preço: {{ hotel.price }}</p>
        <p>Avaliação: {{ hotel.rating }}</p>
        <p>Pais: {{ hotel.country }}</p>
      </li>
    </ul>
    <button @click="compareHotels">Comparar Selecionados</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useComparisonStore } from '@/store/comparison';
import { useRouter } from 'vue-router';
import { Hotel } from '@/types';

export default defineComponent({
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      required: true,
    },
  },
  setup() {
    const comparisonStore = useComparisonStore();
    const selectedHotels = ref<Hotel[]>([]);
    const router = useRouter();

    const compareHotels = () => {
      comparisonStore.setSelectedHotels(selectedHotels.value);
      router.push({ name: 'Comparison' });
    };

    return { selectedHotels, compareHotels };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 4px;
}
h2 {
  color: $primary-color;
  text-align: center;
  margin-bottom: 20px;
}
button {
  padding: 10px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: $primary-color-hover;
}
</style>
