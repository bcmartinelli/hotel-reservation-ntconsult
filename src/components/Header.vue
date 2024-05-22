<template>
  <v-app-bar :elevation="0" class="pt-0 ps-4 mb-4">
    <v-app-bar-title>
      <RouterLink to="/">NT <span>Hotel Booking</span></RouterLink>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.v-app-bar.v-app-bar.v-toolbar {
  position: relative !important;
  background: $neutralcolor-gray-softest;
  text-align: left;
  .v-toolbar-title {
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    font-weight: bold;
    a {
      transition: all 0.3s ease;
      color: $primary-color;
      cursor: pointer;
      span {
        color: $secondary-color;
      }
      &:hover {
        text-decoration: none;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
