import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle2, FileText, Lock, BookOpen, LogOut } from 'lucide-react';

const SidebarMahasiswa = () => {

    const menuItems = [
        {
          icon: <UserCircle2 className="w-5 h-5" />,
          label: 'Profil',
          active: true,
        },
        { icon: <FileText className="w-5 h-5" />, label: 'Lengkapi Dokumen' },
        { icon: <Lock className="w-5 h-5" />, label: 'Ganti Sandi' },
        { icon: <BookOpen className="w-5 h-5" />, label: 'logbook' },
        { icon: <LogOut className="w-5 h-5" />, label: 'Keluar' },
      ]   

  return (
    <div className="bg-white">
        <Card className="bg-white">
            <CardContent className="p-0">
              <div className="divide-y">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start gap-3 p-4 rounded-none ${
                      item.active ? 'bg-slate-100' : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
    </div>
  );
}

export default SidebarMahasiswa;