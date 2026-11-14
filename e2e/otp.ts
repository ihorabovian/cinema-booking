import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

// The API lists every one-time code it "sends" at /otps, so a test can read its own
// instead of waiting for an SMS. Asking again returns the same code until it expires.
export async function readOtpCode(phone: string) {
  const response = await fetch(`${process.env.API_BASE_URL}/otps`);
  const html = await response.text();

  const rows = [...html.matchAll(/<td>([^<]*)<\/td>\s*<td>(\d+)<\/td>/g)];
  const row = rows.find(([, rowPhone]) => rowPhone === phone);
  if (!row) throw new Error(`No code for ${phone} at /otps`);

  return row[2];
}
