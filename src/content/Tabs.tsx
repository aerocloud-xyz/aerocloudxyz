import React, { useState, Fragment, useMemo } from "react";
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiNotificationBadge,
} from "@elastic/eui";
import Console from "./Console";
import UserProfile from "./UserProfile";
import TabbedContent from "./TabbedContent";
import UserTable from "./UserTable";
const tabs = [
  {
    id: "console--id",
    name: "Console",
    prepend: <EuiIcon type="console" />,
    content: (
      <Fragment>
        <EuiSpacer />
        <Console render={true} />
        <EuiSpacer />
      </Fragment>
    ),
  },
  {
    id: "profile--id",
    disabled: true,
    name: "Profile",
    prepend: <EuiIcon type="userAvatar" />,
    content: (
      <Fragment>
        <EuiSpacer />
        <UserProfile />
      </Fragment>
    ),
  },
  {
    id: "users--id",
    disabled: false,
    name: "Users management",
    prepend: <EuiIcon type="userAvatar" />,
    content: (
      <Fragment>
        <EuiSpacer />
        <UserTable />
      </Fragment>
    ),
  }
];
export default tabs;
