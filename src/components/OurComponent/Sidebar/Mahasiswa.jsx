import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle2, FileText, Lock, BookOpen, LogOut } from "lucide-react";
import { useNavigate, useMatch, useLocation } from "@tanstack/react-router";

const SidebarMahasiswa = () => {
  const navigate = useNavigate();
  const match = useLocation();

  const menuItems = [
    {
      icon: <UserCircle2 className="w-5 h-5" />,
      label: "Profil",
      link: "/account",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Lengkapi Dokumen",
      link: "/account/document",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Ganti Sandi",
      link: "/account/changePassword",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "logbook",
      link: "/account/logbook",
    },
    { icon: <LogOut className="w-5 h-5" />, label: "Keluar" },
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

export default SidebarMahasiswa;