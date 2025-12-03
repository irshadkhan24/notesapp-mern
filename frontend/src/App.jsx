import Signup from "./pages/Signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css' // show(display) deleting timngs on portal

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
   </Routes>
   <ToastContainer/>
   </BrowserRouter>
  )
}
export default App
