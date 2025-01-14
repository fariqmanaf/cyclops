import { Lock, LogOut, UserCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "@tanstack/react-router";

const SidebarDosen = () => {
    const navigate = useNavigate();
    const match = useLocation();

    const menuItems = [
        {
          icon: <UserCircle2 className="w-5 h-5" />,
          label: 'Profil',
          link: '/account',
        },
        { icon: <Lock className="w-5 h-5" />, label: 'Ganti Sandi', link: '/account/changePassword' },
        { icon: <LogOut className="w-5 h-5" />, label: 'Keluar' },
      ]

  return (
    <div className="bg-white">
        <Card className="bg-white">
            <CardContent className="p-0">
                <div className="divide-y">
                {menuItems.map((item, index) => {
                    const isActive = match.pathname === item.link

                    return (
                    <Button
                        key={index}
                        variant="ghost"
                        className={`w-full justify-start gap-3 p-4 rounded-none ${
                        isActive ? 'bg-slate-100' : ''
                        }`}
                        onClick={() => navigate({ to: item.link })}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Button>
                    )
                })}
                </div>
            </CardContent>
            </Card>
    </div>
  );
}

export default SidebarDosen;