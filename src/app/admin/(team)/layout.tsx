import { requireTeam } from "@/actions/auth";

// Orders, quote requests and products: admin and production team.
export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  await requireTeam();
  return children;
}
