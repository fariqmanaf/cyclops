import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
import { getLogbook } from "@/service/logbook";
import { useNavigate, useRouter } from "@tanstack/react-router";


const Logbook = () => {

  const navigate = useNavigate()

  const { data: logbooks, isLoading, isError, error } = useQuery({
    queryKey: ["logbook"],
    queryFn: getLogbook,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const weeks = Array.from({ length: 6 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Minggu ${i + 1}`,
  }));

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Card className="m-6 bg-white shadow-sm">
          <CardContent className="p-6 flex justify-center items-center h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 overflow-auto">
        <Card className="m-6 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-red-500">Error: {error.message}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Card className="m-6 bg-white shadow-sm">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold mb-6">Logbook</h1>

          <Accordion type="single" collapsible className="w-full">
            {weeks.map((week) => {
              const weekLogs = logbooks.filter((logbook) => logbook.progress === week.id);
              const logbookProgress = logbooks.find((log) => log.progress === week.id);

              return (
                <AccordionItem key={week.id} value={week.id} className="border-b">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full" >
                      <span className="text-sm font-medium">{week.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {weekLogs.length > 0 ? (
                      <div className="space-y-4">
                        {weekLogs.map((logbook) => (
                          <div
                            key={logbook.id}
                            className="p-4 border rounded-lg hover:border-blue-200 transition-colors cursor-pointer"
                            onClick={() => navigate({ to: `/account/logbook/${logbookProgress.id}`})}
                            >
                              <div className="flex flex-col justify-between ">
                                <span className="text-blue-500">{logbook.nama}</span>
                                <span className=" font-normal text-xs"> Batas Pengumpulan: {formatDate(logbook.tglTerakhir)}</span>
                              </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 justify-between flex items-center border rounded-lg hover:border-blue-200 transition-colors">
                        <span className="text-sm text-gray-500">Logbook belum dikumpulkan</span>
                        <button className=" border rounded-lg px-2 py-1 text-sm font-medium text-blue-500" 
                          >Tambah</button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logbook