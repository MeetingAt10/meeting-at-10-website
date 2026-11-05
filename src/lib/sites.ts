/** Where each site lives. Override per environment with the NEXT_PUBLIC_* variables (inlined at build time). Signed-in modules are paths on the portal. */
export const sites = {
  landing: process.env.NEXT_PUBLIC_LANDING_URL ?? 'https://access-ccs.com',
  portal: process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.access-ccs.com',
  design: process.env.NEXT_PUBLIC_DESIGN_URL ?? 'https://design.access-ccs.com',
  meeting: process.env.NEXT_PUBLIC_MEETING_URL ?? 'https://team.access-ccs.com',
} as const;
