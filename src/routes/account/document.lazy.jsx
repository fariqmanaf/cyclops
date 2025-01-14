import { createLazyFileRoute } from '@tanstack/react-router'
import DataDokumen from '@/components/OurComponent/Document'
import DataProfile from '@/components/OurComponent/Profile'
import SidebarMahasiswa from '@/components/OurComponent/Sidebar/Mahasiswa'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel } from '@tanstack/react-table'
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
import { Protected } from '@/components/OurComponent/AuthMiddleware'

export const Route = createLazyFileRoute('/account/document')({
  component: () => (
    <Protected>
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
