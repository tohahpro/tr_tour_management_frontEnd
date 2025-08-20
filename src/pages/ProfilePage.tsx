import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Link } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { ApiError } from "@/types";

export default function ProfilePage() {

    const { data, isLoading, isError } = useUserInfoQuery(undefined)
    const [updatePassword] = useChangePasswordMutation()

    const user = data?.data;
    console.log(user);

    const form = useForm()


    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastId = toast.loading("Updating...")
        try {
            const res = await updatePassword(data).unwrap();
            if (res.success) {
                toast.success("Password changed successfully", { id: toastId })

            }
        } catch (err) {
            const error = err as ApiError;
            console.error("Update Failed:", error!.data!.message);
            toast.error(error!.data!.message, { id: toastId })
        }

    }


    return (
        <>
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


            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Profile Details</h1>

                {
                    !isLoading && !isError && (
                        <Tabs defaultValue="profile" className="w-1/2 mx-auto">
                            <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                            </TabsList>

                            {/* Profile Tab */}
                            <TabsContent value="profile">
                                <Card className="">
                                    <CardHeader>
                                        <CardTitle>Profile Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First name</Label>
                                                <p>{user?.name}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <p>{user?.email}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Phone</Label>
                                                <p>{user?.phone || 'Please set your Phone Number'}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="role">Role</Label>
                                                <p>{user?.role}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="role">Address</Label>
                                                <p>{user?.address || 'Please set your Address'}</p>
                                            </div>
                                        </div>
                                        <Link to={`/profile/${user._id}`}><Button variant="outline">Update Profile</Button></Link>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab */}
                            <TabsContent value="security">
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Security Settings</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4 pt-4">
                                                <h3 className="font-medium">Password</h3>
                                                <Form {...form}>
                                                    <form
                                                        id="add-tour-form"
                                                        className="space-y-5"
                                                        onSubmit={form.handleSubmit(handleSubmit)}
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <FormField
                                                                control={form.control}
                                                                name="oldPassword"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormLabel>Old Password</FormLabel>
                                                                        <FormControl>
                                                                            <Password {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="newPassword"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormLabel>Old Password</FormLabel>
                                                                        <FormControl>
                                                                            <Password {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <Button className="w-full cursor-pointer">Submit</Button>
                                                    </form>
                                                </Form>
                                                <Link to={'/'}><Button variant="outline">Change Password</Button></Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )
                }
            </div>

        </>

    );
}