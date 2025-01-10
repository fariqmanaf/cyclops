import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen px-40 flex-col md:flex-row items-center justify-center text-center md:text-left p-4">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Oops! <br /> Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg mb-4 text-justify">
          Halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau
          sementara tidak tersedia. Kami mohon maaf atas ketidaknyamanan ini.
          Silakan periksa URL Anda atau gunakan tombol di bawah ini untuk
          kembali ke beranda.
        </p>
        <Button
          className="mt-[5px] text-white w-[150px] h-[48px] rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate({ to: `/` })}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
