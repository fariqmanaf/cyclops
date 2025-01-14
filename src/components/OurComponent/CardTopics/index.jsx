import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogTopic } from "./dialogTopic";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { DialogDelete } from "./dialogDelete";
import { useSelector } from "react-redux";

export function CardTopics({ data, isDosen, setDeletedTopic }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white flex flex-col justify-between gap-6 rounded-lg shadow-lg border p-6 hover:scale-105 transition ease-in-out duration-500 cursor-pointer">
      {isDosen ? (
        <div className="flex justify-between gap-2 items-center">
          <p className="text-xl font-semibold w-[90%]">{data.nama}</p>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              {data?.userId === user?.id && (
                <FaTrash className="text-red-500 cursor-pointer w-[10%] text-xl" />
              )}
            </DialogTrigger>
            <DialogDelete
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              topicId={data.id}
              setDeletedTopic={setDeletedTopic}
            />
          </Dialog>
        </div>
      ) : (
        <p className="text-xl font-semibold">{data.nama}</p>
      )}
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
        {isDosen ? (
          data?.userId === user?.id && (
            <Link
              to={`/dosen/topics/${data?.id}`}
              className="p-2 bg-slate-900 text-white text-center rounded-xl hover:bg-slate-700"
            >
              Edit
            </Link>
          )
        ) : (
          <DialogTrigger asChild>
            <Button>Daftar</Button>
          </DialogTrigger>
        )}
        <DialogTopic
          topicId={data.id}
          role={data?.role}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Dialog>
    </div>
  );
}
