import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";



export const TourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName,
            }),
            invalidatesTags: ["TOUR"],
        }),
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"],
        }),
        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>)=> response.data
        }),
        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"],
        }),
        getTourType: builder.query({
            query: (params) => ({
                url: "/tour/tour-types",
                method: "GET",
                params
            }),
            providesTags: ["TOUR"],
            transformResponse: (response)=> response.data
        }),
    }),
});

export const {
    useAddTourTypeMutation,
    useGetTourTypeQuery,
    useRemoveTourTypeMutation,
    useAddTourMutation,
    useGetAllToursQuery,
    

} = TourApi