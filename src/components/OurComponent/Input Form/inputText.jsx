import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function InputFormComponent({
  form,
  identifier,
  label,
  placeholder,
  type,
}) {
  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#7126B5] text-sm font-semibold">
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full">
              <Input
                {...field}
                className="rounded-xl"
                onBlur={field.onBlur}
                placeholder={placeholder}
                type={type}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
