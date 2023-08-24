import React, { useState } from 'react';
import '@elastic/eui/dist/eui_theme_dark.css';
import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiSpacer,
  EuiFieldPassword,
} from '@elastic/eui';
import './LoginForm.css'; // Import your custom CSS file

interface LoginFormProps {
  onLogin: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    // For demonstration purposes, let's just log the entered values
    console.log('Email:', email);
    console.log('Password:', password);

    onLogin();
  };

  return (
    <div className="login-form-container">
      <EuiForm>
        <h2 className="login-header">Login</h2>
        <EuiFormRow>
          <EuiFieldText
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiFieldPassword
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton onClick={handleLogin} fullWidth fill>
          Log In
        </EuiButton>
        <div className="register">
          <a href="/register">Forgot password?</a>
        </div>
      </EuiForm>
    </div>
  );
};

export default LoginForm;
