/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export function ForgotPasswordForm() {
    const form = useForm({
        defaultValues: {
            email: "",
        },
    });

    const [forgotPassword] = useForgotPasswordMutation();

    const onSubmit = async (data: { email: string }) => {
        try {
            await forgotPassword({ email: data.email }).unwrap();
            toast.success("Password reset link sent! Check your email.");
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to send reset link");
        }
    };

    return (
        <div className="min-h-screen flex items-center">
            <div className="w-96 mx-auto p-6 shadow rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Send Reset Link
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
