import { Protected } from '@/components/OurComponent/AuthMiddleware'
import LogbookProgress from '@/components/OurComponent/Logbook/progress'
import Navbar from '@/components/OurComponent/Navbar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { createLogbookDetail } from '@/service/account/createLogbook'
import { createLogbookFormData } from '@/service/account/createLogbook'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const Route = createLazyFileRoute('/account/logbook/$logbookId')({
  component: () => (
    <Protected roles={['mahasiswa']}>
      <ProgressLogbook />
    </Protected>
  ),
})

function ProgressLogbook() {

  const logbookId = Route.useParams().logbookId
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const logbookFormData = createLogbookFormData({
        namaDosen: formData.get('namaDosen'),
        target: formData.get('target'),
        rincianKegiatan: formData.get('rincianKegiatan'),
        kendala: formData.get('kendala'),
        output: formData.get('output'),
        buktiKegiatan: formData.get('buktiKegiatan'),
      });

      console.log(logbookFormData);
      
      return createLogbookDetail(logbookId, logbookFormData);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
    console.log(formData);
  };

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Pengumpulan Logbook</h2>
        </div>
  
        <Card>
          <CardContent className="pt-6">
            {mutation.isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {mutation.error?.message || 'Terjadi kesalahan saat mengirim data'}
                </AlertDescription>
              </Alert>
            )}
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Dimulai: Senin, 7 Oktober 2024, 12:00
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Tanggal: Jumat, 11 Oktober 2024, 12:00
                  </p>
                </div>
              </div>
  
              <div className="space-y-2">
                <div>
                  <Label htmlFor="namaDosen">Nama Dosen</Label>
                  <Input id="namaDosen" name="namaDosen" required />
                </div>
  
                <div>
                  <Label htmlFor="target">Target</Label>
                  <Textarea id="target" name="target" required />
                </div>
  
                <div>
                  <Label htmlFor="rincianKegiatan">Rincian Kegiatan</Label>
                  <Textarea id="rincianKegiatan" name="rincianKegiatan" required />
                </div>
  
                <div>
                  <Label htmlFor="kendala">Kendala</Label>
                  <Textarea id="kendala" name="kendala" required />
                </div>
  
                <div>
                  <Label htmlFor="buktiKegiatan">Bukti Kegiatan</Label>
                  <Input 
                    id="buktiKegiatan" 
                    name="buktiKegiatan" 
                    type="file" 
                    className="mt-1 cursor-pointer" 
                    required 
                  />
                </div>
  
                <div>
                  <Label htmlFor="output">Output</Label>
                  <Textarea id="output" name="output" required />
                </div>
              </div>
  
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Kembali
                </Button>
                <Button 
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Mengirim...' : 'Selesai'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
