import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploadDocuments } from "@/service/account/document";
import { validateFile } from "@/utils/validationFile";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { getDocument } from "@/service/account/document";
import { useQuery } from "@tanstack/react-query";
import { useToaster } from "react-hot-toast";

const DataDokumen = () => {
  const [formInputs, setFormInputs] = useState({
    dropMatakuliah: "",
    jumlahMatakuliah: "",
  });
  const  {toast}  = useToaster();
  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState({});

  const dataDocuments = [
    {
      id: "cv",
      title: "Curriculum Vitae",
      description: "Format PDF maksimal 2MB",
    },
    {
      id: "transkripNilai",
      title: "Transkrip Nilai",
      description: "Format PDF maksimal 2MB",
    },
  ];

  const {
    data: documents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocument,
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        return await uploadDocuments(formData);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (formdata) => {
      setIsEditing(false);
      toast.success({
        title: "Berhasil",
        description: "Dokumen berhasil disimpan",
      });
      setFiles({ cv: null, transkripNilai: null });
      setFormInputs({ dropMatakuliah: "", jumlahMatakuliah: "" });
    },
    onError: (error) => {
      toast.error({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleFileChange = (e, docId) => {
    if (e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [docId]: e.target.files[0],
      }));
    }
  };

  const handleEditClick = () => {
    setFormInputs({
      dropMatakuliah: documents.dropMatakuliah || "",
      jumlahMatakuliah: documents.jumlahMatakuliah || "",
    });
    setIsEditing(true);
  };

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.cv || !files.transkripNilai) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "CV dan Transkrip Nilai wajib diupload",
      });
      return;
    }

    if (!formInputs.dropMatakuliah || !formInputs.jumlahMatakuliah) {
      toast.error({
        variant: "destructive",
        title: "Error",
        description: "Semua field harus diisi",
      });
      return;
    }

    const formData = new FormData();
    formData.append("cv", files.cv);
    formData.append("transkripNilai", files.transkripNilai);
    formData.append("dropMatakuliah", formInputs.dropMatakuliah);
    formData.append("jumlahMatakuliah", formInputs.jumlahMatakuliah);

    uploadMutation.mutate(formData);
  };

  if (isLoading) {
    <div className="flex-1 overflow-auto justify-center items-center ">
      <Loader2 type="spin" color="#273B4A"/>
    </div>
  }

  return (
    <div className="flex-1 overflow-auto">
      {documents && !isEditing ? (
        <Card className=" mx-auto">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Lengkapi Dokumen</h1>
            <div className="grid gap-4">

                {/* Transkrip Nilai Status */}
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Transkrip Nilai</h2>
                    {documents.transkripNilai && (
                      <p
                        onClick={() => openNewTab(documents.transkripNilai)}
                        className="text-xs text-blue-500 mt-1 cursor-pointer"
                      >
                        Klik untuk Melihat
                      </p>
                    )}
                  </div>
                </div>

                {/* CV Status */}
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">CV</h2>
                    {documents.cv && (
                      <p
                        onClick={() => openNewTab(documents.cv)}
                        className="text-xs text-blue-500 mt-1 cursor-pointer"
                      >
                        Klik untuk Melihat
                      </p>
                    )}
                  </div>
                </div>

                {/* Drop Matakuliah */}
                <div className="p-4 border rounded-lg">
                  <h2 className="font-semibold">Drop Matakuliah</h2>
                  <p className="mt-2">{documents.dropMatakuliah}</p>
                </div>

                {/* Jumlah Matakuliah */}
                <div className="p-4 border rounded-lg">
                  <h2 className="font-semibold">Jumlah Drop Matakuliah</h2>
                  <p className="mt-2">{documents.jumlahMatakuliah}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleEditClick} variant="outline">
                  Edit
                </Button>
              </div>
          </CardContent>
        </Card>
      ) : isEditing || !documents ? (
        <Card className="mx-auto w-[80vw] md:w-[60vw]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {isEditing ? "Edit Documents" : "Lengkapi Dokumen"}
              </h1>
              {isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {dataDocuments.map((doc) => (
                <div key={doc.id} className="space-y-1">
                  <h2 className="text-xl font-medium">{doc.title}</h2>
                  <p className="text-xs text-gray-500">{doc.description}</p>
                  {documents && documents[doc.id] && (
                    <p className="text-xs">
                      Current file:{" "}
                      <span
                        className=" text-blue-600 cursor-pointer"
                        onClick={() => openNewTab(documents[doc.id])}
                      >
                        Klik Untuk Lihat
                      </span>
                    </p>
                  )}
                  <div className="border border-solid border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-end">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, doc.id)}
                          className="text-xs w-28"
                        />
                      </div>
                      {files[doc.id] && (
                        <p className="text-xs text-green-600 text-right">
                          File terpilih: {files[doc.id].name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-medium">Drop Mata Kuliah</h2>
                  <p className="text-xs text-gray-500">
                    Tuliskan Mata Kuliah yang ingin di Drop
                  </p>
                  <Textarea
                    value={formInputs.dropMatakuliah}
                    onChange={(e) =>
                      setFormInputs((prev) => ({
                        ...prev,
                        dropMatakuliah: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-medium">Jumlah Konversi SKS</h2>
                  <p className="text-xs text-gray-500">
                    Maksimal 20 SKS (Tulis dalam Angka)
                  </p>
                  <Textarea
                    value={formInputs.jumlahMatakuliah}
                    onChange={(e) =>
                      setFormInputs((prev) => ({
                        ...prev,
                        jumlahMatakuliah: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {uploadMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {uploadMutation.error.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="w-32"
                  disabled={uploadMutation.isPending}
                >
                  {uploadMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ):(
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default DataDokumen;
