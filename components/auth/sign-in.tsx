"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignInUserInput, signInUserSchema } from "@/lib/validationSchemas";
import { signInUser } from "@/actions/user/signInUser";
import { toast } from "@/app/hooks/use-toast";

export default function SignIn() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(signInUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: SignInUserInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const result = await signInUser(formData);

            if (result.success) {
                toast({
                    description: "User signed in successfully",
                });
                router.push("/");
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    const handleGuestLogin = () => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", "guest@gmail.com");
            formData.append("password", "guestPassword123");

            const result = await signInUser(formData);

            if (result.success) {
                toast({
                    description: "Guest user signed in successfully",
                });
                router.push("/");
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="p-10 space-y-2 border rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">DineDelight</h1>
                <h2 className="text-3xl">Sign in</h2>
                <div
                    className="flex w-full gap-2 p-2 font-bold text-yellow-800 duration-200 bg-yellow-100 rounded-lg cursor-pointer"
                    onClick={handleGuestLogin}
                >
                    <ShieldQuestion />
                    <p>Guest Mode</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                onClick={() => router.push("/sign-up")}
                className="p-4 text-center border rounded-lg shadow-lg cursor-pointer"
            >
                <p className="text-sm text-muted-foreground">Create your DineDelight account</p>
            </div>
        </div>
    );
}
