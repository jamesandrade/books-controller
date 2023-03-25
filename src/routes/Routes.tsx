import React from "react";
import { Route, BrowserRouter, Routes} from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Students from "../pages/students/Students";
const routes = () => {
   return(

       <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/home"  element={<Home />} />
                <Route path="/students"  element={<Students />} />

            </Routes>
        </BrowserRouter>
   )
}

export default routes;