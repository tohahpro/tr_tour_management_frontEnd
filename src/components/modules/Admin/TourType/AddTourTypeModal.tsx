/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourTypeMutation } from "@/redux/features/Tour/Tour.api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddTourTypeModal() {

  const form = useForm()
  const [open, setOpen] = useState(false);
  const [addTourType] = useAddTourTypeMutation()


  const onSubmit = async (data: any) => {
    console.log(data);

    const res = await addTourType(data).unwrap()
    if (res.success) {
      toast.success("Tour Type Added Successful.")
      setOpen(false)
      form.reset();
    }

  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tour Type Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-tour-type">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
