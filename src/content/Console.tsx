import { EuiCard, EuiIcon } from "@elastic/eui";
import React, { useState, useEffect } from "react";
import { SSH_API } from "../constants";
interface ConsoleProps {
  render: boolean;
}
const Console: React.FC<ConsoleProps> = ({ render }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userToken = localStorage.getItem('usertoken');
    const formData = new URLSearchParams();
    if (userToken) {
      formData.append("token", userToken);
    } else {
      console.error("User token is missing or invalid.");
    }
    fetch("https://2.4.222.204:3001/users/verifytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then(async (response) => {
        if (response.ok) {
          if (render) {
            const responseText = await response.text();
            if (responseText === "administrator") {
              console.log(responseText);
              setIsAuthenticated(true);
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  return (
    <div>
      {isAuthenticated ? (
        <iframe
          title="SSH Session"
          width="100%"
          height="500px"
          src={`http://localhost:2224/ssh/host/${SSH_API}?port=22`}
        />
      ) : (
        <EuiCard
          icon={<EuiIcon size="xxl" type={`console`} />}
          title={`SSH Console`}
          isDisabled={false}
          description="You do not have access to this resource"
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default Console;
