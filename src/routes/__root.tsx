import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import appCss from '../styles.css?url'

const TITLE = 'SuperRetroWeather';
const DESCRIPTION = 'A free open-source 8-bit weather app.';
const URL = 'https://superretroweather.onrender.com/';
const OG_IMAGE = '/images/SRW_OG_LOGO.png';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: TITLE,
        description: DESCRIPTION 
      },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:type', content: 'website' },
      
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: URL },
      { property: 'twitter:title', content: TITLE },
      { property: 'twitter:description', content: DESCRIPTION },
      { property: 'twitter:image', content: OG_IMAGE },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      }
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              {
                name: 'React Query',
                render: <ReactQueryDevtoolsPanel />
              }
            ]}
          />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  )
}
