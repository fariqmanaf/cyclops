import { Form } from "@/components/ui/form";
import { FaUserCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectFieldComponent } from "../Input Form/selectField";
import { TableCell, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { accMahasiswa, declineMahasiswa } from "@/service/topics/mahasiswa";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";

export function BodyTabelMahasiswa({ id, item, roles, index, setDataTable }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => {
      return accMahasiswa(body, id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setDataTable((prev) => prev.filter((data) => data.id !== id));
      toast.success("Mahasiswa berhasil dikonfirmasi");
      return;
    },
  });

  const { mutate: decline, isPending: isPendingDecline } = useMutation({
    mutationFn: () => {
      return declineMahasiswa(id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setDataTable((prev) => prev.filter((data) => data.id !== id));
      toast.success("Mahasiswa berhasil ditolak");
      return;
    },
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      [id]: "",
    },
  });

  const onSubmit = (data) => {
    const dataFetch = {
      role1: data[id],
    };
    mutate(dataFetch);
    setIsDialogOpen(false);
  };

  const onDecline = () => {
    decline();
    setIsDialogOpen(false);
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
                  <p className="text-gray-400">{item?.nama}</p>
                </div>
                <div className="flex flex-col">
                  <p>Email</p>
                  <p className="text-gray-400">{item?.user?.email}</p>
                </div>
                <div className="flex flex-col">
                  <p>NIM</p>
                  <p className="text-gray-400">{item?.user?.nim}</p>
                </div>
                <div className="flex flex-col">
                  <p>Nomor Telepon</p>
                  <p className="text-gray-400">{item?.user?.noHp}</p>
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
                  <p className="text-gray-400">
                    {item?.user?.dokumen[0]?.dropMatakuliah}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>Jumlah Konversi</p>
                  <p className="text-gray-400">
                    {item?.user?.dokumen[0]?.jumlahMatakuliah}
                  </p>
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
      <TableCell>
        <Form {...form}>
          <form>
            <div className="flex items-center gap-4">
              <SelectFieldComponent
                items={roles}
                form={form}
                identifier={`${id}`}
                placeholder={"Pilih Role"}
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <p>
                    <FaUserCheck className="text-center text-lg hover:text-slate-700 cursor-pointer mx-auto" />
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center mb-5">
                      Konfirmasi Status Pendaftaran
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div className="flex gap-5 mt-5">
                      <Button
                        type="button"
                        className="w-full bg-green-600 hover:bg-green-800"
                        onClick={() => {
                          const formData = form.getValues();
                          onSubmit(formData);
                        }}
                      >
                        {isPending ? (
                          <ReactLoading
                            type={"spin"}
                            color={"#FFFFFF"}
                            height={"15%"}
                            width={"15%"}
                            className="flex justify-center items-center"
                          />
                        ) : (
                          <p>Setuju</p>
                        )}
                      </Button>
                      <Button
                        type="button"
                        className="w-full bg-red-600 hover:bg-red-800"
                        onClick={() => {
                          onDecline();
                        }}
                      >
                        {isPendingDecline ? (
                          <ReactLoading
                            type={"spin"}
                            color={"#FFFFFF"}
                            height={"15%"}
                            width={"15%"}
                            className="flex justify-center items-center"
                          />
                        ) : (
                          <p>Tolak</p>
                        )}
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </TableCell>
    </TableRow>
  );
}
