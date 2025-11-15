import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from 'zod'


const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
})

export default function Verify() {

  const location = useLocation();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  // step-1 
  const [sendOtp] = useSendOtpMutation();
  // step-2 
  const [verifyOtp] = useVerifyOtpMutation();
  // step-3 
  const [timer, setTimer] = useState(30)

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const handleSendOtp = async () => {
    
    const toastId = toast.loading("Sending OTP")
    
    try {
      // step-1 
      const res = await sendOtp({ email: email })
      if (res.data?.success) {
        toast.success("OTP Sent", { id: toastId })
        setConfirmed(true)
        setTimer(80)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP")
    const userInfo = {
      email,
      otp: data.pin
    };

    try {
      // step-2
      const res = await verifyOtp(userInfo).unwrap()
      if (res.success) {
        toast.success("OTP verified", { id: toastId })
        setConfirmed(true)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!email) {
      navigate('/')
    }
  }, [email, navigate])


  // step-3 
  useEffect(() => {
    if (!email || !confirmed) {
      return
    }
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => prev > 0 ? prev - 1 : 0)
        console.log("tick");

      }
    }, 1000);

    return () => clearInterval(timerId)
  }, [email, confirmed])


  return (
    <div className="h-screen grid place-content-center">

      {
        confirmed ? (
          <Card className="w-[20rem] md:w-[25rem]">
            <CardHeader className="">
              <CardTitle className="text-xl text-center">Verify your email address</CardTitle>
              <CardDescription className="text-center">
                Please enter the 4-digit code we sent to <br /> {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Form {...form}>
                <form
                  id="otp-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="flex justify-center">One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={4} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription className="flex items-center gap-1">
                          <Button
                            onClick={handleSendOtp}
                            className={cn("p-0 m-0", {
                              "cursor-pointer": timer === 0,
                              "text-gray-500": timer !== 0,
                            })}
                            disabled={timer !== 0}
                            type="button" variant="link">Resent OTP : </Button><span className="font-bold">{timer}</span>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center ">
              <Button className="w-3/5 cursor-pointer" form="otp-form" type="submit">Submit</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-[20rem] md:w-[25rem]">
            <CardHeader className="">
              <CardTitle className="text-xl text-center">Verify your email address</CardTitle>
              <CardDescription className="text-center">
                We will send you an OTP at <br /> <span className="font-medium text-red-600">{email}</span>
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center ">
              <Button onClick={handleSendOtp} className="w-3/5 cursor-pointer" type="submit">Confirm</Button>
            </CardFooter>
          </Card>
        )
      }




    </div>
  );
}