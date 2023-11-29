import React, { Fragment } from "react";
import {
  EuiIcon,
  EuiSpacer,
} from "@elastic/eui";
import Console from "./Console";
import UserProfile from "./UserProfile";
import GraphsComponent from "./GraphsComponent";
import UserTable from "./UserTable";
const tabs = [
  {
    id: "welcome--id",
    disabled: false,
    name: "Welcome!",
    prepend: <EuiIcon type="infinity" />,
    content: (
      <Fragment>
        <EuiSpacer /> 
        <GraphsComponent />
      </Fragment>
    ),
  },
  {
    id: "console--id",
    name: "Console",
    append: <></>,
    href: "",
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
  },
  {
    id: "metrics--id",
    disabled: false,
    name: "Metrics",
    prepend: <EuiIcon type="visArea" />,
    content: (
      <Fragment>
        <EuiSpacer /> 
        <GraphsComponent />
      </Fragment>
    ),
  },
];
export default tabs;
