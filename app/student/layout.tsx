import { HUDProvider } from "@/lib/contexts/hud-context"

export default function StudentLayout({ children }) {
  return <HUDProvider>{children}</HUDProvider>
}
