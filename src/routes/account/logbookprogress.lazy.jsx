import LogbookProgress from '@/components/OurComponent/Logbook/progress'
import Navbar from '@/components/OurComponent/Navbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/logbookprogress')({
  component: ProgressLogbook,
})

function ProgressLogbook() {

  return (
    <>
        <Navbar />
        <LogbookProgress />
    </>
  )
}
