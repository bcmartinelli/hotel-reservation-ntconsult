<template>
  <v-container>
    <h5
      :class="`text-h5 mb-4 ${selectedHotels.length < 1 ? 'text-center' : ''}`"
    >
      Compare entre suas escolhas
    </h5>
    <v-row v-if="selectedHotels.length">
      <v-col
        v-for="hotel in selectedHotels"
        :key="hotel.id"
        cols="12"
        sm="6"
        md="3"
        class="pa-3 pa-sm-3 mb-3 mb-sm-0"
      >
        <CardHotel :hotel="hotel" non-show-compare-btn />
      </v-col>
    </v-row>
    <template v-else>
      <v-sheet
        class="pa-4 text-center mx-auto"
        elevation="0"
        max-width="600"
        rounded="lg"
        width="100%"
      >
        <v-icon
          class="mb-5"
          icon="mdi-alert-circle-outline"
          size="100"
        ></v-icon>

        <h2 class="text-h5 mb-6">Ops! Sem hotéis selecionados</h2>

        <p class="mb-4 text-medium-emphasis text-body-2">
          Você se esqueceu de selecionar os hoteis para comparação.<br />
          Pesquise os hotéis que mais lhe agrada!
        </p>

        <v-divider class="mb-4"></v-divider>

        <div class="text-center">
          <v-btn class="text-none" variant="outlined" width="150" to="/">
            Voltar
          </v-btn>
        </div>
      </v-sheet>
    </template>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useComparisonStore } from '@/store/comparison';
import { Hotel } from '@/types';
import CardHotel from '@/components/CardHotel.vue';

export default defineComponent({
  components: { CardHotel },
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
.v-icon {
  color: $secondary-color;
}
.v-btn {
  color: $secondary-color;
  border-color: $secondary-color;
}
</style>
