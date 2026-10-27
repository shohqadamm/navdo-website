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
    {/* Loader logo animatsiyasi tugaguncha turadi; opt-in'da yopilishdan oldingi pauza qisqaroq */}
    <Loader holdMs={isOptIn ? 100 : 300} />
    {page}
    <Cursor />
  </StrictMode>,
)
