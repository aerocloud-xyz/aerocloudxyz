import React, { useState, useEffect } from "react";
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSpacer,
  EuiText,
  useGeneratedHtmlId,
  useEuiTheme,
  EuiButtonIcon,
  EuiButton,
} from "@elastic/eui";

import alerts from "../alerts";
import { AUTH_API } from "../constants";
import { useNavigate } from "react-router-dom";

const HeaderUpdates = () => {
  const { euiTheme } = useEuiTheme();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const newsFeedPopoverId = useGeneratedHtmlId({ prefix: "newsFeedPopover" });

  const closePopover = () => {
    setIsPopoverVisible(false);
  };
  const showPopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };
  const cheerButton = (
    <EuiHeaderSectionItemButton
      aria-controls="headerPopoverNewsFeed"
      aria-expanded={isPopoverVisible}
      aria-haspopup="true"
      aria-label={"News feed: Updates available'"}
      onClick={showPopover}
      notification={1}
    >
      <EuiIcon type="cheer" />
    </EuiHeaderSectionItemButton>
  );

  const popover = (
    <EuiPopover
      id={newsFeedPopoverId}
      ownFocus
      repositionOnScroll
      button={cheerButton}
      isOpen={isPopoverVisible}
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiPopoverTitle paddingSize="s">What&apos;s new</EuiPopoverTitle>
      <div
        style={{
          maxHeight: "40vh",
          overflowY: "auto",
          padding: euiTheme.size.s,
        }}
      >
        <EuiSpacer size="s" />
        {alerts.map((alert, i) => (
          <EuiHeaderAlert
            key={`alert-${i}`}
            title={alert.title}
            text={alert.text}
            date={alert.date}
            badge={alert.badge}
          />
        ))}
      </div>
      <EuiPopoverFooter paddingSize="s">
        <EuiText color="subdued" size="s">
          <p>Version 7.0</p>
        </EuiText>
      </EuiPopoverFooter>
    </EuiPopover>
  );
  return <>{popover}</>;
};
/*interface HeaderUserMenuProps {
  username: string;
}
 const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({
  username,
  updateUser,
  handleLogout,
}) => {
  const userPopoverId = useGeneratedHtmlId({ prefix: "userPopover" });
  const [isOpen, setIsOpen] = useState(false);
  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={userPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name={username} size="s" />
    </EuiHeaderSectionItemButton>
  );
  return (
    <EuiPopover
      id={userPopoverId}
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      <div style={{ width: 300 }}>
        <EuiFlexGroup gutterSize="m" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name={username} size="xl" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <p>{username}</p>
            </EuiText>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink onClick={handleLogout}>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
}; */
interface mainnnprops {}
const HeaderNav: React.FC<mainnnprops> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useState(false);
  const navigate = useNavigate();
  const authenticateWithExistingToken = async () => {
    const token: string | null = localStorage.getItem("usertoken");
    if (token !== null) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("token", token);
      try {
        const response = await fetch(AUTH_API + "/verifytoken", {
          method: "POST",
          body: urlencoded,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        //TODO: operate on the response
        if (response.ok) {
        } else {
          console.log("Response is not 200 - please log in.");
        }
      } catch (error) {
        console.log("Error whilst fetching response.");
      }
    } else {
      console.log("user token does not exist in localstorage - please log in");
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("usertoken") !== null &&
      localStorage.getItem("isLoggedIn") !== null &&
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      setIsLoggedIn(true);
    }
  });
  return (
    <>
      <EuiSpacer />
      <EuiHeader position={"fixed"} theme={"default"}>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <img
              src={window.location.origin + "/logo.svg"}
              alt="aerocloud"
              width={250}
              height={50}
            />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
        <EuiHeaderSection>
          <EuiButton style={{verticalAlign: 'middle', display: 'table-cell', margin: 'auto'}} onClick={() => {navigate('/aeronote')}} isDisabled={false}> AeroNote </EuiButton >
        </EuiHeaderSection>
          <EuiHeaderSectionItem>
            {isLoggedIn ? (
              <EuiButtonIcon
                iconType="userAvatar"
                aria-label="Profile"
                onClick={() => {
                  navigate("/user/profile");
                }}
              >
                View Profile
              </EuiButtonIcon>
            ) : (
              <></>
            )}
          </EuiHeaderSectionItem>
          {isLoggedIn ? (
            <></>
          ) : (
            <EuiHeaderSectionItem>
              <EuiButtonIcon
                iconType="users"
                aria-label="Login"
                onClick={() => {
                  if (window.location.pathname === "/") {
                    navigate("/login");
                  } else {
                    navigate("/");
                  }
                }}
              >
                Login
              </EuiButtonIcon>
            </EuiHeaderSectionItem>
          )}

          <EuiHeaderSectionItem>
            <HeaderUpdates />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            {/*             <HeaderUserMenu
              username={Username}
              updateUser={updateUsername}
              handleLogout={handleLogout}
            /> */}
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem></EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
export default HeaderNav;

/* TODO:
Instead of states add links and stuff
Fix the application in general
Add isAuthenticated checks everywhere
Clean up the code */
