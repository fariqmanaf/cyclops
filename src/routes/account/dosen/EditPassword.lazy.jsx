import ChangePasswordDosen from '@/components/OurComponent/ChangePassword/dosen'
import Navbar from '@/components/OurComponent/Navbar'
import DataProfileDosen from '@/components/OurComponent/Profile/ProfileDosen'
import SidebarDosen from '@/components/OurComponent/Sidebar/Dosen'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/dosen/EditPassword')({
  component: PasswordDosen,
})

function PasswordDosen() {
  return (
    <>
      <Navbar isAuth={true} />
      <div className='container mx-auto p-6 flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-80 space-y-6'>
          <DataProfileDosen />
          <SidebarDosen />
        </div>
        <ChangePasswordDosen />
      </div>
    </>
  )
}
