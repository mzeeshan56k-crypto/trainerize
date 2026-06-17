import { ClientShell } from "@/components/client/ClientShell";
import { getCurrentClient } from "@/lib/session";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getCurrentClient();
  return (
    <ClientShell clientName={client.name} clientInitials={client.avatar}>
      {children}
    </ClientShell>
  );
}
