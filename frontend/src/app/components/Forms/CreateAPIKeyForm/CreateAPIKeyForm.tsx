"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import * as z from "zod";
import { DialogClose } from "../../Dialogs/Base/Dialog";
import { Button } from "../../Inputs/Button/Button";
import { Label } from "../../Inputs/Label/Label";
import { TextInput } from "../../Inputs/TextInput/TextInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../Base/Form/Form";
import { createAPIKey } from "./actions";

const schema = z.object({
  apiKeyName: z.string().min(1, "Router name is required"),
});

type SchemaT = z.infer<typeof schema>;

export default function CreateAPIKeyForm() {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<SchemaT>({
    defaultValues: {
      apiKeyName: "",
    },
    resolver: zodResolver(schema),
  });

  const submit = async (data: SchemaT) => {
    setLoading(true);
    try {
      const apiKey = await createAPIKey({ ...data, routerId: routerId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
    setLoading(false);
    closeButtonRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="apiKeyName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="apiKeyName" isRequired>
                Name
              </Label>
              <FormControl>
                <TextInput
                  placeholder="Enter a name for your API Key"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row form-actions w-full gap-4 justify-end">
          <DialogClose asChild>
            <Button variant="secondary" ref={closeButtonRef}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" type="submit" loading={loading}>
            Create API Key
            <FaPlus className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
