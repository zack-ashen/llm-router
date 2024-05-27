"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { createRouter } from "./actions";

const schema = z.object({
  routerName: z.string().min(1, "Router name is required"),
});

type SchemaT = z.infer<typeof schema>;

export default function CreateRouterForm() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const form = useForm<SchemaT>({
    defaultValues: {
      routerName: "",
    },
    resolver: zodResolver(schema),
  });

  const submit = async (data: SchemaT) => {
    setLoading(true);
    try {
      const routerId = await createRouter(data);
      push(`/routers/${routerId}/dashboard`);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="routerName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="routerName" isRequired>
                Router Name
              </Label>
              <FormControl>
                <TextInput
                  placeholder="Enter a name for your router"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row form-actions w-full gap-4 justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="primary" type="submit" loading={loading}>
            Create Router
            <FaPlus className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
