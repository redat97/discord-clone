"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { initialProfile } from "@/lib/initial-profile";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';



import{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
});

export const InitialModal = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            imageUrl: '',
        }
    });

    if (!isMounted) {
        return null;
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Create your server
                    </DialogTitle>
                    <DialogDescription className="p-2 text-center">
                        This is your server make it your own and give it a personality !
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-8 px-6">
                            <div className="text-center">
                                IMAGE UPLOAD
                            </div>
                            <FormField
                            control={form.control}
                            name="name"
                            render= {({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-white">
                                        Server name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Enter server name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <DialogFooter className="p-3">
                                <Button disabled={isLoading} variant={"ghost"} className="mx-auto w-1/4 border-2">
                                    Create
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}

export default InitialModal;
