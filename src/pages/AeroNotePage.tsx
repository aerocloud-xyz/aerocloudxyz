import { EuiEmptyPrompt } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { centerVerticallyAndHorizontally } from "../utils/usefulStyles";
import NotesTable from "./noteComponents/notesTable";
import NotesEditor from "./noteComponents/notesEditor";

interface props {
  TableOrEditor: boolean;
}
const AeroNotePage: React.FC<props> = ({ TableOrEditor }) => {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken");
    if (usertoken === "" || null) {
      console.log("not logged in.");
      setLoggedIn(false);
    } else {
      console.log("logged in.");
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {LoggedIn ? (
        <>
          {TableOrEditor ? (
            <>
              <NotesTable />
            </>
          ) : (
            <>
              <NotesEditor />
            </>
          )}
        </>
      ) : (
        <>
          <EuiEmptyPrompt
            title={<h2>Not logged in</h2>}
            color={"subdued"}
            body={
              <p>
                To use AeroNote you need to <Link to={"/login"}>Login</Link>
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
