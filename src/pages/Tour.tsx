import TourFilters from "@/components/modules/Tours/TourFilters";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/Tour/Tour.api";
import { Link, useSearchParams } from "react-router";

export default function Tours() {
  const [searchParams] = useSearchParams();

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  const { data } = useGetAllToursQuery({ division, tourType });


  return (
    <div className="container mx-auto px-5 py-8 lg:grid grid-cols-12 gap-5">
      <div className="col-span-3 mb-10 lg:mb-0">
        <TourFilters />
      </div>
      <div className="col-span-9 w-full">
        {data?.map((item) => (
          <div
            key={item.slug}
            className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
          >
            <div className="w-2/5 bg-red-500 flex-shrink-0">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full "
              />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">



                  From ৳{item.costFrom}
                </span>
                <span className="text-sm text-muted-foreground">
                  Max {item.maxGuest} guests
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">From:</span>{" "}
                  {item.departureLocation}
                </div>
                <div>
                  <span className="font-medium">To:</span>{" "}
                  {item.arrivalLocation}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {item.tourPlan.length} days
                </div>
                <div>
                  <span className="font-medium">Min Age:</span> {item.minAge}+
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {item.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{item.amenities.length - 3} more
                  </span>
                )}
              </div>

              <Button asChild className="w-full">
                <Link to={`/tours/${item._id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}