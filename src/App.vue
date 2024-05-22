<template>
  <v-app>
    <Notification />
    <HeaderComponent />
    <v-main class="router-container pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';

export default defineComponent({
  components: { Notification, HeaderComponent },
});
</script>

<style lang="scss" scoped>
.rounter-container {
  width: 100%;
  max-width: 1280px;
}
</style>
