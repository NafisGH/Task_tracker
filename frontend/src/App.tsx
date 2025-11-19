// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import { TaskForm } from "./components/TaskForm";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Открытые маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Приватные маршруты */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
