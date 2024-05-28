import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from '../test-utils';
import router from '@/router';
import { Notification as NotificationType } from '@/types';
import { useNotification } from '@/services/notificationService';
import Notification from '@/components/Notification.vue';


describe('Notification.vue', () => {
  let wrapper: any;
  let notifications: NotificationType[];

  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  })

  beforeEach(() => {
    wrapper = mountWithVuetify(Notification);
  });

  it('should renders notification correctly', async () => {
    const { notify } = useNotification();
    const notification: Omit<NotificationType, 'active'>  = {
      message: 'Test Notification',
      color: 'success',
    };
    notify(notification)
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentNotification).toEqual({...notification, active: true});
    await wrapper.vm.$nextTick();

    expect(wrapper.find('v-snackbar').exists()).toBe(true);
    expect(wrapper.find('v-snackbar').text()).toContain('Test Notification');
  });

  it('should removes notification after timeout', async () => {
    vi.useFakeTimers();
    const { notify } = useNotification();
    const notification: Omit<NotificationType, 'active'> = {
      message: 'Test Notification',
      color: 'success',
    };
    notify(notification)
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentNotification.active).toBe(true);

    vi.advanceTimersByTime(3000);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentNotification.active).toBe(false);
  });

  it('should closes notification on close function is called', async () => {
    vi.useFakeTimers();
    const { notify } = useNotification();
    const notification: Omit<NotificationType, 'active'> = {
      message: 'Test Notification',
      color: 'success',
    };
    notify(notification)
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentNotification.active).toBe(true);
    wrapper.vm.closeSnackbar()
    vi.advanceTimersByTime(3000);

    expect(wrapper.vm.currentNotification.active).toBe(false);
  });
});
