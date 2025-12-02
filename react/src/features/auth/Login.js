import './auth.css'
import { useEffect, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeToken, setToken } from "./authSlice"

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { PrimeIcons } from "primereact/api"




const Login = () => {
    const [login, { isError, isSuccess, error, data, isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formdata, setFormData] = useState({
        userName: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formdata,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formdata)
        // console.log(formdata);
        // setFormData({
        //     userName:"",
        //     password:""    
        // })
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate('/')
        }
    }, [isSuccess])



    return (<>
        <div className='background'>
            {/* <h1>{isLoading&&"...Loading"}</h1> */}
            {isError && <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
                <Message className="message" severity='error' text={error.data} />
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="card flex justify-content-center login-register">
                    <FloatLabel>
                        <InputText required id="userName" className="input" name="userName" onChange={(e) => handleChange(e)}></InputText>
                        <label htmlFor="userName">שם משתמש</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Password required id="password" className="input" name="password" onChange={(e) => handleChange(e)} toggleMask feedback={false}></Password>
                        <label htmlFor="password">סיסמא</label>
                    </FloatLabel>
                </div>

                <Button className="input" type="submit" label="היכנס" />
            </form>
        </div>
    </>
    )
}
export default Login