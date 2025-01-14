import { Protected } from '@/components/OurComponent/AuthMiddleware'
import LogbookProgress from '@/components/OurComponent/Logbook/progress'
import Navbar from '@/components/OurComponent/Navbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/logbookprogress')({
  component: () => (
    <Protected>
      <ProgressLogbook/>
    </Protected>
  ),
})

function ProgressLogbook() {

  return (
    <>
        <Navbar isAuth={true}/>
        <LogbookProgress logbookId={"logbook2"} />
    </>
  )
}
