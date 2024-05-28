<template>
  <v-card variant="tonal" class="card-container">
    <v-form v-model="formValid" ref="form" @submit.prevent="searchHotels">
      <v-container>
        <v-row align="stretch">
          <v-col cols="12" md="2">
            <v-text-field
              id="destination"
              v-model="formData.destination"
              label="Destino"
              placeholder="Insira um país ou hotel"
              hide-details
              prepend-inner-icon="mdi-map-marker"
              variant="solo"
              flat
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              id="checkInDate"
              v-model="formData.checkInDate"
              label="Check-in"
              type="date"
              :rules="[rules.required]"
              hide-details
              required
              variant="solo"
              flat
            >
              <template>
                <v-btn icon flat><v-icon>mdi-calendar</v-icon> </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              id="checkOutDate"
              v-model="formData.checkOutDate"
              label="Check-out"
              type="date"
              :rules="[rules.required]"
              hide-details
              required
              variant="solo"
              flat
            >
              <template>
                <v-btn icon flat><v-icon>mdi-calendar</v-icon> </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6" md="2">
            <v-text-field
              id="rooms"
              v-model="formData.rooms"
              label="Quartos"
              type="number"
              placeholder="Numero de quartos"
              :rules="[rules.required, rules.number]"
              hide-details
              required
              prepend-inner-icon="mdi-bed-king-outline"
              variant="solo"
              flat
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="2">
            <v-text-field
              id="guests"
              v-model="formData.guests"
              label="Hospedes"
              type="number"
              placeholder="Numero de hospedes"
              :rules="[rules.required, rules.number]"
              prepend-inner-icon="mdi-account-outline"
              hide-details
              required
              variant="solo"
              flat
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn id="teste" type="submit" flat>Buscar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSearchStore } from '@/store/search';

export default defineComponent({
  setup() {
    const formValid = ref(false);
    const formData = ref({
      destination: '',
      checkInDate: '',
      checkOutDate: '',
      rooms: 1,
      guests: 1,
    });
    const checkInDatePicker = ref(false);
    const checkOutDatePicker = ref(false);

    const searchStore = useSearchStore();

    const rules = {
      required: (value: any) => !!value || 'Obrigatório.',
      number: (value: any) => !isNaN(value) || 'Número inválido.',
    };

    const searchHotels = () => {
      if (formValid.value) {
        searchStore.setCriteria(formData.value);
        searchStore.fetchHotels();
      }
    };

    return {
      formValid,
      formData,
      rules,
      checkInDatePicker,
      checkOutDatePicker,
      searchHotels,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-container {
  background: $primary-color-light;

  button {
    width: 100%;
    height: 100%;
    min-height: 40px;
    background-color: $primary-color;
    font-weight: bold;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: $primary-color-hover;
    }
  }
}
</style>
