import React, { useState } from "react";
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
interface RegisterFormProps {}
const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email);
  };
  const handleRegister = () => {
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

    console.log('11');
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
