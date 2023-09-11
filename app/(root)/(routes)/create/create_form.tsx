"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm, Form, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";

const itemFormSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  price: z.string({
    required_error: "A price is required.",
  }),
});

type AccountFormValues = z.infer<typeof itemFormSchema>;

export function CreateForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(itemFormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: AccountFormValues) {
    console.log(`Client imageUrl ${data.imageUrl}`);
    await axios.post("/api/items", {
      imageUrl: data.imageUrl,
      name: data.name,
      price: parseFloat(data.price),
    });
    router.refresh();
    router.push("/");
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  endpoint="itemImage"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Item Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the item that will be displayed to your
                customer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Item Price" {...field} />
              </FormControl>
              <FormDescription>
                This is the price of the item that your customer will pay.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Item</Button>
      </form>
    </FormProvider>
  );
}
