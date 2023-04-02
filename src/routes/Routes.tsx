import React from "react";
import { Route, BrowserRouter, Routes} from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Students from "../pages/students/Students";
import Books from "../pages/books/Books";
import Loans from "../pages/loans/Loans";
import Devolutions from "../pages/devolutions/Devolutions";
const routes = () => {
   return(
       <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/home"  element={<Home />} />
                <Route path="/students"  element={<Students />} />
                <Route path="/books"  element={<Books />} />
                <Route path="/loans"  element={<Loans />} />
                <Route path="/devolutions"  element={<Devolutions />} />
            </Routes>
        </BrowserRouter>
   )
}

export default routes;