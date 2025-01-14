import { Protected } from "@/components/OurComponent/AuthMiddleware";
import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/OurComponent/Navbar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllLogbook } from "@/service/logbook";
import { LogbookTable } from "@/components/OurComponent/LogbookTable";

export const Route = createLazyFileRoute("/logbook/")({
  component: () => (
    <Protected roles={["dosen"]}>
      <LogbookComponent />
    </Protected>
  ),
});

function LogbookComponent() {
  const token = localStorage.getItem("token");
  const [dataTable, setDataTable] = useState([]);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["logbook"],
    queryFn: () => getAllLogbook(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setDataTable(data);
    } else if (isError) {
      toast.error("Gagal mengambil data logbook");
    }
  }, [data, isSuccess, isError]);

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <div className="flex md:flex-row flex-col justify-between mb-5 md:mb-0">
          <p className="text-2xl font-semibold mb-10">Logbook</p>
        </div>
        <LogbookTable data={dataTable} isLoading={isLoading} />
      </div>
    </>
  );
}
