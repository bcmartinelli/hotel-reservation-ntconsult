<template>
  <v-card>
    <v-img
      :src="'images/mocks/' + hotel.image"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
    </v-img>
    <v-card-item class="card-title">
      <div class="d-flex align-center ga-2">
        <v-card-title>{{ hotel.name }}</v-card-title>
        <v-card-subtitle class="d-flex align-center pa-0">
          <v-icon icon="mdi-map-marker" size="x-small"></v-icon>
          <span class="ms-1">{{ hotel.country }}</span>
        </v-card-subtitle>
      </div>
      <v-checkbox
        v-if="!nonShowCompareBtn"
        v-model="localSelectedHotels"
        :value="hotel"
        false-icon="mdi-file-compare"
        true-icon="mdi-file-compare"
      >
        <v-tooltip activator="parent" location="bottom"> Comparar </v-tooltip>
      </v-checkbox>
    </v-card-item>

    <v-card-text class="pb-0">
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="hotel.rating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">{{ hotel.rating }}</div>
      </v-row>

      <div class="d-flex align-center my-4">
        <v-icon icon="mdi-currency-usd" size="small"></v-icon>
        <span class="text-body-2">{{ formatToBRL(hotel.price) }}</span>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text="Reservar" @click="openModal" class="my-0 w-100"></v-btn>
    </v-card-actions>
  </v-card>
  <BookingForm :isOpen="isModalOpen" @update:isOpen="updateIsModalOpen" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import BookingForm from '@/components/forms/BookingForm.vue';
import { Hotel } from '@/types';
import { useBookingStore } from '@/store/booking';
import { formatToBRL } from '@/utils';

export default defineComponent({
  components: { BookingForm },
  props: {
    nonShowCompareBtn: {
      type: Boolean,
      default: false,
    },
    hotel: {
      type: Object as PropType<Hotel>,
      required: true,
    },
    selectedHotels: {
      type: Array as PropType<Hotel[]>,
      required: false,
      default: []
    },
  },
  emits: ['update-selected-hotels'],
  setup(props, { emit }) {
    const bookingStore = useBookingStore();
    const isModalOpen = ref(false);
    const localSelectedHotels = ref([...props.selectedHotels],
    );
    const emitUpdate = () => {
      emit('update-selected-hotels', {
        selected: localSelectedHotels.value,
        hotel: props.hotel,
      });
    };

    watch(localSelectedHotels, emitUpdate, { deep: true });

    const openModal = () => {
      isModalOpen.value = true;
      bookingStore.setHotel(props.hotel);
    };

    const updateIsModalOpen = (newVal: boolean) => {
      isModalOpen.value = newVal;
      if (!newVal) bookingStore.setHotel(null);
    };

    return {
      localSelectedHotels,
      formatToBRL,
      isModalOpen,
      updateIsModalOpen,
      openModal,
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
</style>
