import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";

export function BodyTabelLogbook({ item }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const date = new Date(item?.uploadAt);

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <TableRow>
        <TableCell className="text-center">{item?.user?.name}</TableCell>
        <TableCell className="text-center">{item?.user?.nim}</TableCell>
        <TableCell className="text-center">
          {item?.user?.topikDetail[0]?.topik?.nama}
        </TableCell>
        <TableCell className="text-center">{item?.namaDosen}</TableCell>
        <TableCell className="text-center">{item?.target}</TableCell>
        <TableCell className="text-center">{item?.logbook?.nama}</TableCell>
        <TableCell className="text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <p className="text-blue-500 underline">Detail</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center mb-5">Detail</DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex flex-col">
                    <p>Rincian Kegiatan</p>
                    <p className="text-gray-400">{item?.rincianKegiatan}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Kendala</p>
                    <p className="text-gray-400">{item?.kendala}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Output</p>
                    <p className="text-gray-400">{item?.output}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Tanggal</p>
                    <p className="text-gray-400">
                      {date.toLocaleDateString({
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>Bukti</p>
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={() => openNewTab(item?.buktiKegiatan)}
                    >
                      Klik Untuk Lihat
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell>
          {new Date(item?.uploadAt) > new Date(item?.logbook?.tglTerakhir) ? (
            <div className="text-center p-1 bg-yellow-600 text-white rounded-full">
              Telat
            </div>
          ) : (
            <div className="text-center p-1 bg-blue-600 text-white rounded-full">
              Hadir
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
