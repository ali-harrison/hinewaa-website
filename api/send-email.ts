import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).set(CORS_HEADERS).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).set(CORS_HEADERS).json({ error: 'Method not allowed' })
  }

  const { name, email, organization, message } = req.body as {
    name: string
    email: string
    organization?: string
    message: string
  }

  if (!name || !email || !message) {
    return res.status(400).set(CORS_HEADERS).json({ error: 'Missing required fields' })
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'aimee@hinewaa.com',
      subject: `New enquiry from ${name} — Hinewaa website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="margin: 0 0 24px; font-size: 20px; color: #111;">
            New enquiry via hinewaa.com
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; width: 140px;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 15px; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 15px; color: #111;">
                <a href="mailto:${email}" style="color: #2c5f4f;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Organisation</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 15px; color: #111;">${organization || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Kaupapa</td>
              <td style="padding: 12px 0;
                         font-size: 15px; color: #111; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </td>
            </tr>
          </table>

          <p style="margin: 32px 0 0; font-size: 12px; color: #bbb;">
            Sent from hinewaa.com contact form
          </p>
        </div>
      `,
    })

    return res.status(200).set(CORS_HEADERS).json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[send-email]', message)
    return res.status(500).set(CORS_HEADERS).json({ error: message })
  }
}
