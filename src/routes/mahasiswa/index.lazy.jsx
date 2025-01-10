import { createLazyFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import Navbar from "@/components/OurComponent/Navbar";

export const Route = createLazyFileRoute("/mahasiswa/")({
  component: () => (
    <Protected roles={["dosen"]}>
      <MahasiswaComponent />
    </Protected>
  ),
});

function MahasiswaComponent() {
  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16"></div>
    </>
  );
}
