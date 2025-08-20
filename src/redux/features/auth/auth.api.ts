import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                // body: userInfo,
                data: userInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["USER"]
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
        updateProfile: builder.mutation({
            query: ({ id, userInfo }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: userInfo
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                data: data,
            })
        }),
        forgotPassword: builder.mutation({
            query: (data: { email: string }) => ({
                url: "/auth/forgot-password",
                method: "POST",
                data: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data: { id: string; token: string; newPassword: string }) => ({
                url: "/auth/reset-password",
                method: "POST",
                data: data,
                headers: {
                    Authorization: `${data.token}`,
                },
            })
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUserInfoQuery,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation

} = authApi