import apiSlice from "../../app/apiSlice";

const authApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        login:build.mutation({
            query:(user)=>({
                url:'api/auth/login',
                method:"POST",
                body:user
            })
        }),
        register:build.mutation({
            query:(user)=>({
                url:'api/auth/register',
                method:"POST",
                body:user
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation}=authApiSlice