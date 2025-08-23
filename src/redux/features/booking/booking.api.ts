import { baseApi } from "@/redux/baseApi";




export const BookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({        
        createBooking: builder.mutation({
            query: (bokingData) => ({
                url: `/booking`,
                method: "POST",
                data: bokingData
            }),
            invalidatesTags: ["BOOKING"],
        }),
        getTourType: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["BOOKING"],
            transformResponse: (response)=> response.data
        }),
    }),
});

export const {
    useCreateBookingMutation,
    
} = BookingApi