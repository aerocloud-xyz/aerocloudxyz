import React, { useState, useEffect } from "react";
import UserData from "../content/UserData";
import handleLogout from "../utils/logout";
import handleDeletion from "../utils/deleteAccount";
import { useNavigate } from "react-router-dom";
interface props {}
const Profile: React.FC<props> = () => {
  const [name, setName] = useState("n/a");
  const [email, setEmail] = useState("n/a");
  const [date, setDate] = useState("n/a");
  const [role, setRole] = useState("n/a");
  const navigate = useNavigate();
  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    const localName = localStorage.getItem("name");
    const localRole = localStorage.getItem("role");
    const localDateOfCreation = localStorage.getItem("dateofcreation");

    if (localEmail && localName && localRole && localDateOfCreation !== null) {
      setName(localName);
      setEmail(localEmail);
      setDate(localDateOfCreation);
      setRole(localRole);
    } else {
      console.error("Some of the data doesnt exist, cant continue.");
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <UserData
        emailAddress={email}
        name={name}
        date={date}
        role={role}
        handleSwitchToHomePageFromProfile={() => {
          navigate("/");
        }}
        handleLogout={() => {
          navigate("/");
          handleLogout();
        }}
        deleteUser={() => handleDeletion()}
        style={{
          width: "300px",
          height: "100 %",
          marginLeft: "25px",
          marginTop: "15px",
          textAlign: "center",
        }}
      />
    </>
  );
};
export default Profile;
