import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// The browser's automatic scroll restoration fights both the pages'
// scroll-to-top effects and #section anchor scrolling while content is
// still loading in. Pages manage their own scroll position instead.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
