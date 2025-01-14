import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { TopicForm } from "@/components/OurComponent/TopicForm";
import Navbar from "@/components/OurComponent/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createTopic, getTopicById, updateTopic } from "@/service/topics";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Protected } from "@/components/OurComponent/AuthMiddleware";

export const Route = createLazyFileRoute("/dosen/topics/$topicId")({
  component: () => (
    <Protected roles={["dosen"]}>
      <EditTopicComponent />
    </Protected>
  ),
});

function EditTopicComponent() {
  const navigate = useNavigate();
  const topicId = Route.useParams().topicId;

  const [topicData, setTopicData] = useState(null);

  const {
    data: userData,
    isSuccess,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => getTopicById(topicId),
    enabled: !!topicId,
  });

  const { mutate, isPending: isPendingMutate } = useMutation({
    mutationFn: (body) => {
      return updateTopic(body, topicId);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Topik berhasil diubah");
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
      nama: topicData?.nama,
      deskripsi: topicData?.deskripsi,
      roles: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isSuccess && userData) {
      form.reset({
        nama: userData.nama || "",
        deskripsi: userData.deskripsi || "",
        roles:
          userData?.role.map((role) => {
            return role.nama;
          }) || [],
      });
    } else if (isError) {
      toast.error("Gagal mengambil data topik");
    }
  }, [isSuccess, userData, form, isError]);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col items-center pt-16 md:px-32 px-16">
        {isPending ? (
          <div className="w-full h-full flex justify-center items-center">
            <ReactLoading type="spin" color="#000" />
          </div>
        ) : (
          <>
            <p className="text-xl font-semibold mb-5">Edit Topik</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TopicForm
                  form={form}
                  isPending={isPendingMutate}
                  roles={userData?.role}
                />
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
