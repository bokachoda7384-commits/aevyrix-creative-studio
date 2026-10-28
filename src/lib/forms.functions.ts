import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { inquirySchema, contactSchema } from "./form-schemas";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function makeReference() {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3))).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `AVX-${ymd}-${rand}`;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { reference: makeReference() }; // honeypot: silently drop bots
    const reference = makeReference();
    const { error } = await publicClient().from("inquiries").insert({
      reference,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name || null,
      country: data.country,
      service_category: data.service_category,
      specific_service: data.specific_service || null,
      package: data.package,
      project_title: data.project_title,
      project_description: data.project_description,
      target_audience: data.target_audience || null,
      preferred_style: data.preferred_style || null,
      deliverables: data.deliverables || null,
      budget_range: data.budget_range || null,
      deadline: data.deadline || null,
      reference_links: data.reference_links || null,
      additional_requirements: data.additional_requirements || null,
      service_details: data.service_details,
      privacy_consent: true,
    });
    if (error) {
      console.error("inquiry insert failed", error.message);
      throw new Error("We couldn't save your inquiry. Please try again.");
    }
    return { reference };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { error } = await publicClient().from("contact_messages").insert({
      name: data.name, email: data.email, subject: data.subject || null, message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("We couldn't send your message. Please try again.");
    }
    return { ok: true };
  });
