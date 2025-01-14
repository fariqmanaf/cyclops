import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function TextAreaComponent({
  form,
  identifier,
  label,
  placeholder,
  className,
}) {
  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`text-sm font-semibold ${className}`}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full">
              <Textarea
                {...field}
                className="rounded-xl"
                onBlur={field.onBlur}
                placeholder={placeholder}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
