// src/store/api/propertiesApi.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const propertiesApi = createApi({
//   reducerPath: 'propertiesApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Property'],
//   endpoints: (builder) => ({
//     getProperties: builder.query({
//       query: (filters = {}) => ({
//         url: '/properties',
//         params: filters,
//       }),
//       providesTags: ['Property'],
//     }),
//     getProperty: builder.query({
//       query: (id) => `/properties/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Property', id }],
//     }),
//     createProperty: builder.mutation({
//       query: (propertyData) => ({
//         url: '/properties',
//         method: 'POST',
//         body: propertyData,
//       }),
//       invalidatesTags: ['Property'],
//     }),
//     updateProperty: builder.mutation({
//       query: ({ id, ...updates }) => ({
//         url: `/properties/${id}`,
//         method: 'PUT',
//         body: updates,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: 'Property', id }],
//     }),
//     deleteProperty: builder.mutation({
//       query: (id) => ({
//         url: `/properties/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Property'],
//     }),
//     uploadPropertyImages: builder.mutation({
//       query: ({ id, images }) => {
//         const formData = new FormData();
//         images.forEach((image) => {
//           formData.append('images', image);
//         });
//         return {
//           url: `/properties/${id}/images`,
//           method: 'POST',
//           body: formData,
//         };
//       },
//       invalidatesTags: (result, error, { id }) => [{ type: 'Property', id }],
//     }),
//   }),
// });

// export const {
//   useGetPropertiesQuery,
//   useGetPropertyQuery,
//   useCreatePropertyMutation,
//   useUpdatePropertyMutation,
//   useDeletePropertyMutation,
//   useUploadPropertyImagesMutation,
// } = propertiesApi;