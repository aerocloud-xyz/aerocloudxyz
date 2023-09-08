
import React, { useState, Fragment, useMemo } from "react";
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiNotificationBadge,
} from "@elastic/eui";
import Console from './Console';
import UserProfile from './UserProfile';
const tabs = [
    {
      id: "console--id",  
      name: "Console",
      prepend: <EuiIcon type="console" />,
      content: (
        <Fragment>
          <EuiSpacer />
            <Console render={true}/>
          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      id: "profile--id",
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
      id: "hydrogen--id",
      disabled: false,
      name: "Hydrogen",
      prepend: <EuiIcon type="heatmap" />,
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              Hydrogen is a chemical element with symbol H and atomic number 1.
              With a standard atomic weight of 1.008, hydrogen is the lightest
              element on the periodic table
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: "monosodium_glutammate--id",
      name: "Monosodium Glutamate",
      append: (
        <EuiNotificationBadge className="eui-alignCenter" size="m">
          10
        </EuiNotificationBadge>
      ),
      href: "#/navigation/tabs#monosodium",
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              Monosodium glutamate (MSG, also known as sodium glutamate) is the
              sodium salt of glutamic acid, one of the most abundant naturally
              occurring non-essential amino acids. Monosodium glutamate is found
              naturally in tomatoes, cheese and other foods.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
  ];
  export default tabs;