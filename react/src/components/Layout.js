import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout=()=>{
    return(<>
        <Navbar></Navbar>
        <main>
            <Outlet/>
        </main>
        <div className="footer">
            <img className="car" src="http://localhost:1111/אוטו גלידה.png"></img>
        </div>
        {/* <audio autoPlay src="http://localhost:1111/עוזי חיטמן - יש לי גלידה.mp3"></audio> */}
    </>)
}

export default Layout