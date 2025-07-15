"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/app/hooks/use-toast";
import { changeRole } from "@/actions/user/changeRole";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserRole } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

import { useUser } from "@/app/hooks/useUser";

export default function Page() {
    return (
        <div className="p-10 w-full space-y-4">
            <p className="text-3xl font-bold">Settings</p>
            <SwitchForm />
        </div>
    );
}

const FormSchema = z.object({
    partner_account: z.boolean(),
});

export function SwitchForm() {
    const { user, refreshUser } = useUser();
    const [isSwitchChanged, setIsSwitchChanged] = useState(false);
    const [initialSwitchValue, setInitialSwitchValue] = useState<boolean | null>(null);

    useEffect(() => {
        if (user) {
            setInitialSwitchValue(user.role === UserRole.HOST);
        }
    }, [user]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            partner_account: initialSwitchValue ?? false,
        },
        values: initialSwitchValue !== null ? { partner_account: initialSwitchValue } : undefined,
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const newRole = data.partner_account ? UserRole.HOST : UserRole.CUSTOMER;
        changeRole(user?.id!);
        await refreshUser();
        toast({
            title: `Account role changed ${newRole}`,
        });
        setIsSwitchChanged(false);
    }

    if (initialSwitchValue === null) {
        return <Skeleton className="h-20 rounded-lg" />;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="partner_account"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Partner account</FormLabel>
                                <FormDescription>
                                    Be a DineDlight partner and host your restaurant services...
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                        setIsSwitchChanged(true);
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {isSwitchChanged && (
                    <Button type="submit">
                        Save changes
                    </Button>
                )}
            </form>
        </Form>
    );
}
