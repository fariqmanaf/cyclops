import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/OurComponent/Navbar";
import toast, { Toaster } from "react-hot-toast";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar isAuth={true} />
      <Toaster position="right-top" />
      <div className="w-screen h-[90vh] flex items-center">
        <img
          src="/image/bg.jpg"
          className="object-cover w-screen h-screen brightness-50 absolute -z-10"
        />
        <section className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[50%] p-10 md:p-20">
            <p className="text-white text-[2.5rem] font-semibold">
              Kuliah untuk Negeri
            </p>
            <p className="text-white text-[2.5rem] font-semibold mb-3">
              Berkarya untuk Joki
            </p>
            <p className="text-white text-lg">
              Capstone Project adalah proyek akhir yang diberikan di akhir masa
              studi untuk mengaplikasikan ilmu dan keterampilan yang sudah
              dipelajari
            </p>
          </div>
          <div className="w-[50%]"></div>
        </section>
      </div>
    </>
  );
}
