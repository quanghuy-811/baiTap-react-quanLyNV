import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import ListEmployees from "./pages/ListEmPloyees";
import FormProfile from "./pages/FormProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin"} replace />} />
        <Route path="admin" element={<Admin />}>
          <Route index element={<ListEmployees />} />
          <Route path="product/:id" element={<FormProfile />} />
          <Route path="product" element={<FormProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
