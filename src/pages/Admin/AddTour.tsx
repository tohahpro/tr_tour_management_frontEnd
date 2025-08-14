import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/Division/Division.api";
import { useAddTourMutation, useGetTourTypeQuery } from "@/redux/features/Tour/Tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";



export default function AddTour() {

  const [images, setImages] = useState<(File | FileMetadata)[]>([])
  
  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined)
  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined)
  const [addTour] = useAddTourMutation();

  const tourTypeOptions = tourTypeData?.data?.map((item: { _id: string; name: string }) => ({
    value: item._id,
    label: item.name
  }));

  const divisionOptions = divisionData?.map((item: { _id: string; name: string }) => ({
    value: item._id,
    label: item.name
  }));

  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      description: "",
      startDate: "",
      endDate: ""
    }
  })

const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
  const toastId = toast.loading("loading..")  
  const tourData={
      ...data,
      startDate : formatISO(data.startDate),
      endDate : formatISO(data.endDate),
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image)=> formData.append("files", image as File))      
    try {
      await addTour(formData).unwrap()
      toast.success("Tour Created Successfully.", {id: toastId})   
      form.reset()
    } catch (error) {
      toast.error(data.message)
      console.log(error);      
    }    
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto px-5 mt-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">Add New Tour</CardTitle>
            <CardDescription className="text-center">Add a new tour to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="add-tour-form"
                className="space-y-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setDate(new Date().getDate() - 1))
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setDate(new Date().getDate() - 1))
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="tourType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tour Type</FormLabel>
                        <FormControl>
                          <Select
                            disabled={tourTypeLoading}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                tourTypeOptions?.map((item: { label: string; value: string }) => (
                                  <SelectItem value={item.value}>{item.label}</SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tour Division</FormLabel>
                        <FormControl>
                          <Select
                            disabled={divisionLoading}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                divisionOptions?.map((item: { label: string; value: string }) => (
                                  <SelectItem value={item.value}>{item.label}</SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="flex gap-5 items-stretch">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-44" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <MultipleImageUploader onChange={setImages} />
                  </div>

                </div>

              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="w-full" type="submit" form="add-tour-form">
              Create Tour
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}