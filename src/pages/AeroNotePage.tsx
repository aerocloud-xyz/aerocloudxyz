import { EuiEmptyPrompt } from "@elastic/eui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { centerVerticallyAndHorizontally } from '../utils/usefulStyles';

interface props {}
const AeroNotePage: React.FC<props> = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      {LoggedIn ? (
        <></>
      ) : (
        <>
          <EuiEmptyPrompt
            title={<h2>Not logged in</h2>}
            color={"subdued"}
            body={
              <p>
                To use AeroNote you need to <Link to={'/login'}>Login</Link>
              </p>
            }
            style={centerVerticallyAndHorizontally}
          ></EuiEmptyPrompt>
        </>
      )}
    </>
  );
};

export default AeroNotePage;