import React from 'react'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
import { arbitrum, mainnet, sepolia } from 'viem/chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider } from 'wagmi'

import Layout from '@components/Layout/Layout'
import { ModalProvider } from '@contexts/modal'

import '@rainbow-me/rainbowkit/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const config = getDefaultConfig({
  appName: 'sbee',
  projectId: 'bef20457db1e7ba1cc95c0cacc1b1f25',
  chains: process.env.NEXT_PUBLIC_APP_ENV !== 'prod' ? [arbitrum] : [mainnet],
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/9Ceal3Ec4cU9jQBauht6n_f38pJSbl-a'
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/AqOqR8fNqnks-_Cv2Lo4jSpph7eIHjMH'
    ),
    [arbitrum.id]: http(
      'https://arb-mainnet.g.alchemy.com/v2/ABcd5TtOo9aMmXmB1vMXZK-MeE9etJEO'
    )
  },
  ssr: true
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const isPlayPage = router.pathname.startsWith('/play')
  if (isPlayPage) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />{' '}
        </QueryClientProvider>
      </WagmiProvider>
    )
  }
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <NextUIProvider>
              <NextThemesProvider attribute='class' defaultTheme='light'>
                <main className={`${inter.variable} font-sans`}>
                  <ModalProvider>
                    <Head>
                      <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                      />
                    </Head>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ModalProvider>
                  <ToastContainer autoClose={1000} />
                </main>
              </NextThemesProvider>
            </NextUIProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
