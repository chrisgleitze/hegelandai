import type { NextApiRequest, NextApiResponse } from 'next'

import { getLiteratureData } from '@/lib/literature'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    res.status(404).json({ error: 'Not found' })
    return
  }

  try {
    const data = getLiteratureData()

    res.setHeader('Cache-Control', 'no-store, max-age=0')
    res.status(200).json({
      data,
      generatedAt: Date.now(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}
