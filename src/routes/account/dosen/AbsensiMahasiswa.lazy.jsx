import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/dosen/AbsensiMahasiswa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/dosen/AbsensiMahasiswa"!</div>
}
