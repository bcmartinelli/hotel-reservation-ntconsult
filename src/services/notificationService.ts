import { Notification } from '@/types';
import { reactive } from 'vue';

const notifications = reactive<Notification[]>([]);

export function useNotification() {
  function notify(notification: Omit<Notification, 'active'>) {
    notifications.push({ ...notification, active: true });
  }

  function remove(notification: Notification) {
    const index = notifications.indexOf(notification);
    if (index !== -1) {
      notifications.splice(index, 1);
    }
  }

  return { notifications, notify, remove };
}
