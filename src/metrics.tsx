import React, { useState } from 'react';
import '@elastic/eui/dist/eui_theme_dark.css';
import { EuiSpacer, EuiHealth, EuiSplitPanel, EuiText, EuiButton } from '@elastic/eui'
import { AUTH_API } from './constants';
interface MetricsProps {
};
const Metrics: React.FC<MetricsProps> = () => {
    const [authApiStatus, setAuthApiStatus] = useState("subdued");
    const [notificationsStatus, setNotificationsStatus] = useState("subdued");
    const [integrationApiStatus, setIntegrationApiStatus] = useState("subdued");
    const updateMetrics = async () => {
        //Auth API
        try {
            const response = await fetch(AUTH_API + '/api');
            if (response.ok) {
                setAuthApiStatus("success")
            }
          } catch (error) {
            setAuthApiStatus("danger");
        }
    };
    return( 
    <EuiSplitPanel.Outer direction="row">
          <EuiSplitPanel.Inner>
                <EuiText>
                    <EuiHealth color={authApiStatus}>Authentication API Status</EuiHealth>
                    <EuiSpacer />
                    <EuiHealth color={notificationsStatus}>Notification API Status</EuiHealth>
                    <EuiSpacer />
                    <EuiHealth color={integrationApiStatus}>Integrations API Status</EuiHealth>
                </EuiText>
                <EuiButton fill onClick={updateMetrics}>Update Status</EuiButton>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner color="subdued">
              <EuiText>
                  <p>Right panel</p>
              </EuiText>
          </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer> 
    );
};

export default Metrics;