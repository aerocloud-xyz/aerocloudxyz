import React from 'react';
import { EuiText, EuiSplitPanel, EuiAvatar, EuiTextAlign, EuiCode, EuiButton } from '@elastic/eui';


interface UserDataProps {
    emailAddress: string;
    name: string;
    date: string;
  }
  const UserData: React.FC<UserDataProps> = ({ emailAddress, name, date }) => {
    return (
      <EuiSplitPanel.Outer direction="column">
      <EuiSplitPanel.Inner>
        <EuiText>
          <p>Email: {emailAddress}</p>
          <p>Account creation date: {date}</p>
          <p>Name: {name}</p>
        </EuiText>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner grow={false} color="subdued">
        <EuiTextAlign textAlign='center'>
          <EuiButton
              color='primary'
              isDisabled={false}
              onClick={() => {}}
              fill
            >
              Logout
          </EuiButton>
        </EuiTextAlign> 
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
        
    );
  };

export default UserData;