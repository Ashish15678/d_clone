"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";


import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteModal = () => {
    const {isOpen , onClose,type,data, onOpen} = useModal()
    const origin = useOrigin();
    const {server} = data;

    const isOpenModal = isOpen && type==="invite"
    const inviteUrl = `${origin}/invite/${server?.invitecode}`

    const [copied , setCopied] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)
        setTimeout(()=>{setCopied(false)},1000)
    }


 

    return (
      <>
        <Dialog open={isOpenModal} onOpenChange={onClose}>
          <DialogContent className="bg-white text-black overflow-hidden p-0">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-center text-2xl font-bold">
                    Invite your friends
              </DialogTitle>
            </DialogHeader>
                <div className="p-6">
                    <Label
                    className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70"
                    >server invite link</Label>
                    <div
                    className="flex items-center mt-2 gap-x-2"
                    >
                        <Input
                        className="bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled
                        value={inviteUrl}
                        />
                        <Button size={"icon"} onClick={onCopy} >
                            {copied?
                            <Check className="w-4 h-4 text-green-500"/> :  
                            <Copy className="w-4 h-4"/>}
                           
                        </Button>
                    </div>
                   <div className="p-4 mt-2"></div>
                </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

