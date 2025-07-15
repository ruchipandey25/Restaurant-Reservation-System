"use client";

import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    addRestaurantSchema,
    AddRestaurantInput
} from "@/lib/validationSchemas";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/file-upload";

import { addRestaurant } from "@/actions/restaurant/addRestaurant";
import { toast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";

export function AddRestaurantForm() {

    const router = useRouter();
    const { user } = useUser()

    const form = useForm<AddRestaurantInput>({
        resolver: zodResolver(addRestaurantSchema),
        defaultValues: {
            name: "",
            location: "",
            coverImage: "",
            openTiming: "",
            cuisineType: "Mix",
            tagline: "",
            tableCharge: "0",
        },
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: AddRestaurantInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("location", data.location);
            formData.append("coverImage", data.coverImage);
            formData.append("openTiming", data.openTiming);
            formData.append("cuisineType", data.cuisineType);
            formData.append("tagline", data.tagline!);
            formData.append("tableCharge", data.tableCharge)

            const result = await addRestaurant(formData, user?.id!);

            if (result.success) {
                router.push("/my-restaurant");
                toast({
                    description: "Restaurant added successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    return (
        <div className="max-w-lg p-10 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Add Restaurant</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Restaurant Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter restaurant name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Restaurant Tagline (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter restaurant tagline" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Sector 18, Greater Noida" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="openTiming"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Open Timing</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 10:00 AM - 10:00 PM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cuisineType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cuisine Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Italian, chinies..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tableCharge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Table Charge</FormLabel>
                                <FormControl>
                                    <Input placeholder="$200" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        endpoint="coverImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Add Restaurant"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
