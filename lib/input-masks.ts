// Masks format a value as the user types. Each one keeps only the digits it needs.

function digits(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

// Canadian numbers: "(416) 555-0123". A leading country code 1 is dropped.
export function maskPhone(value: string) {
  const phone = digits(value, 11).replace(/^1/, "").slice(0, 10);

  if (phone.length < 4) return phone;
  if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
}

// "4111 1111 1111 1111"
export function maskCardNumber(value: string) {
  return digits(value, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

// "12/26"
export function maskExpiry(value: string) {
  const expiry = digits(value, 4);
  return expiry.length > 2 ? `${expiry.slice(0, 2)}/${expiry.slice(2)}` : expiry;
}

export function maskCvv(value: string) {
  return digits(value, 4);
}
