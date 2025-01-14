import { createLazyFileRoute } from '@tanstack/react-router'
import DataDokumen from '@/components/OurComponent/Document'
import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import Navbar from '@/components/OurComponent/Navbar'
import { Protected } from '@/components/OurComponent/AuthMiddleware'

export const Route = createLazyFileRoute('/account/document')({
  component: () => (
    <Protected roles={['mahasiswa']}>
      <DocumentView/>
    </Protected>
  ),
})

function DocumentView() {

  return (
    <>
        <Navbar isAuth={true} />
        <div className='container mx-auto p-6 flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-80 space-y-6'>
                <DataProfile />
                <SidebarMahasiswa />
            </div>
            <DataDokumen />
        </div>
    </>
  )
}
