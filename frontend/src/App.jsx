import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Regitser from './pages/Register'
import PrivateRoute from "./components/PrivateRoute.jsx"
import { Users } from './pages/Users/index.jsx'

function App() {

  return (
    <Routes>
      
      
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Regitser/>}/>
      <Route path="users" element={<Users />}/>
      <Route
        path = "/*"
        element = {
        <PrivateRoute>
          "hello"
        </PrivateRoute>}
      />
    </Routes>
  )
}

export default App
