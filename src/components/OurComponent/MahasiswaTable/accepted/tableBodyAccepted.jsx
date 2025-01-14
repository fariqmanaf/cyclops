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
import { useMutation } from "@tanstack/react-query";
import { declineMahasiswa } from "@/service/topics/mahasiswa";
import toast from "react-hot-toast";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ReactLoading from "react-loading";

export function BodyTabelMahasiswaAccepted({ id, item, setDataTable }) {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const { mutate: deleting, isPending } = useMutation({
    mutationFn: () => {
      return declineMahasiswa(id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setDataTable((prev) => prev.filter((data) => data.id !== id));
      toast.success("Mahasiswa berhasil dihapus");
      return;
    },
  });

  const onDelete = () => {
    deleting();
    setIsDialogDeleteOpen(false);
  };

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <TableRow key={`row-${id}`}>
      <TableCell>
        <Dialog
          open={isProfileDialogOpen}
          onOpenChange={setIsProfileDialogOpen}
        >
          <DialogTrigger>
            <p className="underline">{item?.nama}</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center mb-5">Profil</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex flex-col">
                  <p>Nama Lengkap</p>
                  <p>{item?.nama}</p>
                </div>
                <div className="flex flex-col">
                  <p>Email</p>
                  <p>{item?.user?.email}</p>
                </div>
                <div className="flex flex-col">
                  <p>NIM</p>
                  <p>{item?.user?.nim}</p>
                </div>
                <div className="flex flex-col">
                  <p>Nomor Telepon</p>
                  <p>{item?.user?.noHp}</p>
                </div>
                <div className="flex flex-col">
                  <p>Curiculum Vitae</p>
                  <p
                    onClick={() => openNewTab(item?.user?.dokumen[0]?.cv)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Klik Untuk Lihat
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>Transkrip Nilai</p>
                  <p
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      openNewTab(item?.user?.dokumen[0]?.transkripNilai)
                    }
                  >
                    Klik Untuk Lihat
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>Drop Matakuliah</p>
                  <p>{item?.user?.dokumen[0]?.dropMatakuliah}</p>
                </div>
                <div className="flex flex-col">
                  <p>Jumlah Konversi</p>
                  <p>{item?.user?.dokumen[0]?.jumlahMatakuliah}</p>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>{item?.nim}</TableCell>
      <TableCell>{item?.topik?.nama}</TableCell>
      <TableCell>{item?.prodi}</TableCell>
      <TableCell>{item?.noHp}</TableCell>
      <TableCell>{item?.role1}</TableCell>
      <TableCell>
        <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
          <DialogTrigger>
            <FaTrashRestoreAlt className="text-xl text-red-500 hover:text-red-700 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center mb-5">
                Apakah Anda Yakin ?
              </DialogTitle>
              <DialogDescription className="flex gap-5">
                <Button
                  onClick={() => setIsDialogDeleteOpen(false)}
                  className="w-full bg-red-500 hover:bg-red-700"
                >
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    onDelete();
                  }}
                  className="w-full bg-green-500 hover:bg-green-700"
                >
                  Yakin
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
