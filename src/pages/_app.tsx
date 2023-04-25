import RootLayout from '@/components/RootLayout';
import '@/styles/globals.css'
import { trpc } from '@/utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <ClerkProvider {...pageProps}>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </ClerkProvider>
}

export default trpc.withTRPC(App);
// export default App