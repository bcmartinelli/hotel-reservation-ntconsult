<template>
  <v-app>
    <Notification />
    <HeaderComponent />
    <router-view />
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

<style lang="scss">
#app {
  // max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
}
</style>
