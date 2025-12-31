// Liste des adresses IP autorisées (IP publique de ta box, VPN, etc.)
export const ALLOWED_IPS = (import.meta.env.VITE_PORTAL_IPS || "")
  .split(',')
  .map((ip: string) => ip.trim())
  .filter((ip: string) => ip.length > 0);