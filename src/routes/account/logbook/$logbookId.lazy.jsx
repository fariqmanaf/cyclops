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
import { useQuery } from '@tanstack/react-query'
import { fetchLogbookById } from '@/service/account/createLogbook'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/logbook/$logbookId')({
  component: () => (
    <Protected roles={['mahasiswa']}>
      <ProgressLogbook />
    </Protected>
  ),
})

function ProgressLogbook() {
  const navigate = useNavigate();
  const logbookId = Route.useParams().logbookId;

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const logbookFormData = createLogbookFormData({
        namaDosen: formData.get('namaDosen'),
        target: formData.get('target'),
        rincianKegiatan: formData.get('rincianKegiatan'),
        kendala: formData.get('kendala'),
        output: formData.get('output'),
        buktiKegiatan: formData.get('buktiKegiatan'),
        izin: formData.get('izin') || null
      });

      return createLogbookDetail(logbookId, logbookFormData);
    },
    onSuccess: () => {
      navigate('/account/logbook'); // Navigate to logbook list after success
    },
  });

  const { data: logbookData, isLoading } = useQuery({
    queryKey: ['logbook', logbookId],
    queryFn: () => fetchLogbookById(logbookId),
    enabled: !!logbookId,
  });

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  console.log(logbookData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isIzinChecked = e.target.izin.checked;
    formData.set('izin', isIzinChecked ? 'izin' : null);

    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#273B4A] border-opacity-75"></div>
      <p className="mt-4 text-[#273B4a] font-semibold">Loading, please wait...</p>
    </div>
    ); // Show a loading message or spinner while data is being fetched
  }

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-full max-w-2xl mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Pengumpulan Logbook</h2>
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
              <div className="space-y-2">
                <div>
                  <Label htmlFor="namaDosen">Nama Dosen</Label>
                  <Input
                    id="namaDosen"
                    name="namaDosen"
                    defaultValue={logbookData[0]?.namaDosen || ''}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="target">Target</Label>
                  <Textarea id="target" name="target" defaultValue={logbookData[0]?.target || ''} required />
                </div>

                <div>
                  <Label htmlFor="rincianKegiatan">Rincian Kegiatan</Label>
                  <Textarea
                    id="rincianKegiatan"
                    name="rincianKegiatan"
                    defaultValue={logbookData[0]?.rincianKegiatan || ''}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="kendala">Kendala</Label>
                  <Textarea id="kendala" name="kendala" defaultValue={logbookData[0]?.kendala || ''} required />
                </div>

                { logbookData[0]?.buktiKegiatan ? (
                  <div>
                    <Label htmlFor="buktiKegiatan">Bukti Kegiatan</Label>
                    <p className="text-sm text-gray-500">Current file: 
                      <span className='text-blue-600 cursor-pointer' onClick={() => openNewTab(logbookData[0]?.buktiKegiatan)}> Klik Disini</span>
                    </p>
                    <Input
                      id="buktiKegiatan"
                      name="buktiKegiatan"
                      type="file"
                      accept="image/*,.pdf"
                      className="mt-1 cursor-pointer"
                      required
                    />
                  </div>
                ):(
                  <div>
                    <Label htmlFor="buktiKegiatan">Bukti Kegiatan</Label>
                    <Input
                      id="buktiKegiatan"
                      name="buktiKegiatan"
                      type="file"
                      accept="image/*,.pdf"
                      className="mt-1 cursor-pointer"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="output">Output</Label>
                  <Textarea id="output" name="output" defaultValue={logbookData[0]?.output || ''} required />
                </div>

                <div className="flex items-center">
                  <Label htmlFor="izin">Izin</Label>
                  <Input
                    id="izin"
                    name="izin"
                    type="checkbox"
                    className="cursor-pointer "
                    defaultChecked={logbookData[0]?.izin == 'izin'} // Pre-check if izin exists and is true
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => navigate({ to : '/account/logbook'})}>
                  Kembali
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Mengirim...' : logbookData[0] ? 'Simpan' : 'Selesai'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
