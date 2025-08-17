export const ALLOWED_PROVIDER_ORIGINS = [
  "https://gpo.emis.co.ao", // EMIS production domain
];

export const PAYMENT_CONFIG = {
  allowedOrigins: ALLOWED_PROVIDER_ORIGINS,
  // Add other payment-related config here
} as const;
