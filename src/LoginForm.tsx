import React, { useState } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiSpacer,
  EuiFieldPassword,
  EuiLink,
} from "@elastic/eui";
import "./LoginForm.css"; // Import your custom CSS file
import { AUTH_API } from "./constants";
interface LoginFormProps {
  onLogin: (
    email: string,
    name: string,
    dateOfCreation: string,
    role: string
  ) => void;
  onRegister: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Clear previous errors
      setError(null);

      // Validate inputs
      if (!email || !password) {
        setError("Please provide both email and password.");
        return;
      }

      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      //Make the request
      try {
        const response = await fetch(AUTH_API + "/login", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.ok) {
          // Parse the JSON data from the response
          const accountData = await response.json();
          // Now you can access accountData properties
          const dateofcreation = accountData.user.date;
          const name = accountData.user.name;
          const role = accountData.user.role;
          // Add the authentication token to local storage
          localStorage.setItem("usertoken", accountData.token);

          onLogin(email, name, dateofcreation, role);
        } else {
          // Handle error response
          setError("Login failed, check username and password");
          console.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
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
          <EuiLink onClick={onRegister}>
            Don't have an account? Register!
          </EuiLink>
        </div>
      </EuiForm>
    </div>
  );
};
export default LoginForm;
