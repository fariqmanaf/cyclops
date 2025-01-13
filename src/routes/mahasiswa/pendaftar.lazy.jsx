import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import Navbar from "@/components/OurComponent/Navbar";
import { Input } from "@/components/ui/input";
import { MahasiswaTable } from "@/components/OurComponent/MahasiswaTable";
import { getMahasiswaPendaftar } from "@/service/topics/mahasiswa";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/mahasiswa/pendaftar")({
  component: () => (
    <Protected roles={["dosen"]}>
      <PendaftarComponent />
    </Protected>
  ),
});

function PendaftarComponent() {
  const token = localStorage.getItem("token");
  const [dataTable, setDataTable] = useState([]);
  const searchParams = Route.useSearch();
  const name = searchParams?.name || "";
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["pendaftar", name],
    queryFn: () => getMahasiswaPendaftar(name),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setDataTable(data);
    } else if (isError) {
      toast.error("Gagal mengambil data pendaftar");
    }
  }, [data, isSuccess, isError]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate({
        search: {
          name: event.target.value,
        },
      });
    }
  };

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <div className="flex md:flex-row flex-col justify-between mb-5 md:mb-0">
          <p className="text-2xl font-semibold mb-10">Pendaftaran Mahasiswa</p>
          <Input
            placeholder="Cari Nama..."
            className="w-42"
            onKeyDown={handleKeyDown}
          />{" "}
        </div>
        <MahasiswaTable data={dataTable} isLoading={isLoading} />
      </div>
    </>
  );
}
