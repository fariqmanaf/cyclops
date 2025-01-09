import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
    MoreVertical 
  } from 'lucide-react';
import Navbar from '@/components/OurComponent/Navbar'

export const Route = createLazyFileRoute('/account/')({
  component: Profile,
})

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user')
      const data = await response.json()

      setUser(data)
    }

    fetchUser()
  }, [])

  const profileData = [
    { label: 'Nama Lengkap', value: 'ADEL NOVAL ALFARIZI' },
    { label: 'Alamat Email', value: 'nopal@gmail.com' },
    { label: 'NIM', value: '2224101030' },
    { label: 'Nomor telepon', value: '0987654321' },
  ]

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('label', {
      header: 'Field',
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('value', {
      header: 'Information',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data: profileData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-80 space-y-6">
        <DataProfile />
        <SidebarMahasiswa />
      </div>
      <Card className="flex-1 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profil</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                      {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                      {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
