import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';



const Logbook = () => {
    const weeks = Array.from({ length: 6 }, (_, i) => ({
        id: `minggu-${i + 1}`,
        title: `Minggu ${i + 1}`,
      }));

    return (
        <div className="flex-1 overflow-auto">
          <Card className="m-6 bg-white shadow-sm">
            <CardContent className="p-6">
              <h1 className="text-xl font-semibold mb-6">Logbook</h1>
              
              <Accordion type="single" collapsible className="w-full">
                {weeks.map((week, index) => (
                  <AccordionItem 
                    key={week.id} 
                    value={week.id}
                    className="border-b"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-sm font-medium">{week.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {index === 0 ? (
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">Progress</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4">
                          <span className="text-sm text-gray-500">No entries yet</span>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
    )
}

export default Logbook;