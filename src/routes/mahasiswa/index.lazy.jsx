import { createLazyFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import Navbar from "@/components/OurComponent/Navbar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMahasiswaAccepted } from "@/service/topics/mahasiswa";
import { MahasiswaAcceptedTable } from "@/components/OurComponent/MahasiswaTable/accepted/accepted";

export const Route = createLazyFileRoute("/mahasiswa/")({
  component: () => (
    <Protected roles={["dosen"]}>
      <MahasiswaComponent />
    </Protected>
  ),
});

function MahasiswaComponent() {
  const token = localStorage.getItem("token");
  const [dataTable, setDataTable] = useState([]);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: () => getMahasiswaAccepted(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setDataTable(data);
    } else if (isError) {
      toast.error("Gagal mengambil data pendaftar");
    }
  }, [data, isSuccess, isError]);

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <div className="flex md:flex-row flex-col justify-between mb-5 md:mb-0">
          <p className="text-2xl font-semibold mb-10">Mahasiswa</p>
          <Input placeholder="Cari Nama..." className="w-42" />
        </div>
        <MahasiswaAcceptedTable data={dataTable} isLoading={isLoading} />
      </div>
    </>
  );
}
