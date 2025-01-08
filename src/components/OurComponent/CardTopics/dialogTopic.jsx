import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InputFormComponent } from "../Input Form/inputText";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ReactLoading from "react-loading";
import { arrayOfProdi } from "@/utils/arrayOfProdi";
import { SelectFieldComponent } from "../Input Form/selectField";
import { useMutation } from "@tanstack/react-query";
import { registerInTopic } from "@/service/topics";
import toast from "react-hot-toast";

export function DialogTopic({ topicId, role, setIsDialogOpen }) {
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => registerInTopic(body, topicId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Berhasil mendaftar topik");
      setIsDialogOpen(false);
    },
  });

  const formSchema = z.object({
    nama: z.string().nonempty({
      message: "Nama tidak boleh kosong",
    }),
    nim: z.string().nonempty({
      message: "NIM tidak boleh kosong",
    }),
    noHp: z.string().nonempty({
      message: "Nomor Telepon tidak boleh kosong",
    }),
    prodi: z.string().nonempty({
      message: "Program Studi tidak boleh kosong",
    }),
    role1: z.string().nonempty({
      message: "Role 1 tidak boleh kosong",
    }),
    role2: z.string().nonempty({
      message: "Role 2 tidak boleh kosong",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nim: "",
      noHp: "",
      prodi: "",
      role1: "",
      role2: "",
    },
    mode: "onChange",
  });

  const roles = role.map((item) => ({
    label: item?.nama,
    value: item?.nama,
  }));

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Daftar</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <InputFormComponent
              form={form}
              identifier={"nama"}
              label={"Nama Lengkap"}
              placeholder={"Masukkan Nama Lengkap Anda"}
              type={"text"}
            />
            <InputFormComponent
              form={form}
              identifier={"nim"}
              label={"NIM"}
              placeholder={"Masukkan NIM Anda"}
              type={"text"}
            />
            <InputFormComponent
              form={form}
              identifier={"noHp"}
              label={"Nomor Telepon"}
              placeholder={"Masukkan Nomor Telepon Anda"}
              type={"text"}
            />
            <SelectFieldComponent
              form={form}
              identifier={"prodi"}
              items={arrayOfProdi}
              label={"Program Studi"}
              placeholder={"Pilih Program Studi Anda"}
            />
            <SelectFieldComponent
              form={form}
              identifier={"role1"}
              items={roles}
              label={"Role 1"}
              placeholder={"Pilih Role 1 Anda"}
            />
            <SelectFieldComponent
              form={form}
              identifier={"role2"}
              items={roles}
              label={"Role 2"}
              placeholder={"Pilih Role 2 Anda"}
            />
          </div>
          <DialogFooter>
            <Button className="self-center" type="submit">
              {isPending ? (
                <ReactLoading
                  type={"spin"}
                  color={"#FFFFFF"}
                  height={"15%"}
                  width={"15%"}
                  className="flex justify-center items-center"
                />
              ) : (
                <p>Daftar</p>
              )}
            </Button>
            <DialogDescription></DialogDescription>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
