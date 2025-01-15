import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TiThMenu } from "react-icons/ti";
import { AuthDialogs } from "../AuthPopover";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/service/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "@/redux/slices/auth";

const Navbar = ({ isAuth }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isActive, setIsActive] = useState("");

  const isDosen = useSelector((state) => state.auth.user?.role === "dosen");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setIsActive("home");
    } else if (path.startsWith("/topics")) {
      setIsActive("topics");
    } else if (path.startsWith("/notification")) {
      setIsActive("notification");
    } else if (path.startsWith("/profile")) {
      setIsActive("profile");
    } else if (path.startsWith("/dosen/topics")) {
      setIsActive("dosenTopics");
    } else if (path.startsWith("/mahasiswa/pendaftar")) {
      setIsActive("pendaftar");
    } else if (path.startsWith("/mahasiswa")) {
      setIsActive("mahasiswa");
    } else if (path.startsWith("/logbook")) {
      setIsActive("logbook");
    } else if (path.startsWith("/absensi")) {
      setIsActive("absensi");
    } else {
      setIsActive("");
    }
  }, [location.pathname]);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data?.accessToken);
      dispatch(setToken(data?.accessToken));
      dispatch(setUser(data?.user));
      toast.success("Berhasil login");
      return;
    },
  });

  const { mutate: registerMutation, isPending: isRegisterPending } =
    useMutation({
      mutationFn: (body) => {
        return register(body);
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Berhasil register Silahkan Login");
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
      },
    });

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
                          {isDosen ? (
                            <>
                              <Link
                                to={"/dosen/topics"}
                                className="cursor-pointer block"
                              >
                                Topik
                              </Link>
                              <hr />
                              <Link
                                to={"/mahasiswa"}
                                className="cursor-pointer block"
                              >
                                Mahasiswa
                              </Link>
                              <hr />
                              <Link
                                to={"/mahasiswa/pendaftar"}
                                className="cursor-pointer block"
                              >
                                Pendaftar
                              </Link>
                              <hr />
                              <Link
                                to={"/logbook"}
                                className="cursor-pointer block"
                              >
                                Logbook
                              </Link>
                              <hr />
                              <Link
                                to={"/absensi"}
                                className="cursor-pointer block"
                              >
                                Absensi
                              </Link>
                              <hr />
                              <Link
                                to={"/account/dosen"}
                                className="cursor-pointer block"
                              >
                                Profil
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to={"/topics"}
                                className="cursor-pointer block"
                              >
                                Topik
                              </Link>
                              <hr />
                              <Link
                                to={"/notification"}
                                className="cursor-pointer block"
                              >
                                Notifikasi
                              </Link>
                              <hr />
                              <Link
                                to={"/account"}
                                className="cursor-pointer block"
                              >
                                Profil
                              </Link>
                            </>
                          )}
                        </PopoverContent>
                      </Popover>
                    </>
                  ) : (
                    <AuthDialogs
                      login={loginMutation}
                      isPendingLogin={isPending}
                      register={registerMutation}
                      isPendingRegister={isRegisterPending}
                      isLoginOpen={isLoginOpen}
                      setIsLoginOpen={setIsLoginOpen}
                      isRegisterOpen={isRegisterOpen}
                      setIsRegisterOpen={setIsRegisterOpen}
                    />
                  )}
                </div>
              )
            : isAuth && (
                <div className="flex items-center gap-6 text-md">
                  {token ? (
                    isDosen ? (
                      <>
                        <Link
                          to={"/dosen/topics"}
                          className={`${isActive === "dosenTopics" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2 `}
                        >
                          Topik
                        </Link>
                        <Link
                          to={"/mahasiswa"}
                          className={`${isActive === "mahasiswa" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2 `}
                        >
                          Mahasiswa
                        </Link>
                        <Link
                          to={"/mahasiswa/pendaftar"}
                          className={`${isActive === "pendaftar" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2 `}
                        >
                          Pendaftar
                        </Link>
                        <Link
                          to={"/logbook"}
                          className={`${isActive === "logbook" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2 `}
                        >
                          Logbook
                        </Link>
                        <Link
                          to={"/absensi"}
                          className={`${isActive === "absensi" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2`}
                        >
                          Absensi
                        </Link>
                        <div
                          onClick={() => navigate({ to: "/account/dosen" })}
                          className="rounded-full cursor-pointer flex justify-center items-center p-2 gap-4 bg-white"
                        >
                          <img
                            src="/image/avatar.png"
                            className="rounded-full w-5"
                          />
                          <TiThMenu className="text-lg" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to={"/topics"}
                          className={`${isActive === "topics" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2 `}
                        >
                          Topik
                        </Link>
                        <Link
                          to={"/notification"}
                          className={`${isActive === "notification" ? "text-blue-500" : "text-white"} cursor-pointer border border-transparent hover:border-white rounded-full p-2`}
                        >
                          Notifikasi
                        </Link>
                        <div
                          onClick={() => navigate({ to: "/account" })}
                          className="rounded-full cursor-pointer flex justify-center items-center p-2 gap-4 bg-white"
                        >
                          <img
                            src="/image/avatar.png"
                            className="rounded-full w-5"
                          />
                          <TiThMenu className="text-lg" />
                        </div>
                      </>
                    )
                  ) : (
                    <AuthDialogs
                      login={loginMutation}
                      isPendingLogin={isPending}
                      register={registerMutation}
                      isPendingRegister={isRegisterPending}
                      isLoginOpen={isLoginOpen}
                      setIsLoginOpen={setIsLoginOpen}
                      isRegisterOpen={isRegisterOpen}
                      setIsRegisterOpen={setIsRegisterOpen}
                    />
                  )}
                </div>
              )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
