import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" exact element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
