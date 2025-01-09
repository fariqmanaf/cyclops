import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const DataDokumen = () => {

    const documents = [
    {
      title: 'Curriculum Vitae',
      format: 'Format PDF maksimal 2MB'
    },
    {
      title: 'Transkrip Nilai',
      format: 'Format PDF maksimal 2MB'
    }
  ];

  return (
    <div className="flex-1 overflow-auto">
          <Card className="m-6 h-[60vh] bg-white shadow-sm">
            <CardContent className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Lengkapi Dokumen</h1>
              
              <div className="space-y-6">
                {documents.map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <h2 className="text-xl font-medium">{doc.title}</h2>
                    <p className="text-xs text-gray-500">{doc.description}</p>
                    <div className="border border-dashed border-gray-300 rounded-lg p-8">
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="text-xs">
                          Choose file
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Adding more content to demonstrate scroll */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={`extra-${index}`} className="space-y-2">
                    <h2 className="text-sm font-medium">Additional Document {index + 1}</h2>
                    <p className="text-xs text-gray-500">Format PDF maksimal 2MB</p>
                    <div className="border border-dashed border-gray-300 rounded-lg p-4">
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="text-xs">
                          Choose file
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

    );
}

export default DataDokumen;