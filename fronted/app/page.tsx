import HomePage from "@/app/components/home/home-page"
import LayoutApp from "./components/layout/layout-app"

export default async function Home() {
  return (
    // @ts-ignore
    <LayoutApp>
      <HomePage />
      {/*<Chat*/}
      {/*  userId={auth?.user?.id}*/}
      {/*  preferredModel={user?.preferred_model || MODEL_DEFAULT}*/}
      {/*/>*/}
    </LayoutApp>
  )
}
