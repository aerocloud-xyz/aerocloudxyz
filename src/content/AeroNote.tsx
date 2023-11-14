import React, { useState, useEffect } from "react";
import { AUTH_API } from "../constants";
import { EuiLoadingSpinner } from "@elastic/eui";
interface AeroNoteProps {
  isLoggedIn: boolean;
}

const AeroNote: React.FC<AeroNoteProps> = ({ isLoggedIn }) => {
  const [isDisplayingLoadingScreen, setIsDisplayingLoadingScreen] =
    useState(true);
  useEffect(() => {
    //verify if the user token is good by querying the authentication server
    const verifyToken = async () => {
      const userToken = localStorage.getItem("usertoken");
      const authRequestData = new URLSearchParams();
      if (userToken !== null) {
        authRequestData.append("token", userToken);
      }
      //Get user data from auth server with the JWT token
      const tokenResponse = await fetch(AUTH_API + "/verifytoken", {
        method: "POST",
        body: authRequestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (tokenResponse.ok) {
        console.log("user authenticated.");
        setIsDisplayingLoadingScreen(false);
      } else {
      }
    };

    //ok bruv now i need to code up an API
    verifyToken();
  });
  return (
    <>
      {isDisplayingLoadingScreen ? (
        <>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EuiLoadingSpinner
            size="xxl"
            style={{ position: "absolute", textAlign: "center" }}
          />
        </div>
      </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AeroNote;
