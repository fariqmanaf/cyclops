import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const DataDokumen = () => {

    const documents = [
    {
      title: 'Curriculum Vitae',
      description: 'Format PDF maksimal 2MB'
    },
    {
      title: 'Transkrip Nilai',
      description: 'Format PDF maksimal 2MB'
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
          <Card className=" bg-white shadow-sm">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-1">Lengkapi Dokumen</h1>
              <hr className="mb-6"/>
              
              <div className="space-y-6">
                {documents.map((doc, index) => (
                  <div key={index} className="space-y-1">
                    <h2 className="text-xl font-medium">{doc.title}</h2>
                    <p className="text-xs text-gray-500">{doc.description}</p>
                    <div className="border border-solid border-gray-300 rounded-lg p-6">
                      <div className="flex justify-end">
                        <Input type='file' variant="outline" size="sm" className="text-xs w-28"/>
                      </div>
                    </div>
                  </div>
                ))}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-medium">Drop Mata Kuliah</h2>
                      <p className="text-xs text-gray-500">Tuliskan Mata Kuliah yang ingin di Drop</p>
                      <Textarea />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-medium">Jumlah Konversi SKS</h2>
                      <p className="text-xs text-gray-500">Maksimal 20 SKS (Tulis dalam Angka)</p>
                      <Textarea type='number' />
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

    );
}

export default DataDokumen;