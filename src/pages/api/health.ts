import type { NextApiRequest, NextApiResponse } from 'next'

type HealthResponse = {
  app: 'hegelandai'
  environment: string
  status: 'ok'
  timestamp: string
  uptimeSeconds: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse | { error: string }>,
) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method === 'HEAD') {
    res.status(200).end()
    return
  }

  res.status(200).json({
    app: 'hegelandai',
    environment: process.env.NODE_ENV ?? 'unknown',
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  })
}
