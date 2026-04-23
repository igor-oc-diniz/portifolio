import { useCallback, useState } from 'react'

// Em dev, aponta pro worker local (wrangler dev roda na 8787).
// Em produção, aponta pro worker deployado na Cloudflare.
const WORKER_URL =
  import.meta.env.VITE_WORKER_URL ?? 'http://localhost:8787'

interface AIChatState {
  loading: boolean
  error: string | null
}

export function useAIChat() {
  const [state, setState] = useState<AIChatState>({ loading: false, error: null })

  const ask = useCallback(async (message: string): Promise<string> => {
    setState({ loading: true, error: null })

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) throw new Error(`Worker responded with ${res.status}`)

      const data = await res.json() as { reply: string }
      setState({ loading: false, error: null })
      return data.reply
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setState({ loading: false, error: msg })
      throw err
    }
  }, [])

  return { ...state, ask }
}
