import React from 'react';
import {
  EuiBadge,
  EuiLink,
} from '@elastic/eui';

const alerts = [
    {
      title: 'Control access to features',
      text: 'Show or hide applications and features per space in Kibana.',
      action: <EuiLink href="">Learn about feature controls</EuiLink>,
      date: '1 May 2019',
      badge: <EuiBadge>7.1</EuiBadge>,
    },
    {
      title: 'Kibana 7.0 is turning heads',
      text: 'Simplified navigation, responsive dashboards, dark mode… pick your favorite.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/kibana-7-0-0-released"
        >
          Read the blog
        </EuiLink>
      ),
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Enter dark mode',
      text: 'Kibana now supports the easy-on-the-eyes theme across the entire UI.',
      action: <EuiLink href="">Go to Advanced Settings</EuiLink>,
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Pixel-perfect Canvas is production ready',
      text: 'Your creative space for visualizing data awaits.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/webinars/intro-to-canvas-a-new-way-to-tell-visual-stories-in-kibana"
        >
          Watch the webinar
        </EuiLink>
      ),
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: '6.7 release notes',
      text: 'Stay up-to-date on the latest and greatest features.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/guide/en/kibana/6.7/release-notes-6.7.0.html"
        >
          Check out the docs
        </EuiLink>
      ),
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: 'Rollups made simple in Kibana',
      text: 'Save space and preserve the integrity of your data directly in the UI.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/how-to-create-manage-and-visualize-elasticsearch-rollup-data-in-kibana"
        >
          Read the blog
        </EuiLink>
      ),
      date: '10 January 2019',
      badge: <EuiBadge color="hollow">6.5</EuiBadge>,
    },
  ];

  export default alerts;