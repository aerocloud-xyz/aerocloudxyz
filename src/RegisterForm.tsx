import React, {useState} from 'react';
import '@elastic/eui/dist/eui_theme_dark.css';
import './RegisterForm.css'
import {EuiForm, EuiFormRow, EuiFieldPassword, EuiFieldText, EuiSpacer, EuiButton, EuiLink} from '@elastic/eui'
interface RegisterFormProps {

}
const RegisterForm: React.FC<RegisterFormProps> = () => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = () => {
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
          <EuiSpacer />
          <EuiButton onClick={handleRegister} fullWidth fill>
            Register
          </EuiButton>
        </EuiForm>
      </div>
    );
};

export default RegisterForm;