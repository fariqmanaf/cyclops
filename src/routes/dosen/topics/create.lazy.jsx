import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { TopicForm } from "@/components/OurComponent/TopicForm";
import Navbar from "@/components/OurComponent/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createTopic } from "@/service/topics";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Protected } from "@/components/OurComponent/AuthMiddleware";

export const Route = createLazyFileRoute("/dosen/topics/create")({
  component: () => (
    <Protected roles={["dosen"]}>
      <CreateTopicComponent />
    </Protected>
  ),
});

function CreateTopicComponent() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => {
      return createTopic(body);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Topik berhasil dibuat");
      navigate({ to: "/dosen/topics" });
      return;
    },
  });

  const formSchema = z.object({
    nama: z.string().nonempty("Nama topik wajib diisi"),
    deskripsi: z.string().nonempty("Deskripsi topik wajib diisi"),
    roles: z
      .tuple([z.string().nonempty("Role 1 wajib diisi")])
      .rest(z.string().optional()),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      deskripsi: "",
      roles: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col items-center pt-16 md:px-32 px-16">
        <p className="text-xl font-semibold mb-5">Tambahkan Topik</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TopicForm form={form} isPending={isPending} />
          </form>
        </Form>
      </div>
    </>
  );
}
