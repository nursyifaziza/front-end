import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";
const dataAdapter = createEntityAdapter({});

const initialState = dataAdapter.getInitialState();

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Managers", "QNA", "add"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    getManagers: build.query({
      query: () => "users/managers",
      providesTags: ["Managers"],
    }),
    getQna: build.query({
      query: () => "/api/qna/getQnas",
      providesTags: ["QNA"],
    }),
    addDataQNA: build.mutation({
      query: (initialQNAData) => ({
        url: "/api/qna/addqna",
        method: "POST",
        body: {
          ...initialQNAData,
        },
      }),
      providesTags: ["add"],
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetManagersQuery,
  useGetQnaQuery,
  useAddDataQNAMutation,
} = api;
