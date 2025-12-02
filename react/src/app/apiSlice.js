import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1111/',
        credentials:'include',
        prepareHeaders:(headrs,{getState})=>{
            const token=getState().auth.token
            if(token)
                headrs.set('authorization',`Bearer ${token}`)
            return headrs
        }
    }),
    endpoints:()=>({})
})

export default apiSlice