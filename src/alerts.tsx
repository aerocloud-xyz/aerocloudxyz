import React from 'react';
import {
  EuiBadge,
} from '@elastic/eui';

const alerts = [
    {
      title: 'Control access to features',
      text: 'Show or hide applications and features per space in Kibana.',
      date: '1 May 2019',
      badge: <EuiBadge>7.1</EuiBadge>,
    },
    {
      title: 'Kibana 7.0 is turning heads',
      text: 'Simplified navigation, responsive dashboards, dark mode… pick your favorite.',
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Enter dark mode',
      text: 'Kibana now supports the easy-on-the-eyes theme across the entire UI.',
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Pixel-perfect Canvas is production ready',
      text: 'Your creative space for visualizing data awaits.',
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: '6.7 release notes',
      text: 'Stay up-to-date on the latest and greatest features.',
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: 'Rollups made simple in Kibana',
      text: 'Save space and preserve the integrity of your data directly in the UI.',
      date: '10 January 2019',
      badge: <EuiBadge color="hollow">6.5</EuiBadge>,
    },
  ];

  export default alerts;