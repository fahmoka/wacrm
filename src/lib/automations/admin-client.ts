import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy, shared service-role client for automation engine work.
// Mirrors the pattern used by the webhook handler
// (src/app/api/whatsapp/webhook/route.ts).
const DEFAULT_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZGh2Z25sZm95amdycHpmdGVqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDY4NTE4NSwiZXhwIjoyMTAwMjYxMTg1fQ.eoExslGQjg3l7hHr5ICtwYkFiIj2WnUPnAq6dY4Oil4'

export function supabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ckdhvgnlfoyjgrpzftej.supabase.co'
  let key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key || key.includes('your-service-role-key') || key.startsWith('sb_publishable')) {
    key = DEFAULT_SERVICE_ROLE_KEY
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
