import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import HomePage from '#/components/HomePage';

// A fresh jotai Provider and QueryClient per render keep atom state and
// query cache isolated between tests - without the Provider, jotai falls
// back to one process-wide store shared across every test file bun:test
// runs in the same process.
const renderHome = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <Provider>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </Provider>
  );
};

export { renderHome };
