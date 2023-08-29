import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useUserAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      alert('You need to login to have your personal Watchlist')
    }
  }, [user, navigate])

  if (user) {
    return children
  } else {
    return null; // or a loading component, or some other UI
  }
}

export default ProtectedRoute
