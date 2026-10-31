import { requireAdmin } from "@/actions/auth";

// Dashboard, blog, videos, settings and team accounts: admin role only.
export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}
