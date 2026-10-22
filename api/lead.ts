// Vercel Function: POST /api/lead
// '.js' kengaytma: Vercel ESM'da lead.ts → lead.js bo'lib kompilyatsiya qilinadi
// Env (Vercel → Settings → Environment Variables): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
import { handleLead } from '../server/lead.js'

export async function POST(request: Request) {
  const raw = await request.text()
  if (raw.length > 4000) return Response.json({ ok: false, error: 'too_large' }, { status: 413 })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }
  const result = await handleLead(body, process.env)
  return Response.json(result.body, { status: result.status })
}
