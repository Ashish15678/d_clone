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
import { useRouter } from "next/navigation";
import { DialogTrigger } from "@/components/ui/dialog";
import { ModeToggle } from "@/app/mode-toggle/mode-toggle";
import { useModal } from "@/hooks/use-modal-store";

const formScehma = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const CreateServerModal = () => {
    const {isOpen , onClose,type} = useModal()

    const isOpenModal = isOpen && type==="createServer"
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formScehma),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formScehma>) => {
    console.log(values);
  try {
     axios.post("/api/servers", values);
     form.reset();
     onClose()
     router.refresh();

   } catch (error) {
     console.log("ERROR in creating server: ", error);         
  }
    }

    const handleClose = () =>{
        form.reset()
        onClose()
    }

    return (
      <>
        <Dialog open={isOpenModal} onOpenChange={handleClose}>
          {/* <DialogTrigger>Create server?</DialogTrigger> */}
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

