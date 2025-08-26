import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import superjson from 'superjson';
import type { AppRouter } from '~~/server/trpc/routers';

export default defineNuxtPlugin(() => {
  const api = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        maxURLLength: 4000,
        headers() {
          return {
            Authorization: localStorage.getItem('accessToken') || '',
          };
        },
      }),
    ],
    transformer: superjson,
  });

  return {
    provide: {
      api,
    },
  };
});