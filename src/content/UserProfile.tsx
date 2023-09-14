import React, { useState, useEffect } from "react";
import { EuiForm, EuiFormRow, EuiButton, EuiFieldText } from "@elastic/eui";
interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  useEffect(() => {
    //TODO: fetch username from authentication server and setOldUsername.
  });
  const handleNameChange = () => {
    //TODO: send username change request to authentication server
  };
  return (
    <>
      <EuiForm>
        <EuiFormRow>
          <EuiFieldText
            placeholder="username"
            value={oldUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
          />
        </EuiFormRow>
        <EuiButton onClick={handleNameChange} fill>
          Change name
        </EuiButton>
      </EuiForm>
    </>
  );
};

export default UserProfile;
