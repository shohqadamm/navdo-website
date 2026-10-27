import type { PackageId } from '../data/content'
import { scrollToElement } from './smooth'

export const AUDIT_EVENT = 'navdo:audit'

export type AuditDetail = { packageId?: PackageId; source: string }

/** Formaga silliq scroll qiladi va (ixtiyoriy) paketni oldindan tanlaydi. */
export function goToAudit(source: string, packageId?: PackageId) {
  window.dispatchEvent(new CustomEvent<AuditDetail>(AUDIT_EVENT, { detail: { source, packageId } }))
  const form = document.getElementById('audit')
  if (!form) return
  scrollToElement(form)
  // Scroll tugagach birinchi maydonga fokus — klaviatura foydalanuvchilari uchun
  window.setTimeout(() => {
    document.getElementById('lead-name')?.focus({ preventScroll: true })
  }, 1200)
}
