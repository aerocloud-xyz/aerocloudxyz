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
  onLogin: (email: string, username: string) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Clear previous errors
      setError(null);

      // Validate inputs
      if (!email || !password) {
        setError('Please provide both email and password.');
        return;
      }

      const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

  //Make the request
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      if (response.ok) {
        // Login successful
        console.log(response.text);
        onLogin(email, password);
      } else {
        // Handle error response
        setError('Login failed, check username and password');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    //TODO: Remove from production
    console.log('Email:', email);
    console.log('Password:', password);

    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-form-container">
      {error && <p className="error-message">❗ {error}</p>}
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
}
export default LoginForm;
