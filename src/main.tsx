import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { OptInPage } from './pages/OptIn.tsx'
import { Loader } from './components/Loader.tsx'
import { Cursor } from './components/Cursor.tsx'
import { initSmoothScroll } from './lib/smooth.ts'

initSmoothScroll()

// Oddiy yo'naltirish: Vercel'da /opt-in va /opt-in2 index.html ga rewrite qilinadi (vercel.json)
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const isOptIn = path === '/opt-in' || path === '/opt-in2'
const page = path === '/opt-in' ? <OptInPage variant="full" /> : path === '/opt-in2' ? <OptInPage variant="short" /> : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Reklama sahifalarida loader qisqaroq — har soniya konversiyaga ta'sir qiladi */}
    <Loader minMs={isOptIn ? 900 : 1700} />
    {page}
    <Cursor />
  </StrictMode>,
)
