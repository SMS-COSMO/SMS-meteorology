import { useNuxtApp } from '#app';
import type { createTRPCNuxtClient } from 'trpc-nuxt/client';
import type { AppRouter } from '~~/server/trpc/routers';

export function useApi() {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$api as ReturnType<typeof createTRPCNuxtClient<AppRouter>>;
}

export const $api = {
  user: {
    login: {
      mutate: async (input: { schoolId: string; password: string }) => {
        const api = useApi();
        return await api.user.login.mutate(input);
      },
    },
    register: {
      mutate: async (input: {
        schoolId: string;
        username: string;
        password: string;
        role?: 'admin' | 'student' | 'teacher';
      }) => {
        const api = useApi();
        return await api.user.register.mutate(input);
      },
    },
    modifyPassword: {
      mutate: async (input: {
        userId: string;
        oldPassword: string;
        newPassword: string;
      }) => {
        const api = useApi();
        return await api.user.modifyPassword.mutate(input);
      },
    },
  },
};