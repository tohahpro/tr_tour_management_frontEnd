import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/Division/Division.api";
import { useGetTourTypeQuery } from "@/redux/features/Tour/Tour.api";
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


  const form = useForm()
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
              // onSubmit={form.handleSubmit(handleSubmit)}
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