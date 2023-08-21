import { Outlet } from "react-router-dom"
import Header from "./Header"

const HomeScreen=()=>{
  
  return(
    <div className="mt-6"> {/* Apply margin-top to create space */}
      <Header />
      <Outlet />
    </div>
  )
}
export default HomeScreen