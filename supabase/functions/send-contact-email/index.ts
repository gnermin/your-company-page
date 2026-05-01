import { corsHeaders } from "npm:@supabase/supabase-js@2.95.0/cors";

interface ContactPayload {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  if (!name || name.length > 100) return { ok: false, error: "Invalid name" };
  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Invalid email" };
  if (!message || message.length > 2000) return { ok: false, error: "Invalid message" };
  if (company.length > 100) return { ok: false, error: "Invalid company" };
  return { ok: true, data: { name, email, message, company: company || null } };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await req.json().catch(() => null);
    const result = validate(json);
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, company, message } = result.data;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #111827;">
        <h2 style="color: #0891b2; margin: 0 0 16px;">Nova poruka sa gnnvision.com</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Ime:</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0891b2;">${escapeHtml(email)}</a></td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Kompanija:</td><td style="padding: 8px 0;">${escapeHtml(company)}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6b7280;">Datum:</td><td style="padding: 8px 0;">${new Date().toLocaleString("bs-BA", { timeZone: "Europe/Sarajevo" })}</td></tr>
        </table>
        <div style="background: #f9fafb; border-left: 4px solid #0891b2; padding: 16px; border-radius: 4px;">
          <div style="color: #6b7280; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Poruka</div>
          <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">Možete direktno odgovoriti na ovaj email — odgovor ide na ${escapeHtml(email)}.</p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NG Consulting <info@gnnvision.com>",
        to: ["nermin.goran@gmail.com"],
        reply_to: email,
        subject: `Nova poruka sa sajta — ${name}`,
        html,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, resendData);
      return new Response(JSON.stringify({ error: "Failed to send email", details: resendData }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent successfully:", resendData);
    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});