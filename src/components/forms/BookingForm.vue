<template>
  <v-dialog v-model="localIsOpen" max-width="600px">
    <v-card>
      <v-card-title class="headline">Confirmar Reserva</v-card-title>
      <v-card-text>
        <v-form v-model="formValid" ref="form" @submit.prevent="submitBookRoom">
          <v-container>
            <v-row align="stretch">
              <v-col cols="12" v-if="hotel" class="mb-3">
                <v-card class="card-header">
                  <v-img
                    :src="'images/mocks/' + hotel.image"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="150px"
                    cover
                  >
                    <v-card-title class="text-h5 d-flex align-center ga-5">
                      {{ hotel.name }}
                      <v-chip prepend-icon="mdi-currency-usd" variant="tonal">
                        {{ formatToBRL(hotel.price) }}
                      </v-chip>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="name"
                  v-model="formData.name"
                  label="Nome"
                  placeholder="Insera seu nome"
                  :rules="[rules.required]"
                  hide-details
                  required
                  variant="solo-filled"
                  flat
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="checkInDate"
                  v-model="formData.contact"
                  label="Contato"
                  :rules="[rules.required]"
                  hide-details
                  required
                  variant="solo-filled"
                  flat
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  id="rooms"
                  v-model="formData.paymentMethod"
                  label="Metodo de pagamento"
                  placeholder="Selecione um método de pagamento"
                  :rules="[rules.required]"
                  :items="['Boleto', 'Pix', 'Crédito', 'Débito']"
                  hide-details
                  required
                  variant="solo-filled"
                  flat
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" :order-md="2">
                <v-btn type="submit" flat>Confirmar</v-btn>
              </v-col>

              <v-col cols="12" md="6" :order-md="1">
                <v-btn variant="outlined" @click="close">Cancel</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useBookingStore } from '@/store/booking';
import { formatToBRL } from '@/utils';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const localIsOpen = ref(props.isOpen);
    const bookingStore = useBookingStore();
    const hotel = computed(() => bookingStore.hotel);
    const formValid = ref(false);
    const formData = ref({
      name: '',
      contact: '',
      paymentMethod: null,
    });

    watch(localIsOpen, (newVal) => {
      emit('update:isOpen', newVal);
    });

    watch(
      () => props.isOpen,
      (newVal) => {
        localIsOpen.value = newVal;
      },
    );

    const rules = {
      required: (value: any) => !!value || 'Obrigatório.',
    };

    const submitBookRoom = async () => {
      if (formValid.value) {
        try {
          await bookingStore.bookRoom(formData.value);
          close();
        } catch (error) {
          console.error('Erro na reserva.', error);
        }
      }
    };

    const close = () => {
      localIsOpen.value = false;
    };

    return {
      formData,
      formValid,
      rules,
      localIsOpen,
      submitBookRoom,
      close,
      hotel,
      formatToBRL,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-header {
  color: $neutralcolor-gray-softest;
}
button {
  &.v-btn {
    cursor: pointer;
    width: 100%;
    &:not(&.v-btn--variant-outlined) {
      background-color: $primary-color;
      color: white;
    }
    &.v-btn--variant-outlined {
      border-collapse: $secondary-color;
    }
  }
}
</style>
