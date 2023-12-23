import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Regitser from './pages/Register'
import PrivateRoute from "./components/PrivateRoute.jsx"
import Update from "./pages/Update"
import { Users } from './pages/Users/index.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LoadUser } from './application/middlewares/auth.js'


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(LoadUser())
  }, [ ])
  return (
    <Routes>
      
      
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Regitser/>}/>
      <Route
        path = "/users"
        element = {
        <PrivateRoute>
                <Users />
        </PrivateRoute>}
      />
      <Route
        path = "/update"
        element = {
        <PrivateRoute>
                <Update />
        </PrivateRoute>}
      />
    </Routes>
  )
}

export default App
