import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BodyTabelMahasiswa } from "./tableBody";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";

export function MahasiswaTable({ data, isLoading }) {
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
            const roles = [
              item?.role1 && {
                label: item.role1,
                value: item.role1,
              },
              item?.role2 && {
                label: item.role2,
                value: item.role2,
              },
            ].filter(Boolean);
            return (
              <BodyTabelMahasiswa
                key={item.id}
                id={item.id}
                item={item}
                roles={roles}
                setDataTable={setDataTable}
              />
            );
          })}
      </TableBody>
    </Table>
  );
}
