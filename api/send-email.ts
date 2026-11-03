import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Form input goes into an HTML email, so it must be escaped
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, organization, message } = (req.body ?? {}) as {
    name?: string
    email?: string
    organization?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const safe = {
    name: escapeHtml(name.trim()),
    email: escapeHtml(email.trim()),
    organization: organization?.trim() ? escapeHtml(organization.trim()) : '—',
    message: escapeHtml(message.trim()).replace(/\n/g, '<br>'),
  }

  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'aimee@hinewaa.com',
      replyTo: email.trim(),
      subject: `New enquiry from ${name.trim()} — Hinewaa website`,
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
                         font-size: 15px; color: #111;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 15px; color: #111;">
                <a href="mailto:${safe.email}" style="color: #2c5f4f;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Organisation</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;
                         font-size: 15px; color: #111;">${safe.organization}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0;
                         font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
                         color: #888; vertical-align: top;">Message</td>
              <td style="padding: 12px 0;
                         font-size: 15px; color: #111; line-height: 1.6;">
                ${safe.message}
              </td>
            </tr>
          </table>

          <p style="margin: 32px 0 0; font-size: 12px; color: #bbb;">
            Sent from hinewaa.com contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('[send-email]', error.message)
      return res.status(502).json({ error: 'Email could not be sent' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[send-email]', err instanceof Error ? err.message : err)
    return res.status(500).json({ error: 'Email could not be sent' })
  }
}
