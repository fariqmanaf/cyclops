import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreVertical } from 'lucide-react'
import Navbar from '@/components/OurComponent/Navbar'
import { Protected } from '@/components/OurComponent/AuthMiddleware'
import { getProfile } from '@/service/account/userAccount'
import { useMemo } from 'react'

export const Route = createLazyFileRoute('/account/')({
  component: () => (
    <Protected roles={['mahasiswa']}>
      <Profile />
    </Protected>
  ),
})

function Profile() {
  const [profileData, setProfileData] = useState([
    { label: 'Nama Lengkap', value: '' },
    { label: 'Alamat Email', value: '' },
    { label: 'NIM', value: '' },
    { label: 'Nomor telepon', value: '' },
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'label',
        header: 'Label',
      },
      {
        accessorKey: 'value',
        header: 'Value',
      },
    ],
    []
  );

  const table = useReactTable({
    data: profileData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfileData([
        { label: 'Nama Lengkap', value: data.name },
        { label: 'Alamat Email', value: data.email },
        { label: 'NIM', value: data.nim },
        { label: 'Nomor telepon', value: data.noHp },
      ]);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // Implement edit profile logic
    console.log('Edit profile clicked');
  };

  const handleExportData = () => {
    // Implement export data logic
    console.log('Export data clicked');
  };

  return (
    <>
      <Navbar isAuth={true}/>
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
                <DropdownMenuItem onClick={handleEditProfile}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportData}>
                  Export Data
                </DropdownMenuItem>
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
