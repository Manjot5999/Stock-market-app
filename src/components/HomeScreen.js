import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const HomeScreen=()=>{
  
  return(
    <div className="mt-6"> {/* Apply margin-top to create space */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default HomeScreen