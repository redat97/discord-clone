"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origins";

export const InviteModal = () => {
    const { isOpen, onClose, type, data} = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Inviten friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button size="icon">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
