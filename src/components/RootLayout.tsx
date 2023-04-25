import React, { type ReactNode } from 'react'
import Header from './Header'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider } from '@radix-ui/react-tooltip'

const font = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })

const headerHiddenRoutes = ['/auth/sign-in', '/auth/sign-up', '/about', '/posts/write']

const RootLayout = ({ children }: { children: ReactNode }) => {
    const { pathname } = useRouter()
  return (
    <main className={font.className}>
        <Head>
          <meta name='description' content='An offical Postify website'/>
        </Head>
        { !headerHiddenRoutes.includes(pathname) ? <Header /> : null }
        <Provider>
          { children }
        </Provider>
    </main>
  )
}

export default RootLayout