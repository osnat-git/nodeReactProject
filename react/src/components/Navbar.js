import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../features/auth/authSlice'
import apiSlice from '../app/apiSlice'
import useAuth from '../features/auth/useAuth'
import { PrimeIcons } from 'primereact/api'
import 'primeicons/primeicons.css'
import { Menubar } from 'primereact/menubar'
import { useEffect } from 'react'
import { jwtDecode } from "jwt-decode"

const Navbar = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { name, role } = useAuth()

    const logout = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate('/')
        
    }

    const itemRenderer = (item) => (
        <a className='flex align-items-center p-menuitem-link'>
            <span className={item.icon} style={{ margin: "2%" }}></span>
            {item.label == "יציאה" ? <Link onClick={logout} className='mx-2'>{item.label}</Link> :
                <Link style={{ textDecoration: "none" }} to={item.to} className='mx-2'>{item.label}</Link>}
        </a>
    )

    const items = isUserLoggedIn ? [
        {
            label: "סל",
            icon: PrimeIcons.SHOPPING_BAG,
            to: "/basket",
            template: itemRenderer,

        },
        {
            label: "גלידות",
            icon: PrimeIcons.HEART,
            to: "/",
            template: itemRenderer

        },
        {
            label: "יציאה",
            icon: PrimeIcons.SIGN_OUT,
            template: itemRenderer

        }
    ] :
        [
            {
                label: "כניסה",
                icon: PrimeIcons.SIGN_IN,
                to: "/login",
                template: itemRenderer

            },
            {
                label: "הרשמה",
                icon: PrimeIcons.USER,
                to: "/register",
                template: itemRenderer

            },
            {
                label: "גלידות",
                icon: PrimeIcons.HEART,
                to: "/",
                template: itemRenderer

            }
        ]

    const end = <img alt='logo' height='60' src="http://localhost:1111/רקע שקוף אוטו גלידה לוגו.png" className='mr-2'></img>
    const start = isUserLoggedIn && <span><i className={PrimeIcons.USER}></i>{`!שלום ${name}`}</span>

    return (
        <div className='card'>
            <Menubar className='nav' model={items} start={start} end={end}></Menubar>
        </div>
    )
}
export default Navbar