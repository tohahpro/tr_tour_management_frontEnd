import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/Division/Division.api";
import { useGetTourTypeQuery } from "@/redux/features/Tour/Tour.api";
import { useSearchParams } from "react-router";


export default function TourFilters() {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const selectedDivision = searchParams.get("division") || undefined;
    const selectedTourType = searchParams.get("tourType") || undefined;


    const { data: divisionData, isLoading: divisionIsLoading } = useGetDivisionsQuery(undefined)
    const { data: tourTypeData, isLoading: tourTypeIsLoading } = useGetTourTypeQuery({fields: "_id, name"})

    const divisionOptions = divisionData?.map(
        (item: { _id: string, name: string }) => ({
            label: item.name,
            value: item._id
        })
    )
    const tourTypeOptions = tourTypeData?.data?.map(
        (item: { _id: string, name: string }) => ({
            label: item.name,
            value: item._id
        })
    )

    const handleDivisionChange =(value: string)=>{
        const params = new URLSearchParams(searchParams);
        params.set("division", value)
        setSearchParams(params)
        
    }
    const handleTourTypeChange =(value: string)=>{
        const params = new URLSearchParams(searchParams);
        params.set("tourType", value)
        setSearchParams(params)
    }

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("division")
        params.delete("tourType")
        setSearchParams(params)
    }

    return (
        <div>
            <div className="flex justify-between">
                <h2>Tour Filters</h2>
                <Button onClick={handleClearFilter}>Clear Filter</Button>
            </div>
            <div className="flex gap-20 lg:flex-col">
                <div>
                    <Label className="mb-2">Division</Label>
                    <Select
                        onValueChange={handleDivisionChange}
                        disabled={divisionIsLoading}
                        value={selectedDivision? selectedDivision : ""}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                divisionOptions?.map(
                                    (item: { value: string, label: string }) => (
                                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                    )
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">Tour Type</Label>
                    <Select
                    onValueChange={handleTourTypeChange}
                        disabled={tourTypeIsLoading}
                        value={selectedTourType? selectedTourType: ""}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select tour type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                tourTypeOptions?.map(
                                    (item: { value: string, label: string }) => (
                                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                    )
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
        </div>
    );
}