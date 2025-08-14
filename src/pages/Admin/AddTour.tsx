import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/Division/Division.api";
import { useGetTourTypeQuery } from "@/redux/features/Tour/Tour.api";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";



export default function AddTour() {

  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined)

  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined)


  const tourTypeOptions = tourTypeData?.data?.map((item: { _id: string; name: string }) => ({
    value: item._id,
    label: item.name
  }));

  const divisionOptions = divisionData?.map((item: { _id: string; name: string }) => ({
    value: item._id,
    label: item.name
  }));

  console.log(tourTypeOptions);


  const form = useForm({
    defaultValues:{
      title: "",
      division: "",
      tourType: "",
      description: "",
      startDate: "",
      endDate: "",
    }
  })


  const handleSubmit =(data)=>{
    console.log(data);
    
  }
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
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="startDate"
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
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
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
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
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
                    name="tourDivision"
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