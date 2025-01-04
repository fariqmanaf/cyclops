import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TiThMenu } from "react-icons/ti";

const Navbar = ({ isAuth }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  localStorage.setItem("token", "token");

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setShowNavbar(true);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="h-[10vh]"></div>
      <nav
        className={`w-full bg-[#273B4A] shadow-md flex justify-center p-4 md:p-6 fixed top-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="/logo/capstoone.svg"
            alt="Logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          />

          {isMinimized
            ? isAuth && (
                <div className="flex items-center gap-6 text-sm">
                  {token ? (
                    <>
                      <Popover>
                        <PopoverTrigger>
                          <TiThMenu className="text-white text-xl" />
                        </PopoverTrigger>
                        <PopoverContent className="text-center text-md w-full flex flex-col gap-2">
                          <Link
                            to={"/dashboard"}
                            className="cursor-pointer block"
                          >
                            Mahasiswa
                          </Link>
                          <hr />
                          <Link
                            to={"/auth/logout"}
                            className="cursor-pointer block"
                          >
                            Logbook
                          </Link>
                          <hr />
                          <Link
                            to={"/auth/logout"}
                            className="cursor-pointer block"
                          >
                            Absensi
                          </Link>
                        </PopoverContent>
                      </Popover>
                    </>
                  ) : (
                    <Link className=" bg-white text-sm p-2 rounded-full border border-transparent text-[#206EBB] hover:scale-105 transition-all duration-200 ease-in-out">
                      Masuk Ke Akun
                    </Link>
                  )}
                </div>
              )
            : isAuth && (
                <div className="flex items-center gap-6 text-md">
                  {token ? (
                    <>
                      <Link
                        to={"/dashboard"}
                        className="text-white cursor-pointer"
                      >
                        Mahasiswa
                      </Link>
                      <Link
                        to={"/auth/logout"}
                        className="text-white cursor-pointer"
                      >
                        Logbook
                      </Link>
                      <Link
                        to={"/auth/logout"}
                        className="text-white cursor-pointer"
                      >
                        Absensi
                      </Link>
                    </>
                  ) : (
                    <Link className=" bg-white text-sm p-2 rounded-full border border-transparent text-[#206EBB] hover:scale-105 transition-all duration-200 ease-in-out">
                      Masuk Ke Akun
                    </Link>
                  )}
                </div>
              )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
