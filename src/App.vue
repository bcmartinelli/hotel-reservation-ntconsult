<template>
  <v-app>
    <Notification />
    <HeaderComponent />
    <div class="container">
      <router-view />
    </div>
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
