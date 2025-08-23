import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { DeleteConfirmation } from "@/components/modules/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDivisionsQuery, useRemoveDivisionMutation } from "@/redux/features/Division/Division.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";



export default function AddDivision() {

  const { data } = useGetDivisionsQuery(undefined)
  const [removeDivision]= useRemoveDivisionMutation()

  const handleRemoveDivision = async (tourId: string) => {
          const toastId = toast.loading("Removing...")
          try {
              const res = await removeDivision(tourId).unwrap()
              
              if(res.success){
                  toast.success("Removed", {id: toastId})
              }
          } catch (error) {
              console.log(error);
              
          }
      }

  console.log(data);


  return (
    <div className="p-6">
      <div className="flex justify-between">
      <h1 className="text-lg font-bold">Division</h1>
        <AddDivisionModal />
        </div>
      <div className="border border-muted rounded-md mt-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data?.map((item: { name: string, _id: string }) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell className="font-medium">
                    <DeleteConfirmation onConfirm={() => handleRemoveDivision(item._id)}>
                      <Button className=" cursor-pointer" size='sm'>
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}