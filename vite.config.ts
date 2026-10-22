import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { handleLead, type LeadEnv } from './server/lead'

/** `npm run dev` / `npm run preview` da ham POST /api/lead ishlashi uchun. */
function leadApi(env: LeadEnv): Plugin {
  const middleware = (
    req: import('node:http').IncomingMessage,
    res: import('node:http').ServerResponse,
    next: () => void,
  ) => {
    if (req.url !== '/api/lead' || req.method !== 'POST') return next()
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 4000) req.destroy()
    })
    req.on('end', async () => {
      let body: unknown = null
      try {
        body = JSON.parse(raw)
      } catch {
        /* handleLead noto'g'ri body uchun 400 qaytaradi */
      }
      const result = await handleLead(body, env)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    })
  }
  return {
    name: 'navdo-lead-api',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefiks: VITE_ bo'lmagan maxfiy o'zgaruvchilar faqat serverda o'qiladi
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), leadApi(env)],
  }
})
