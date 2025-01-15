import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BodyTabelMahasiswaAccepted } from "./tableBodyAccepted";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";

export function MahasiswaAcceptedTable({ data, isLoading }) {
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
          <TableHead className="">Nama</TableHead>
          <TableHead className="">NIM</TableHead>
          <TableHead className="">Topik</TableHead>
          <TableHead className="">Program Studi</TableHead>
          <TableHead className="">No Whatsapp</TableHead>
          <TableHead className="">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable?.length > 0 &&
          dataTable.map((item) => {
            return (
              <BodyTabelMahasiswaAccepted
                key={item.id}
                id={item.id}
                item={item}
                setDataTable={setDataTable}
              />
            );
          })}
      </TableBody>
    </Table>
  );
}
