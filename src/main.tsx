import { Provider as JotaiProvider } from 'jotai'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { App } from './app'
import { initThemeSync, store } from './jotai'

initThemeSync()

// biome-ignore lint/style/noNonNullAssertion: root element exists
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider store={store}>
      <App />
    </JotaiProvider>
  </StrictMode>
)
