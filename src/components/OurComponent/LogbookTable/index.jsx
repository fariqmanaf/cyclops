import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { BodyTabelLogbook } from "./tableBody";

export function LogbookTable({ data, isLoading }) {
  const [dataTable, setDataTable] = useState();

  useEffect(() => {
    if (data) {
      setDataTable(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nama Mahasiswa</TableHead>
          <TableHead className="text-center">NIM</TableHead>
          <TableHead className="text-center">Topik</TableHead>
          <TableHead className="text-center">Nama Dosen</TableHead>
          <TableHead className="text-center">Target</TableHead>
          <TableHead className="text-center">Progres</TableHead>
          <TableHead className="text-center">Rincian Kegiatan</TableHead>
          <TableHead className="text-center">Absensi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable?.length > 0 &&
          dataTable.map((item) => {
            return <BodyTabelLogbook item={item} />;
          })}
      </TableBody>
    </Table>
  );
}
