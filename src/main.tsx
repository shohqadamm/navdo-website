import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { OptInPage } from './pages/OptIn.tsx'

// Oddiy yo'naltirish: Vercel'da /opt-in va /opt-in2 index.html ga rewrite qilinadi (vercel.json)
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const page =
  path === '/opt-in' ? <OptInPage variant="full" /> : path === '/opt-in2' ? <OptInPage variant="short" /> : <App />

createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
