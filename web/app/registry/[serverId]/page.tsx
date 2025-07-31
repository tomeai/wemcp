import LayoutApp from "@/app/components/layout/layout-app"
import { notFound } from "next/navigation"
import ServerDetailClient from "./page-client"

export default function ServerDetailPage({ params }: { params: { serverId: string } }) {
  if (!params.serverId) return notFound()

  return (
    <LayoutApp>
      <ServerDetailClient serverId={params.serverId} />
    </LayoutApp>
  )
}
