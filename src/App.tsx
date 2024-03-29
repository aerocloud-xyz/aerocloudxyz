/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile";
import AeroNotePage from "./pages/AeroNotePage";
import { AUTH_API } from "./constants";
import NotFoundComponent from "./components/NotFoundComponent";
import MetricsPage from "./pages/MetricsPage";

export default () => {
  useEffect(() => {
    const checkIfOldTokenExists = async () => {
      const locstrgToken = localStorage.getItem("usertoken");
      const form1Data = new URLSearchParams();
        if(locstrgToken !== null) {
          form1Data.append("token", locstrgToken);
        }
      //Get user data from auth server with the JWT token
      const tokenResponse = await fetch(AUTH_API + "/verifytoken", {
        method: "POST",
        body: form1Data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if(tokenResponse.ok) {
      } else {
        localStorage.clear();
        window.location.reload();
      }
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/aeronote" element={<AeroNotePage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            {//<Route path="*" element={<NotFoundComponent />} />
            }
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};
