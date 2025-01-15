import { Lock, LogOut, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { setToken } from "@/redux/slices/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SidebarDosen = () => {
  const navigate = useNavigate();
  const match = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    {
      icon: <UserCircle2 className="w-5 h-5" />,
      label: "Profil",
      link: "/account/dosen",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Ganti Sandi",
      link: "/account/dosen/EditPassword",
    },
    { icon: <LogOut className="w-5 h-5" />, label: "Keluar", link: "/logout" },
  ];

  return (
    <div className="bg-white">
      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="divide-y">
            {menuItems.map((item, index) => {
              const isActive = match.pathname === item.link;

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start gap-3 p-4 rounded-none ${
                    isActive ? "bg-slate-100" : ""
                  }`}
                  onClick={() => navigate({ to: item.link })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarDosen;
