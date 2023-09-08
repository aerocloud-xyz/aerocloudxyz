import React, {useEffect, useState} from "react";
import {
  EuiText,
  EuiSplitPanel,
  EuiTextAlign,
  EuiButton,
  EuiAvatar,
  EuiBadge,
} from "@elastic/eui";
import TabbedContent from "./TabbedContent";

interface UserDataProps {
  emailAddress: string;
  name: string;
  date: string;
  role: string;
  handleLogout: () => void;
  deleteUser: () => void;
  style: React.CSSProperties | undefined;
}
const UserData: React.FC<UserDataProps> = ({
  emailAddress,
  name,
  date,
  handleLogout,
  deleteUser,
  style,
  role
}) => {
  const [brole, setRole] = useState(false);
  useEffect(() => {
    if(role == "default") {
      setRole(false);
    } else if(role == "administrator"){
      setRole(true);
    }
  });
  return (
    <EuiSplitPanel.Outer direction="row" style={{ height: '80 %' }}>
      <EuiSplitPanel.Inner grow={false}>
        <EuiSplitPanel.Outer direction="column" style={style}>
          <EuiSplitPanel.Inner>
            <EuiAvatar
              name={name}
              style={{ width: "150px", height: "150px", margin: "15px" }}
              size={"xl"}
            />
            <EuiText>
              <p>Email: {emailAddress}</p>
              <p>Account creation date: {date}</p>
              <p>Name: {name} <EuiBadge color={'danger'}>{role}</EuiBadge></p> 
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner grow={false} color="subdued">
            <EuiTextAlign textAlign="center">
              <EuiButton
                color="danger"
                isDisabled={false}
                fill
                onClick={deleteUser}
                style={{ margin: "10px" }}
              >
                Delete account
              </EuiButton>
              <EuiButton
                isDisabled={false}
                fill
                onClick={handleLogout}
                style={{ margin: "10px" }}
              >
                Logout
              </EuiButton>
            </EuiTextAlign>
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner >
        <TabbedContent />
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};

export default UserData;
