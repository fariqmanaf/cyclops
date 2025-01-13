import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteTopic } from "@/service/topics";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";

export function DialogDelete({
  topicId,
  setIsDeleteDialogOpen,
  setDeletedTopic,
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTopic(topicId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      setDeletedTopic({ status: true, id: topicId });
      toast.success("Berhasil menghapus topik");
    },
  });

  function deleteTopicHandler() {
    mutate();
  }

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle className="text-center">
          Apakah anda yakin ingin menghapus topik ini?
        </DialogTitle>
      </DialogHeader>
      <div className="px-10 flex gap-4">
        <Button
          onClick={() => {
            deleteTopicHandler();
          }}
          className="bg-red-500 hover:bg-red-700 w-full"
        >
          {isPending ? (
            <ReactLoading
              type={"spin"}
              color={"#FFFFFF"}
              height={"15%"}
              width={"15%"}
              className="flex justify-center items-center"
            />
          ) : (
            <p>Yakin</p>
          )}
        </Button>
        <Button
          onClick={() => {
            setIsDeleteDialogOpen(false);
          }}
          className="w-full"
        >
          Batal
        </Button>
      </div>
      <DialogFooter>
        <DialogDescription></DialogDescription>
      </DialogFooter>
    </DialogContent>
  );
}
