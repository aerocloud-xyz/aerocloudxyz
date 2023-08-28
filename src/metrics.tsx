import React, { useState } from 'react';
import '@elastic/eui/dist/eui_theme_dark.css';
import { EuiSpacer, EuiPanel, EuiHealth, EuiSplitPanel, EuiText } from '@elastic/eui'

interface MetricsProps {
    updateMetrics: void;
  }
  const Metrics: React.FC<MetricsProps> = ({ updateMetrics }) => {
    return( 
    <EuiSplitPanel.Outer direction="row">
          <EuiSplitPanel.Inner>
              <EuiText>
                  <p>Left panel</p>
                  <p>Has more content</p>
              </EuiText>
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