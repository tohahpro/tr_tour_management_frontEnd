import { baseApi } from "@/redux/baseApi";



export const DivisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionName) => ({
                url: "/division/create",
                method: "POST",
                data: divisionName,
            }),
            invalidatesTags: ["DIVISION"],
        }),
        getDivisions: builder.query({
            query: () => ({
                url: "/division",
                method: "GET"
            }),
            providesTags: ["DIVISION"],
            transformResponse: (response)=> response.data
        }),
    }),
});

export const {
    useAddDivisionMutation,
    useGetDivisionsQuery,
} = DivisionApi
