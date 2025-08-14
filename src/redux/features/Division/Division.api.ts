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
    }),
});

export const {
    useAddDivisionMutation,
} = DivisionApi
