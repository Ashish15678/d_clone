"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import FileUpload from "@/components/file-upload";

import {
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formScehma = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm({
    resolver: zodResolver(formScehma),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formScehma>) => {
    // console.log(values);
    try {
      axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log("ERROR in creating server: ", error);
    }

    if (!isMounted) {
      return null;
    }

    return (
      <>
        <Dialog open={true}>
          <DialogContent className="bg-white text-black overflow-hidden p-0">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-center text-2xl font-bold">
                Customize your server
              </DialogTitle>
              <DialogDescription className="text-xinc-500 text-center">
                Provide image and name of your server
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-8 px-6">
                  <div className="flex items-center justify-center text-center">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              endpoint="serverImage"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-zinc-500 dark:text-secondary/70">
                          Server name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus:focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            placeholder="Enter servers name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                  <Button variant={"primary"} disabled={isLoading}>
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  };
};
