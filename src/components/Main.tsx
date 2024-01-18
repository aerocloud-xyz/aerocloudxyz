/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import HomePage from "../pages/HomePage";
import UserData from "../content/UserData";
interface props {}
const Main: React.FC<props> = () => {
    const name = '';
    const email = '';
    const date = '';
    const role = '';
    const handleLogout = () => {}
    const handleDeletion = () => {}
    const handleLogin = () => {}
    const isLoggedIn: boolean = false

  return (
    <>
{/*           <UserData
            emailAddress={email}
            name={name}
            date={date}
            role={role}
            handleLogout={handleLogout}
            deleteUser={handleDeletion}
            handleSwitchToHomePageFromProfile={
              handleSwitchToHomePageFromProfileBruv
            }
            style={{
              width: "300px",
              height: "100 %",
              marginLeft: "25px",
              marginTop: "15px",
              textAlign: "center",
            }}
          /> */}
        <HomePage /> 
    </>
  );
};

export default Main;