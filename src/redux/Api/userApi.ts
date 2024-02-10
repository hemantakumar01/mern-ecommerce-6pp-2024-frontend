import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewUSer, ResponceOFNewUser } from "../../types/userTypes/newUser";
import axios from "axios";
import { AllUserResponce } from "../../types/user-reducer-type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/user/`,
  }),
  tagTypes: ["users"],

  endpoints: (builder) => ({
    user: builder.mutation<ResponceOFNewUser, NewUSer>({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query<AllUserResponce, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation<
      { success: boolean; message: string },
      { id: string; user: string }
    >({
      query: ({ id, user }) => ({
        url: `${user}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useUserMutation, useGetAllUsersQuery, useDeleteUserMutation } =
  userApi;

export const getUserExist = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/${userId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
