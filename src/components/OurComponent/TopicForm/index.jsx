import { useState } from "react";
import { InputFormComponent } from "../Input Form/inputText";
import { Button } from "@/components/ui/button";
import ReactLoading from "react-loading";
import { TextAreaComponent } from "../Input Form/textArea";

export function TopicForm({ form, roles, isPending }) {
  const [manyRoles, setManyRoles] = useState(roles || []);

  const addRole = () => {
    setManyRoles([...manyRoles, ""]);
  };

  return (
    <div className="shadow-lg w-[30rem] border rounded-xl p-4">
      <div className="grid gap-1 py-2">
        <InputFormComponent
          form={form}
          identifier={"nama"}
          placeholder={"Masukkan Nama Topik"}
          type={"text"}
        />
        <TextAreaComponent
          form={form}
          identifier={"deskripsi"}
          placeholder={"Masukkan Deskripsi Topik"}
        />
        {!roles ? (
          <>
            <InputFormComponent
              form={form}
              identifier={`roles.0`}
              placeholder={`Masukkan Role 1`}
              type="text"
            />
            {manyRoles.map((_, index) => (
              <InputFormComponent
                key={index}
                form={form}
                identifier={`roles.${index + 1}`}
                placeholder={`Masukkan Role ${index + 2}`}
                type="text"
              />
            ))}
          </>
        ) : (
          manyRoles.map((_, index) => (
            <InputFormComponent
              key={index}
              form={form}
              identifier={`roles.${index}`}
              placeholder={`Masukkan Role ${index + 1}`}
              type="text"
            />
          ))
        )}

        <p
          onClick={addRole}
          className="w-full cursor-pointer mt-2 text-center p-2 rounded-lg bg-slate-500 hover:bg-slate-600 text-white"
        >
          Tambah Role
        </p>
      </div>
      <Button type="submit" className="w-full mt-2">
        {isPending ? (
          <ReactLoading type="spin" height={20} width={20} />
        ) : !roles ? (
          "Buat"
        ) : (
          "Edit"
        )}
      </Button>
    </div>
  );
}
