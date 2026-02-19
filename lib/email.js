/**
 * ProExpress — Email Notification Service
 *
 * Singleton Nodemailer transporter + branded HTML templates for
 * quote-request and contact-form notifications.
 *
 * Required environment variables (see README for full details):
 *   SMTP_HOST     — SMTP server hostname
 *   SMTP_PORT     — 465 (implicit TLS) or 587 (STARTTLS)
 *   SMTP_USER     — SMTP authentication username / address
 *   SMTP_PASS     — SMTP authentication password
 *   SMTP_FROM     — Sender label, e.g. "ProExpress <noreply@yourdomain.com>"
 *   NOTIFY_EMAIL  — Recipient address for all lead notifications
 *
 * If any variable is missing the functions log a warning and resolve without
 * throwing, so a mis-configured mailer never kills a form submission.
 */

import nodemailer from 'nodemailer'

// ─── Singleton transporter ────────────────────────────────────────────────────

let _transporter = null

function getTransporter() {
  if (_transporter) return _transporter

  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      'Email not configured: SMTP_HOST, SMTP_USER, and SMTP_PASS must all be set.'
    )
  }

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,   // true for implicit TLS (465), false for STARTTLS (587)
    auth: { user, pass },
    pool: true,             // reuse connections across requests
    maxConnections: 5,
    maxMessages: 100,
    connectionTimeout: 10_000,  // 10 s — fail fast rather than hang
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })

  return _transporter
}

// ─── Shared template helpers ──────────────────────────────────────────────────

const BRAND_BLUE  = '#0066FF'
const BRAND_NAVY  = '#0A0F2C'
const PHONE       = '414-324-9699'
const PHONE_LINK  = 'tel:4143249699'

/** Wraps any inner HTML in the shared ProExpress email chrome. */
function wrapTemplate({ subject, previewText, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F4F6FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;&zwnj;</div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F6FA;">
    <tr><td align="center" style="padding:32px 16px;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);max-width:600px;width:100%;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background-color:${BRAND_NAVY};padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="display:inline-block;background:${BRAND_BLUE};border-radius:8px;padding:8px 12px;vertical-align:middle;margin-right:10px;">
                    <span style="color:#ffffff;font-size:18px;font-weight:900;letter-spacing:-0.5px;">&#x1F69A;</span>
                  </div>
                  <span style="color:#ffffff;font-size:22px;font-weight:800;vertical-align:middle;">
                    Pro<span style="color:${BRAND_BLUE};">Express</span>
                  </span>
                </td>
                <td align="right">
                  <span style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Lead Notification</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── BODY ── -->
        <tr>
          <td style="padding:32px;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- ── CALL-TO-ACTION BUTTON ── -->
        <tr>
          <td style="padding:0 32px 32px;text-align:center;">
            <a href="${PHONE_LINK}"
               style="display:inline-block;background-color:${BRAND_BLUE};color:#ffffff;text-decoration:none;font-size:17px;font-weight:800;padding:16px 40px;border-radius:10px;letter-spacing:0.3px;">
              &#128222;&nbsp; Call Lead Now: ${PHONE}
            </a>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="background-color:#F4F6FA;padding:20px 32px;border-top:1px solid #E8ECF2;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color:#9BA3AF;font-size:11px;line-height:1.6;">
                  <strong style="color:#6B7280;">ProExpress</strong> &mdash; 1234 Industrial Dr, Milwaukee, WI 53201<br/>
                  <a href="${PHONE_LINK}" style="color:${BRAND_BLUE};text-decoration:none;">${PHONE}</a>
                  &nbsp;&bull;&nbsp;
                  <a href="mailto:info@proexpress.com" style="color:${BRAND_BLUE};text-decoration:none;">info@proexpress.com</a>
                </td>
                <td align="right" style="color:#D1D5DB;font-size:11px;white-space:nowrap;">
                  &copy; ${new Date().getFullYear()} ProExpress
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td></tr>
  </table>
</body>
</html>`
}

/**
 * Renders a two-column label / value table row.
 * `empty` rows (blank value) are included so the agent can see every field.
 */
function row(label, value) {
  const display = (value && String(value).trim()) ? String(value).trim() : '<span style="color:#D1D5DB;">—</span>'
  return `<tr>
    <td style="padding:10px 14px;background:#F9FAFB;border-bottom:1px solid #F3F4F6;width:42%;vertical-align:top;">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#6B7280;">${label}</span>
    </td>
    <td style="padding:10px 14px;background:#ffffff;border-bottom:1px solid #F3F4F6;vertical-align:top;">
      <span style="font-size:14px;color:#111827;">${display}</span>
    </td>
  </tr>`
}

/** Section heading row inside a data table. */
function sectionHead(title) {
  return `<tr>
    <td colspan="2" style="padding:12px 14px 8px;background:${BRAND_NAVY};border-radius:6px 6px 0 0;">
      <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:rgba(255,255,255,0.7);">${title}</span>
    </td>
  </tr>`
}

/** Wraps rows in a clean bordered table. */
function dataTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="border-radius:8px;overflow:hidden;border:1px solid #E5E7EB;margin-bottom:24px;">
    ${rows}
  </table>`
}

// ─── Quote notification ───────────────────────────────────────────────────────

function buildQuoteHtml(doc) {
  const serviceLabel = doc.service_type === 'sprinter'
    ? 'Sprinter Van / Cargo Van'
    : doc.service_type === 'straight_truck'
    ? 'Straight Truck'
    : doc.service_type || '—'

  const bodyHtml = `
    <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:${BRAND_NAVY};">New Quote Request</p>
    <p style="margin:0 0 24px;font-size:13px;color:#6B7280;">
      Submitted ${new Date(doc.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
      &nbsp;&bull;&nbsp; ID: <code style="font-size:11px;background:#F3F4F6;padding:2px 5px;border-radius:4px;">${doc.id}</code>
    </p>

    ${dataTable(`
      ${sectionHead('Contact Information')}
      ${row('Full Name',    doc.full_name)}
      ${row('Company',      doc.company_name)}
      ${row('Email',        doc.email ? `<a href="mailto:${doc.email}" style="color:${BRAND_BLUE};">${doc.email}</a>` : '')}
      ${row('Phone',        doc.phone  ? `<a href="tel:${doc.phone.replace(/\D/g,'')}" style="color:${BRAND_BLUE};">${doc.phone}</a>` : '')}
    `)}

    ${dataTable(`
      ${sectionHead('Shipment Details')}
      ${row('Service Type',       serviceLabel)}
      ${row('Pickup Location',    doc.pickup_location)}
      ${row('Delivery Location',  doc.delivery_location)}
      ${row('Pickup Date',        doc.pickup_date)}
      ${row('Delivery Deadline',  doc.delivery_deadline)}
    `)}

    ${dataTable(`
      ${sectionHead('Freight Information')}
      ${row('Freight Description', doc.freight_description)}
      ${row('Weight (lbs)',        doc.weight)}
      ${row('Additional Notes',    doc.additional_notes)}
    `)}

    <p style="margin:20px 0 0;font-size:13px;color:#6B7280;line-height:1.6;">
      Reply to this email or click the button below to call the lead directly.
    </p>
  `

  return wrapTemplate({
    subject: `New Quote Request — ${doc.full_name || 'Unknown'} (${doc.company_name || 'No Company'})`,
    previewText: `${doc.full_name} from ${doc.company_name || 'Unknown'} needs a quote: ${doc.pickup_location} → ${doc.delivery_location}`,
    bodyHtml,
  })
}

// ─── Contact notification ─────────────────────────────────────────────────────

function buildContactHtml(doc) {
  const bodyHtml = `
    <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:${BRAND_NAVY};">New Contact Form Submission</p>
    <p style="margin:0 0 24px;font-size:13px;color:#6B7280;">
      Submitted ${new Date(doc.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
      &nbsp;&bull;&nbsp; ID: <code style="font-size:11px;background:#F3F4F6;padding:2px 5px;border-radius:4px;">${doc.id}</code>
    </p>

    ${dataTable(`
      ${sectionHead('Contact Information')}
      ${row('Name',  doc.name)}
      ${row('Email', doc.email ? `<a href="mailto:${doc.email}" style="color:${BRAND_BLUE};">${doc.email}</a>` : '')}
      ${row('Phone', doc.phone ? `<a href="tel:${doc.phone.replace(/\D/g,'')}" style="color:${BRAND_BLUE};">${doc.phone}</a>` : '')}
    `)}

    ${dataTable(`
      ${sectionHead('Message')}
      <tr>
        <td colspan="2" style="padding:14px;background:#ffffff;font-size:14px;color:#111827;line-height:1.7;white-space:pre-wrap;">${
          doc.message
            ? doc.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            : '<span style="color:#D1D5DB;">No message provided.</span>'
        }</td>
      </tr>
    `)}

    <p style="margin:20px 0 0;font-size:13px;color:#6B7280;line-height:1.6;">
      Reply to this email or call the contact directly using the button below.
    </p>
  `

  return wrapTemplate({
    subject: `New Contact Message — ${doc.name || 'Unknown'}`,
    previewText: `${doc.name} sent a message via the ProExpress contact form.`,
    bodyHtml,
  })
}

// ─── Public send helpers ──────────────────────────────────────────────────────

/**
 * Sends a formatted quote-request notification email.
 * Resolves silently on SMTP misconfiguration or delivery failure —
 * never throws, so MongoDB saves are never blocked.
 */
export async function sendQuoteNotification(doc) {
  const notifyEmail = process.env.NOTIFY_EMAIL
  if (!notifyEmail) {
    console.warn('[ProExpress Email] NOTIFY_EMAIL is not set — skipping quote notification.')
    return
  }

  let transporter
  try {
    transporter = getTransporter()
  } catch (configErr) {
    console.warn('[ProExpress Email] SMTP not configured —', configErr.message)
    return
  }

  const subject = `New Quote Request — ${doc.full_name || 'Unknown'} (${doc.company_name || 'No Company'})`
  const html    = buildQuoteHtml(doc)

  try {
    const info = await transporter.sendMail({
      from:     process.env.SMTP_FROM || process.env.SMTP_USER,
      to:       notifyEmail,
      replyTo:  doc.email || undefined,
      subject,
      html,
    })
    console.log(`[ProExpress Email] Quote notification sent → ${notifyEmail} (messageId: ${info.messageId})`)
  } catch (sendErr) {
    console.error('[ProExpress Email] Quote notification failed:', sendErr.message)
    // Intentionally swallowed — form submission already succeeded.
  }
}

/**
 * Sends a formatted contact-form notification email.
 * Same fire-and-forget contract as sendQuoteNotification.
 */
export async function sendContactNotification(doc) {
  const notifyEmail = process.env.NOTIFY_EMAIL
  if (!notifyEmail) {
    console.warn('[ProExpress Email] NOTIFY_EMAIL is not set — skipping contact notification.')
    return
  }

  let transporter
  try {
    transporter = getTransporter()
  } catch (configErr) {
    console.warn('[ProExpress Email] SMTP not configured —', configErr.message)
    return
  }

  const subject = `New Contact Message — ${doc.name || 'Unknown'}`
  const html    = buildContactHtml(doc)

  try {
    const info = await transporter.sendMail({
      from:     process.env.SMTP_FROM || process.env.SMTP_USER,
      to:       notifyEmail,
      replyTo:  doc.email || undefined,
      subject,
      html,
    })
    console.log(`[ProExpress Email] Contact notification sent → ${notifyEmail} (messageId: ${info.messageId})`)
  } catch (sendErr) {
    console.error('[ProExpress Email] Contact notification failed:', sendErr.message)
  }
}
