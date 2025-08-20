import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ApiError } from "@/types";

export default function ProfileUpdate() {

    const { data, isLoading, isError } = useUserInfoQuery(undefined)
    const user = data?.data;
    const [updateProfile] = useUpdateProfileMutation();
    const navigate = useNavigate()


    const form = useForm()

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating...")
        try {            
            const res = await updateProfile({ id: user._id || user.id, userInfo: data }).unwrap();
            if (res.success) {
                toast.success("Updated Successful", { id: toastId })
                navigate("/profile")
            }            
        } catch (err) {
            const error = err as ApiError;
            toast.error(error!.data!.message, { id: toastId })
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }


    return (



        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Profile Details Update</h1>

            {!isLoading && isError && (
                <div className="flex w-full py-20 justify-center items-center">
                    <p>Something Went Wrong!!</p>{" "}
                </div>
            )}

            {!isLoading && data?.length === 0 && (
                <div>
                    <p>No Data Found</p>{" "}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Update Details</CardTitle>
                </CardHeader>
                {
                    !isLoading && (
                        <CardContent>
                            <Form {...form}>
                                <form
                                    id="add-tour-form"
                                    className="space-y-5"
                                    onSubmit={form.handleSubmit(handleSubmit)}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Profile Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            defaultValue={user?.name}
                                                            value={field.value} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input {...field}
                                                                    defaultValue={user?.email}
                                                                    disabled />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                /> */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            rules={{
                                                pattern: {
                                                    value: /^\+?\d{11,11}$/,
                                                    message: "Enter a valid phone number",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            type="number"
                                                            defaultValue={user?.phone}
                                                            value={field.value} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field}
                                                            className="min-h-32"
                                                            placeholder="House 45, Road 7, Park Avenue, Dhaka 1000"
                                                            defaultValue={user?.address}
                                                            value={field.value} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button className="w-full cursor-pointer">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    )
                }
            </Card>
        </div>
    );
}