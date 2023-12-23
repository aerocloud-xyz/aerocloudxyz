import React, { useState, useEffect } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import "./RegisterForm.css";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiFieldText,
  EuiSpacer,
  EuiButton,
} from "@elastic/eui";
import { AUTH_API } from './constants';
interface RegisterFormProps {}
const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setError('');
  }, []);
  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email);
  };
  const handleRegister = async () => {
    if (!name) {
        setError('Name is required');
      }
      if (!email) {
        setError('Email is required');
      } else if (!isValidEmail(email)) {
        setError('Invalid email format');
      }
      if (!password) {
        setError('Password is required');
      } else if (password.length < 6) {
        setError('Password must be at least 6 characters long');
      } else if (password !== repeatPassword) {
        setError('The passwords dont match');
      }

      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
  
    //Make the request
      try {
        const response = await fetch(AUTH_API + '/register', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
    
        if (response.ok) {
          console.log('Register cool');
          window.location.reload();
        } else {
          // Handle error response
          setError('Registry failed, try again later');
          console.error('Register failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
  };
  return (
    <div className="register-form-container">
      {error && <p className="error-message">❗ {error}</p>}
      <EuiForm>
        <h2 className="register-header">Register</h2>
        <EuiFormRow>
          <EuiFieldText
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </EuiFormRow>
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
        <EuiFormRow>
          <EuiFieldPassword
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            fullWidth
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton onClick={handleRegister} fullWidth fill>
          Register
        </EuiButton>
      </EuiForm>
    </div>
  );
};

export default RegisterForm;
