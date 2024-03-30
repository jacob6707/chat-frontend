import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<h1>App Index</h1>} />
          <Route path=":id" element={<h1>App ID</h1>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
