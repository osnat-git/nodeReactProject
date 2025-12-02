import apiSlice from "../../app/apiSlice";

const basketApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getBasket:build.query({
            query:()=>({
                url:'api/basket'
            }),
            providesTags:["basket"]
        }),
        addBasket:build.mutation({
            query:(basket)=>({
                url:'api/basket',
                method:"POST",
                body:basket
            }),
            invalidatesTags:["basket"]
        }),
        updatebasketQuantity:build.mutation({
            query:(basket)=>({
                url:'api/basket',
                method:"PUT",
                body:basket
            }),
            invalidatesTags:["basket"]
        }),
        deleteBasket:build.mutation({
            query:(basket)=>({
                url:'api/basket',
                method:"DELETE",
                body:basket
            }),
            invalidatesTags:["basket"]
        })
    })
})

export const {useGetBasketQuery,useAddBasketMutation,useUpdatebasketQuantityMutation,useDeleteBasketMutation}=basketApiSlice