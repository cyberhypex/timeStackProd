import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import HomePage from "./Pages/HomePage";
import {LoginPage} from "./Pages/LoginPage";
import "./index.css";

import { SignupPage } from "./Pages/SignUpPage";
import CreateTaskPage  from "./Pages/CreateTaskPage";
import AboutPage from "./Pages/AboutPage";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import EditTaskPage from "./Pages/EditTasks";
import DashBoard from "./Pages/DashBoard";
import NotFound from "./Pages/NotFound";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>

  <BrowserRouter>
  
    <Routes>

      
      <Route path="/" element={<App />}>

        
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="about" element={<AboutPage />} />
       
        <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/edit-task/:taskId" element={<EditTaskPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />


      </Route>
      

    </Routes>

  </BrowserRouter>
  </AuthProvider>
);