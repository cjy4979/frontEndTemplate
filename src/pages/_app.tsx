import store from '../reduxFeatures/store'
import '@fortawesome/fontawesome-free/css/all.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any

  return (
    <Provider store={store}>
      <AnyComponent {...pageProps} />
    </Provider>
  )
}
