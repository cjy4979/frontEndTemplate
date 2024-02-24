import store from '../reduxFeatures/store'
import '@fortawesome/fontawesome-free/css/all.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import React from 'react'
import { Provider } from 'react-redux'
import theme from '../theme/themeConfig'
import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AnyComponent {...pageProps} />
      </ConfigProvider>
    </Provider>
  )
}
