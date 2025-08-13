import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/modules/deleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/Tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";



export default function AddTourType() {

    const { data } = useGetTourTypeQuery(undefined)

    const [removeTourType] = useRemoveTourTypeMutation()

    const handleRemoveTourType = async (tourId: string) => {
        const toastId = toast.loading("Removing...")
        try {
            const res = await removeTourType(tourId).unwrap()
            
            if(res.success){
                toast.success("Removed", {id: toastId})
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <div className="w-full max-w-4xl mx-auto px-5">
            <div className="flex justify-between py-10">
                <h2 className="font-medium text-lg">Tour Types</h2>
                <AddTourTypeModal />
            </div>
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((item: { name: string, _id: string }) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item?.name}</TableCell>
                                    <TableCell className="font-medium">
                                        <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
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