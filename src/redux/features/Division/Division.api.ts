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
            query: (params) => ({
                url: "/division",
                method: "GET",
                params
            }),
            providesTags: ["DIVISION"],
            transformResponse: (response)=> response.data
        }),
        removeDivision: builder.mutation({
            query: (divisionId) => ({
                url: `/division/${divisionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DIVISION"],
        }),
    }),
});

export const {
    useAddDivisionMutation,
    useGetDivisionsQuery,
    useRemoveDivisionMutation
} = DivisionApi
