import Navbar from "@/components/OurComponent/Navbar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { IoIosMailOpen } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/notification/")({
  component: () => (
    <Protected>
      <NotificationComponent />
    </Protected>
  ),
});

function NotificationComponent() {
  const [isOpened, setIsOpened] = useState(false);
  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <p className="text-2xl font-semibold mb-10">Notifikasi</p>
        <Popover>
          <PopoverTrigger>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className={`flex items-center gap-10 shadow-lg border rounded-xl py-5 px-8 cursor-pointer ${isOpened ? "bg-gray-200" : "bg-white"}`}
            >
              <div>
                {isOpened ? (
                  <IoIosMailOpen className="text-3xl" />
                ) : (
                  <IoIosMail className="text-3xl" />
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold">
                  HAI, {username.toLocaleUpperCase()}
                </p>
                <p>
                  Selamat anda sudah mendaftar, nantikan info update terbaru!
                </p>
              </div>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent>
            {!isOpened ? (
              <Button onClick={() => setIsOpened(true)} className="w-full">
                Tandai Telah Dibaca
              </Button>
            ) : (
              <Button onClick={() => setIsOpened(false)} className="w-full">
                Tandai Belum Dibaca
              </Button>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
