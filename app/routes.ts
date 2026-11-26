/*
 * Where each call-to-action goes. Buttons across the site call onDemo(label); labels listed here navigate to a
 * real page, anything else still opens the placeholder dialog.
 */
export const solutionSlugs = {
  payments: "customer-acquisition",
  billing: "ai-front-office",
  radar: "business-operations",
  issuing: "financial-administration",
  crypto: "customer-experience",
  connect: "business-intelligence",
} as const;

export const ctaRoutes: Record<string, string> = {
  "Explore automation": "/contact",
  "Get an automation assessment": "/contact",
  "Request an assessment": "/contact",
  "Contact us": "/contact?topic=general",
  "Introducing the new botLane": "/about",
  "Cookie settings": "/cookies",
};

/** Navigates if the label has a page; returns false when it doesn't. */
export function goTo(label: string) {
  const path = ctaRoutes[label];
  if (!path) return false;
  window.location.href = path;
  return true;
}
