import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";

const LogbookProgress = () => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      // Replace with your API endpoint
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      return response.json();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Pengumpulan Progress 1</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
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

            <div className="space-y-4">
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
                <Textarea
                  id="rincianKegiatan"
                  name="rincianKegiatan"
                  required
                />
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
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="output">Output</Label>
                <Textarea id="output" name="output" required />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Kembali
              </Button>
              <Button type="submit">Selesai</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogbookProgress;
