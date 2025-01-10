import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputFormComponent } from "../Input Form/inputText";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ReactLoading from "react-loading";

export function AuthDialogs({
  login,
  isPendingLogin,
  register,
  isPendingRegister,
  isLoginOpen,
  setIsLoginOpen,
  isRegisterOpen,
  setIsRegisterOpen,
}) {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password harus lebih dari 6 karakter",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const formRegisterSchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      nim: z.string(),
      noHp: z.string(),
      password: z.string().min(8, {
        message: "Password harus lebih dari 8 karakter",
      }),
      confirmPassword: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Password tidak sama",
        });
      }
    });

  const formRegister = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      nim: "",
      noHp: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    login(values);
  };

  const onSubmitRegister = (values) => {
    const dataRegister = {
      name: values.name,
      email: values.email,
      nim: values.nim,
      noHp: values.noHp,
      password: values.password,
    };

    register(dataRegister);
  };

  return (
    <>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-white text-sm p-2 hover:bg-white rounded-full border text-[#206EBB] hover:scale-105 transition-all"
            onClick={() => setIsLoginOpen(true)}
          >
            Masuk Ke Akun
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Masuk</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <InputFormComponent
                  form={form}
                  identifier={"email"}
                  label={"Email"}
                  placeholder={"Masukkan Email Anda"}
                  type={"email"}
                />
                <InputFormComponent
                  form={form}
                  identifier={"password"}
                  label={"Password"}
                  placeholder={"Masukkan Password Anda"}
                  type={"password"}
                />
              </div>
              <DialogFooter>
                <Button className="self-center" type="submit">
                  {isPendingLogin ? (
                    <ReactLoading
                      type={"spin"}
                      color={"#FFFFFF"}
                      height={"15%"}
                      width={"15%"}
                      className="flex justify-center items-center"
                    />
                  ) : (
                    <p>Masuk</p>
                  )}
                </Button>
                <DialogDescription className="mt-5">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    className="text-[#206EBB] underline"
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsRegisterOpen(true);
                    }}
                  >
                    Daftar
                  </button>
                </DialogDescription>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Daftar</DialogTitle>
          </DialogHeader>
          <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(onSubmitRegister)}>
              <div className="grid gap-4 py-4">
                <InputFormComponent
                  form={formRegister}
                  identifier={"name"}
                  label={"Nama Lengkap"}
                  placeholder={"Masukkan Nama Lengkap Anda"}
                  type={"text"}
                />
                <InputFormComponent
                  form={formRegister}
                  identifier={"email"}
                  label={"Email"}
                  placeholder={"Masukkan Email Anda"}
                  type={"email"}
                />
                <InputFormComponent
                  form={formRegister}
                  identifier={"nim"}
                  label={"NIM"}
                  placeholder={"Masukkan NIM Anda"}
                  type={"text"}
                />
                <InputFormComponent
                  form={formRegister}
                  identifier={"noHp"}
                  label={"Nomor Telepon"}
                  placeholder={"Masukkan Nomor Telepon Anda"}
                  type={"text"}
                />
                <InputFormComponent
                  form={formRegister}
                  identifier={"password"}
                  label={"Password"}
                  placeholder={"Masukkan Password Anda"}
                  type={"password"}
                />
                <InputFormComponent
                  form={formRegister}
                  identifier={"confirmPassword"}
                  label={"Konfirmasi Password"}
                  placeholder={"Ulangi Password Anda"}
                  type={"password"}
                />
              </div>
              <DialogFooter>
                <Button className="self-center" type="submit">
                  {isPendingRegister ? (
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
                <DialogDescription className="mt-5">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    className="text-[#206EBB] underline"
                    onClick={() => {
                      setIsRegisterOpen(false);
                      setIsLoginOpen(true);
                    }}
                  >
                    Masuk
                  </button>
                </DialogDescription>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
