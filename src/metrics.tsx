import React, { useState, useEffect } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import {
  EuiSpacer,
  EuiHealth,
  EuiSplitPanel,
  EuiText,
  EuiButton,
} from "@elastic/eui";
import { AUTH_API } from "./constants";
import "./metrics.css";
interface MetricsProps {}
const Metrics: React.FC<MetricsProps> = () => {
  const [authApiStatus, setAuthApiStatus] = useState("subdued");
  const [notificationsStatus, setNotificationsStatus] = useState("subdued");
  const [integrationApiStatus, setIntegrationApiStatus] = useState("subdued");
  useEffect(() => {
    updateMetrics();
  }, []);

  const updateMetrics = async () => {
    //Auth API
    try {
      const response = await fetch("https://2.4.222.204:3001/api");
      if (response.ok) {
        setAuthApiStatus("success");
      }
    } catch (error) {
      setAuthApiStatus("danger");
    }
  };
  return (
    <>
    <div id="bottom-element">
    <EuiSplitPanel.Outer direction="row">
      <EuiSplitPanel.Inner>
        <EuiText>
          <EuiHealth color={authApiStatus}>Authentication API Status</EuiHealth>
          <EuiSpacer />
          <EuiHealth color={notificationsStatus}>
            Notification API Status
          </EuiHealth>
          <EuiSpacer />
          <EuiHealth color={integrationApiStatus}>
            Integrations API Status
          </EuiHealth>
        </EuiText>
        <EuiButton fill onClick={updateMetrics}>
          Update Status
        </EuiButton>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        <EuiText>
          <p>Placeholder</p>
        </EuiText>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    </div>
    </>
  );
};

export default Metrics;
