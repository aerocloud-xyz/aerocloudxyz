import React from 'react';
import { EuiText } from '@elastic/eui';

interface UserDataProps {
    onLogin: string;
  }
  const UserData: React.FC<UserDataProps> = ({ onLogin }) => {
    return (
        <EuiText>
            <h1>{onLogin}</h1>
        </EuiText>
        
    );
  };

export default UserData;