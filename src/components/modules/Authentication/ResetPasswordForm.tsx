/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";

export function ResetPasswordForm() {
    const form = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const [resetPassword] = useResetPasswordMutation();
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const userId = params.get("id");
    const token = params.get("token");

    const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        try {
            await resetPassword({
                id: userId!,
                token: token!,
                newPassword: data.newPassword,
            }).unwrap();

            toast.success("Password changed successfully");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-screen flex items-center">
            <div className="w-96 mx-auto p-6 shadow rounded-lg">
                <h2 className="text-center text-lg font-medium">Reset Your <span className="text-primary">Password</span></h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
