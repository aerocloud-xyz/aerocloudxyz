import React, { useEffect, useState } from 'react';
import { AUTH_API } from '../constants';
interface props {}

const DNSTable: React.FC<props> = ({}) => {
    useEffect(() => {
    const verifyToken = async () => {
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
        console.log('not logged in.')
        window.location.reload();
      }
    }
    }, [])
    return (
        <>

        </>
    )
}