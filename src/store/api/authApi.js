// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:5000/api',
//   prepareHeaders: (headers, { getState }) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery,
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('user', JSON.stringify(data.user));
//           dispatch(authSlice.actions.setCredentials(data));
//         } catch (error) {
//           // Handle error
//         }
//       },
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//         } finally {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           dispatch(authSlice.actions.logout());
//         }
//       },
//     }),
//     register: builder.mutation({
//       query: (userData) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
// } = authApi;