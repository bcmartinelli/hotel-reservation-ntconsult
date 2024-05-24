<template>
  <v-container class="pa-0">
    <v-row class="px-3 mt-4 mb-3">
      <v-col cols="12" sm="7" class="d-flex align-center custom-text-justify">
        <h5 class="text-h5">Temos o hotel ideal para você!</h5>
      </v-col>
      <v-col cols="12" sm="5" class="d-flex align-center custom-justify ga-2">
        <div class="text-subtitle-1 text-medium-emphasis">Filtrar por</div>
        <v-select
          v-model="sortCriteria"
          :items="sortOptions"
          item-value="key"
          item-text="title"
          variant="plain"
          density="compact"
          hide-details
          max-width="130px"
          style="margin-top: -6px"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="hotel in sortedHotels"
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
import { computed, defineComponent, PropType, ref } from 'vue';
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
  setup(props) {
    const comparisonStore = useComparisonStore();
    const selectedHotels = ref<Hotel[]>([]);
    const router = useRouter();

    const sortCriteria = ref<string>('rating');
    const sortOptions = [
      { key: 'rating', title: 'Avaliação' },
      { key: 'country', title: 'País' },
      { key: 'lowest-price', title: 'Menor preço' },
      { key: 'biggest-price', title: 'Maior preço' },
    ];

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
    const sortedHotels = computed(() => {
      return [...props.hotels].sort((a, b) => {
        switch (sortCriteria.value) {
          case 'rating':
            return b.rating - a.rating;
          case 'country':
            return a.country.localeCompare(b.country);
          case 'lowest-price':
            return a.price - b.price;
          case 'biggest-price':
            return b.price - a.price;
          default:
            return 0;
        }
      });
    });

    return {
      selectedHotels,
      compareHotels,
      updateSelectedHotels,
      sortCriteria,
      sortOptions,
      sortedHotels,
    };
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
.custom-justify {
  justify-content: end;
}

@media (max-width: 600px) {
  .custom-justify {
    justify-content: center;
  }
}
</style>
