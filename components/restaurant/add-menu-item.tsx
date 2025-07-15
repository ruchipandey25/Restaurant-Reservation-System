"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMenuItemInput, addMenuItemSchema } from "@/lib/validationSchemas";
import { toast } from "@/app/hooks/use-toast";
import { addMenuItem } from "@/actions/restaurant/addMenuItem";

interface AddMenuItemsProps {
    restaurantId: string
}

export default function AddMenuItem({ restaurantId }: AddMenuItemsProps) {
    const [menuDialogOpen, setMenuDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(addMenuItemSchema),
        defaultValues: {
            dish: "",
            description: "",
            price: "",
        },
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: AddMenuItemInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("dish", data.dish);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("restaurantId", restaurantId)

            const result = await addMenuItem(formData);

            if (result.success) {
                toast({
                    description: "Item Added successfully",
                });
                setMenuDialogOpen(false);
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    return (
        <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-end w-full p-4">
                    <Button className='text-white bg-green-500 hover:bg-green-600'>
                        <Plus className='w-4 h-4 mr-2' />
                        Add New Item
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>Add a new dish</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="dish"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dish name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Spaghetti Carbonara"
                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Creamy sauce with pancetta and pecorino cheese"
                                            {...field} />
                                    </FormControl>
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
                                        <Input
                                            placeholder="$15.00"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button variant='outline' onClick={() => setMenuDialogOpen(false)} disabled={isPending}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className='bg-slate-500 hover:bg-slate-600'
                                disabled={isPending}
                            >
                                {isPending ? "Creating..." : "Add Item"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
};