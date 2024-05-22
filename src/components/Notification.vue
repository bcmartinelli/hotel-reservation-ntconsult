<template>
  <v-snackbar
    v-if="currentNotification"
    v-model="currentNotification.active"
    :timeout="currentNotification.timeout"
    :color="currentNotification.color"
    @click="closeSnackbar"
    location="top right"
  >
    {{ currentNotification.message }}
    <template v-slot:actions>
      <v-btn icon @click="closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useNotification } from '@/services/notificationService';
import { Notification } from '@/types';

export default defineComponent({
  setup() {
    const { notifications, remove } = useNotification();
    const currentNotification = ref<Notification | null>(null);

    watch(
      () => notifications,
      (newNotifications) => {
        if (!currentNotification.value && newNotifications.length > 0) {
          showNextNotification();
        }
      },
      { deep: true },
    );

    const showNextNotification = () => {
      if (notifications.length > 0) {
        currentNotification.value = notifications[0];
        currentNotification.value.active = true;
        setTimeout(() => {
          handleTimeout();
        }, currentNotification.value.timeout || 3000);
      }
    };

    const handleTimeout = () => {
      closeSnackbar();
    };

    const closeSnackbar = () => {
      if (currentNotification.value) {
        currentNotification.value.active = false;
        setTimeout(() => {
          if (currentNotification.value) {
            remove(currentNotification.value);
            currentNotification.value = null;
            showNextNotification();
          }
        }, 300);
      }
    };

    return { currentNotification, closeSnackbar, handleTimeout };
  },
});
</script>
