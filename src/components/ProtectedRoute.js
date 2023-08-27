import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useUserAuth()

  useEffect(() => {
    if (!user) {
      alert('You need to login first')
      navigate('/login')
    }
  }, [user, navigate])

  if (user) {
    return children
  } else {
    return null; // or a loading component, or some other UI
  }
}

export default ProtectedRoute
