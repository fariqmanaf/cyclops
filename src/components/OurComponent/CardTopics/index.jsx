import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogTopic } from "./dialogTopic";
import { useState } from "react";

export function CardTopics({ data }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col justify-between gap-6 rounded-lg shadow-lg border p-6 hover:scale-105 transition ease-in-out duration-500 cursor-pointer">
      <p className="text-xl font-semibold">{data.nama}</p>
      <p className="text-gray-600 text-sm">Pengampu : {data?.user?.name} </p>
      <p className="text-gray-600 text-sm">{data.deskripsi}</p>
      <div>
        <p className="text-gray-600 font-semibold">Roles:</p>
        <ul className="list-disc pl-6">
          {data?.role.map((role, index) => (
            <li className="text-sm" key={index}>
              {role.nama}
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Daftar</Button>
        </DialogTrigger>
        <DialogTopic
          topicId={data.id}
          role={data?.role}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Dialog>
    </div>
  );
}
