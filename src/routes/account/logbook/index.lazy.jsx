import { Protected } from '@/components/OurComponent/AuthMiddleware'
import Logbook from '@/components/OurComponent/Logbook'
import Navbar from '@/components/OurComponent/Navbar'
import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/logbook/')({
  component: () => (
    <Protected roles={['mahasiswa']}>
      <LogbookView />
    </Protected>
  ),
})

function LogbookView() {
  return (
    <>
      <Navbar isAuth={true} />
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-0 md:mt-[10vh]">
        <div className="w-full md:w-80 space-y-6">
          <DataProfile />
          <SidebarMahasiswa />
        </div>
        <Logbook />
      </div>
    </>
  )
}
