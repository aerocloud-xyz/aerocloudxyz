import { EuiLoadingSpinner } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { AUTH_API } from "../constants";
interface props {}
const MetricsPage: React.FC<props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initialize = async () => {
      const localStrgToken = localStorage.getItem("usertoken");
      const formData1 = new URLSearchParams();
      if (localStrgToken !== null) {
        formData1.append("token", localStrgToken);
      }
      const tokenRequest = await fetch(AUTH_API + "/verifytoken", {
        method: "POST",
        body: formData1,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if(tokenRequest.ok) {
        //start checking apis and shit bruv
        setIsLoading(false);
      }
    };
    initialize();
  }, []);
  return (
    <>
      {isLoading ? (
        <EuiLoadingSpinner size="xxl" style={{ textAlign: 'center' }} />
      ) : (
        <>

        </>
      )}
    </>
  );
};
export default MetricsPage;
