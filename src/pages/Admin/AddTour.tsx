import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/Division/Division.api";
import { useAddTourMutation, useGetTourTypeQuery } from "@/redux/features/Tour/Tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
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
      costFrom: "",
      location: "",
      departureLocation: "",
      arrivalLocation: "",
      maxGuest: "",
      minAge: "",
      description: "",
      startDate: "",
      endDate: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
    }
  })

  const {
    fields: includedFields,
    append: includedAppend,
    remove: includedRemove
  } = useFieldArray({
    control: form.control,
    name: "included",
  })
  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  })
  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  })
  const {
    fields: tourPlanFields,
    append: tourPlanAppend,
    remove: tourPlanRemove
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  })

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("loading..")
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
      amenities: data.amenities.map((item: { value: string }) => item.value),
      tourPlan: data.tourPlan.map((item: { value: string }) => item.value)
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File))
    try {
      await addTour(formData).unwrap()
      toast.success("Tour Created Successfully.", { id: toastId })
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
                {/* location , cost  */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="costFrom"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                {/* departure , arrival  */}
                <div className="flex gap-5">
                  
                  <FormField
                    control={form.control}
                    name="departureLocation"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Departure Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="arrivalLocation"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Arrival Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                {/* max guest , min age  */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="maxGuest"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Max Guest</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Min Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
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
                                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
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
                                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
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
                <div className="border-t border-muted w-full"></div>
                <div className="flex justify-between">
                  <p className="font-semibold text-lg">Included</p>
                  <Button type="button" size="icon" variant="outline" onClick={() => includedAppend({ value: "" })}>
                    <Plus />
                  </Button>
                </div>
                <div>
                  {
                    includedFields.map((item, index) => (
                      <div className="space-y-4 flex gap-3">
                        <FormField
                          control={form.control}
                          name={`included.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => includedRemove(index)}
                          className=" cursor-pointer">
                          <Trash2 />
                        </Button>
                      </div>
                    ))
                  }
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold text-lg">Excluded</p>
                  <Button type="button" size="icon" variant="outline" onClick={() => excludedAppend({ value: "" })}>
                    <Plus />
                  </Button>
                </div>
                <div>
                  {
                    excludedFields.map((item, index) => (
                      <div className="space-y-4 flex gap-3">
                        <FormField
                          control={form.control}
                          name={`excluded.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => excludedRemove(index)}
                          className="cursor-pointer">
                          <Trash2 />
                        </Button>
                      </div>
                    ))
                  }
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold text-lg">Amenities</p>
                  <Button type="button" size="icon" variant="outline" onClick={() => amenitiesAppend({ value: "" })}>
                    <Plus />
                  </Button>
                </div>
                <div>
                  {
                    amenitiesFields.map((item, index) => (
                      <div className="space-y-4 flex gap-3">
                        <FormField
                          control={form.control}
                          name={`amenities.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => amenitiesRemove(index)}
                          className="cursor-pointer">
                          <Trash2 />
                        </Button>
                      </div>
                    ))
                  }
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-lg">Tour Plan</p>
                  <Button type="button" size="icon" variant="outline" onClick={() => tourPlanAppend({ value: "" })}>
                    <Plus />
                  </Button>
                </div>
                <div>
                  {
                    tourPlanFields.map((item, index) => (
                      <div className="space-y-4 flex gap-3">
                        <FormField
                          control={form.control}
                          name={`tourPlan.${index}.value`}
                          key={item.id}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => tourPlanRemove(index)}
                          className="cursor-pointer">
                          <Trash2 />
                        </Button>
                      </div>
                    ))
                  }
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