import apiSlice from "../../app/apiSlice";

const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getProducts:build.query({
            query:()=>({
                url:'api/product'
            }),
            providesTags:["products"]
        }),
        getProductById:build.query({
            query:(id)=>({
                url:`api/product/${id}`
            }),
            providesTags:["products"]
        }),
        addProduct:build.mutation({
            query:(product)=>({
                url:'api/product',
                method:"POST",
                body:product
            }),
            invalidatesTags:["products"]
            
        }),
        updateProduct:build.mutation({
            query:(product)=>({
                url:'api/product',
                method:"PUT",
                body:product
            }),
            invalidatesTags:["products"]

        }),
        deleteProduct:build.mutation({
            query:(product)=>({
                url:'api/product',
                method:"DELETE",
                body:product
            }),
            invalidatesTags:["products"]
        })
    })
})

export const {useGetProductsQuery,useGetProductByIdQuery,useAddProductMutation,useUpdateProductMutation,useDeleteProductMutation}=productsApiSlice