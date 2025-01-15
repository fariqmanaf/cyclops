import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const DataProfile = () => {
  const userName = useSelector((state) => state.auth?.user?.name);

  return (
    <div>
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-blue-500 text-white text-xl">
                AA
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-gray-500">Mahasiswa</p>
            <p className="text-gray-500">Universitas Jember</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataProfile;
