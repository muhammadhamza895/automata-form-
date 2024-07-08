import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

// CONMPONENTS
import Admin from "./pages/Admin";
import Form from './components/Form'
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/admin" element={<Admin />}> </Route>
      <Route path="/" element={<Form />}> </Route>
        <Route path="/file-upload" element={<UploadFile />}> </Route>
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
