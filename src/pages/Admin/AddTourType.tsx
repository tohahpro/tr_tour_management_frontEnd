import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/modules/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/Tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



export default function AddTourType() {

    const [currentPage, setCurrentPage] = useState(1)
    const [limit] = useState(10)

    const { data } = useGetTourTypeQuery({ page: currentPage, limit })
    const [removeTourType] = useRemoveTourTypeMutation()

    const handleRemoveTourType = async (tourId: string) => {
        const toastId = toast.loading("Removing...")
        try {
            const res = await removeTourType(tourId).unwrap()

            if (res.success) {
                toast.success("Removed", { id: toastId })
            }
        } catch (error) {
            console.log(error);
        }
    }


    const totalPage = data?.meta?.totalPage || 1;
    const paginationPage = Array.from({ length: totalPage }, (_, index) => index + 1);


    return (
        <div className="w-full max-w-4xl mx-auto px-5">
            <div className="flex justify-between py-10">
                <h2 className="font-medium text-lg">Tour Types</h2>
                <AddTourTypeModal />
            </div>
            <div className="mb-20">
                <div className="border border-muted rounded-md grow-1">
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

            {
                totalPage > 1 && (
                    <div className="flex items-end">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={currentPage === 1
                                    ? 'pointer-events-none opacity-50'
                                    : "cursor-pointer"
                                }
                                onClick={() => setCurrentPage((prev) => prev - 1)} />
                        </PaginationItem>
                        {
                            paginationPage.map(page => (
                                <PaginationItem
                                 key={page}
                                 onClick={()=>setCurrentPage(page)}
                                 >
                                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                </PaginationItem>
                            )
                            )
                        }
                        <PaginationItem>
                            <PaginationNext
                                className={currentPage === totalPage
                                    ? 'pointer-events-none opacity-50'
                                    : "cursor-pointer"
                                }
                                onClick={() => setCurrentPage((prev) => prev + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
                )
            }
        </div>
    );
}