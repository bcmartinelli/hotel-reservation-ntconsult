<template>
  <v-container class="mt-8 pa-0">
    <v-row>
      <v-col
        v-for="hotel in hotels"
        :key="hotel.id"
        cols="12"
        sm="6"
        md="3"
        class="pa-3 pa-sm-3 mb-3 mb-sm-0"
      >
        <CardHotel
          :hotel="hotel"
          :selected-hotels="selectedHotels"
          @update-selected-hotels="updateSelectedHotels"
        ></CardHotel>
      </v-col>
    </v-row>
    <v-btn
      v-if="selectedHotels.length > 0"
      class="btn-fab"
      position="fixed"
      location="bottom right"
      prepend-icon="mdi-file-compare"
      size="small"
      :elevation="6"
      @click="compareHotels"
    >
      Comparar
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useComparisonStore } from '@/store/comparison';
import { useRouter } from 'vue-router';
import { Hotel } from '@/types';
import CardHotel from '@/components/CardHotel.vue';

export default defineComponent({
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      required: true,
    },
  },
  components: { CardHotel },
  setup() {
    const comparisonStore = useComparisonStore();
    const selectedHotels = ref<Hotel[]>([]);
    const router = useRouter();

    const compareHotels = () => {
      comparisonStore.setSelectedHotels(selectedHotels.value);
      router.push({ name: 'Comparação' });
    };

    const updateSelectedHotels = (newHotels: {
      selected: Hotel[];
      hotel: Hotel;
    }) => {
      const newHotel = newHotels.selected[0];
      if (newHotels.selected.length >= 1) {
        selectedHotels.value.push(newHotel);
      } else {
        const indexHotel = selectedHotels.value.findIndex(
          (local) => local.id === newHotels.hotel.id,
        );

        selectedHotels.value.splice(indexHotel, 1);
      }
    };

    return { selectedHotels, compareHotels, updateSelectedHotels };
  },
});
</script>

<style lang="scss" scoped>
.card-title {
  position: relative;
  .v-checkbox {
    position: absolute;
    right: 4px;
    top: 0;
    color: $primary-color;
  }
}
button {
  &.v-btn {
    background-color: $primary-color;
    color: white;
    cursor: pointer;

    &.btn-fab {
      margin-right: 16px;
      margin-bottom: 16px;
      background-color: $secondary-color;
    }
  }
}
</style>
