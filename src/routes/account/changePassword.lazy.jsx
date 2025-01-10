import { Protected } from '@/components/OurComponent/AuthMiddleware'
import ChangePassword from '@/components/OurComponent/ChangePassword'
import Navbar from '@/components/OurComponent/Navbar'
import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/ChangePassword')({
  component: () => (
    <Protected>
      <Password />
    </Protected>
  ),
})

function Password() {
  return (
    <>
      <Navbar isAuth={true} />
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-80 space-y-6">
          <DataProfile />
          <SidebarMahasiswa />
        </div>
        <ChangePassword />
      </div>
    </>
  )
}
