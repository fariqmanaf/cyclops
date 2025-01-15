import DataProfile from "@/components/OurComponent/Profile";
import SidebarMahasiswa from "@/components/OurComponent/Sidebar/Mahasiswa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/OurComponent/Navbar";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/account/")({
  component: () => (
    <Protected roles={["mahasiswa"]}>
      <Profile />
    </Protected>
  ),
});

function Profile() {
  const user = useSelector((state) => state.auth?.user);

  const data = [
    {
      label: "Nama Lengkap",
      value: user?.name,
    },
    {
      label: "Alamat Email",
      value: user?.email,
    },
    {
      label: "NIM",
      value: user?.nim,
    },
    {
      label: "Nomor Telepon",
      value: user?.noHp,
    },
  ];

  return (
    <>
      <Navbar isAuth={true} />
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-0 md:mt-[10vh]">
        <div className="w-full md:w-80 space-y-6">
          <DataProfile />
          <SidebarMahasiswa />
        </div>
        <Card className="flex-1 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
