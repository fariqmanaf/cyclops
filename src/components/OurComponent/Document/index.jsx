import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploadDocuments } from "@/service/account/uploadDocument";
import { validateFile } from "@/utils/validationFile";
import { useToast } from "@/hooks/use-toast";


const DataDokumen = () => {
  const [files, setFiles] = useState({
    cv: null,
    transkripNilai: null
  });
  const [formInputs, setFormInputs] = useState({
    dropMatakuliah: '',
    jumlahMatakuliah: ''
  });
  const { toast } = useToast();

  const documents = [
    {
      id: 'cv',
      title: 'Curriculum Vitae',
      description: 'Format PDF maksimal 2MB'
    },
    {
      id: 'transkripNilai',
      title: 'Transkrip Nilai',
      description: 'Format PDF maksimal 2MB'
    },
  ];

  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        return await uploadDocuments(formData);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Berhasil",
        description: "Dokumen berhasil disimpan",
      });
      setFiles({ cv: null, transkripNilai: null });
      setFormInputs({ dropMatakuliah: '', jumlahMatakuliah: '' });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateFile(file);
        setFiles(prev => ({ ...prev, [fileType]: file }));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "File tidak valid",
          description: error.message,
        });
        e.target.value = '';
      }
    }
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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Semua field harus diisi",
      });
      return;
    }

    const formData = new FormData();
    formData.append('cv', files.cv);
    formData.append('transkripNilai', files.transkripNilai);
    formData.append('dropMatakuliah', formInputs.dropMatakuliah);
    formData.append('jumlahMatakuliah', formInputs.jumlahMatakuliah);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="flex-1 overflow-auto">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-1">Lengkapi Dokumen</h1>
          <hr className="mb-6"/>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="space-y-1">
                <h2 className="text-xl font-medium">{doc.title}</h2>
                <p className="text-xs text-gray-500">{doc.description}</p>
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
                <p className="text-xs text-gray-500">Tuliskan Mata Kuliah yang ingin di Drop</p>
                <Textarea
                  value={formInputs.dropMatakuliah}
                  onChange={(e) => setFormInputs(prev => ({
                    ...prev,
                    dropMatakuliah: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-medium">Jumlah Konversi SKS</h2>
                <p className="text-xs text-gray-500">Maksimal 20 SKS (Tulis dalam Angka)</p>
                <Textarea
                  value={formInputs.jumlahMatakuliah}
                  onChange={(e) => setFormInputs(prev => ({
                    ...prev,
                    jumlahMatakuliah: e.target.value
                  }))}
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
                  'Simpan'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDokumen;