
import './auth.css'
import { useState } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useEffect } from "react";

const Register=()=>{
    const navigate=useNavigate()
const [register,{isError,isSuccess,isLoading,error,data}]=useRegisterMutation()
const [formData,setFormData]=useState({
    userName:"",
    password:"",
    name:"",
    email:"",
    phone:""
})

const handleSubmit=(e)=>{
    e.preventDefault()
    register(formData)
    // setFormData({
    //     userName:"",
    //     password:"",
    //     name:"",
    //     email:"",
    //     phone:""
    // })
}
const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({
        ...formData,
        [name]:value
    })
}
useEffect(()=>{
    if(isSuccess)
        navigate('/login')
},[isSuccess])
    return(<>
    <div className='background'>
    {isError&&<div className="card flex flex-wrap align-items-center justify-content-center gap-3">
                <Message className="message" severity='error' text={error.data}/>
            </div>}
    {/* <h1>{isLoading&&"...Loading"}</h1> */}
        <form onSubmit={handleSubmit}>
            <div className="card flex justify-content-center login-register">
                <FloatLabel>
                    <InputText required id="userName" className="input" name="userName" onChange={(e)=>handleChange(e)}></InputText>
                    <label htmlFor="userName">שם משתמש</label>
                </FloatLabel>
                <FloatLabel>
                    <Password required id="password" className="input" name="password" onChange={(e)=>handleChange(e)} toggleMask feedback={false}></Password>
                    <label htmlFor="password">סיסמא</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText  id="name" className="input" name="name" onChange={(e)=>handleChange(e)}></InputText>
                    <label htmlFor="name">שם</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText type='email' id="email" className="input" name="email" onChange={(e)=>handleChange(e)}></InputText>
                    <label htmlFor="email">כתובת מייל</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText  id="phone" className="input" name="phone" onChange={(e)=>handleChange(e)}></InputText>
                    <label htmlFor="phone">טלפון</label>
                </FloatLabel>
            </div>

            <Button className="input" type="submit" label="הירשם" />
            
        </form>
        
        </div>
    </>)
}
    

export default Register