/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
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
  EuiButton,
  EuiButtonIcon,
} from "@elastic/eui";

import alerts from "./alerts";
import LoginForm from "./LoginForm";
import UserData from "./content/UserData";
import RegisterForm from "./RegisterForm";
import HomePage from "./content/HomePage";
import { AUTH_API } from "./constants";
import { useCookies } from "react-cookie";

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
interface HeaderUserMenuProps {
  username: string;
  updateUser: () => void;
  handleLogout: () => void;
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
};

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowingUserProfile, setIsShowingUserProfile] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isShowingRegisterOrLoginForm, setIsShowingRegisterOrLoginForm] =
    useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [Username, setUsername] = useState("Not Logged In");
  const [cookies, setCookie] = useCookies(["user"]);

  //UserData
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSwitchToHomePageFromProfileBruv = () => {
    if (isLoggedIn) {
      setIsShowingUserProfile(false);
      setIsShowingRegisterOrLoginForm(false);
    } else {
      console.log("??");
    }
  };
  const handleSwitchBetweenLoginAndHomePage = () => {
    setIsShowingRegisterOrLoginForm(true);
  };
  const handleSwitchBetweenHomePageAndLogin = () => {
    setIsShowingRegisterOrLoginForm(false);
  };
  const handleLoadingRegisterForm = () => {
    console.log("Opening register form");
    setIsRegistered(true);
  };
  const updateUsername = () => {
    setUsername(updatedName);
  };
  const handleLogin = (
    email: string,
    name: string,
    dateOfCreation: string,
    role: string
  ) => {
    //handling UI changes
    setIsLoggedIn(true);
    setIsShowingUserProfile(true);
    setUsername(name);

    //handling setting the variables for <UserData/>
    setRole(role);
    setEmail(email);
    setDate(dateOfCreation);
    setName(name);
  };
  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("usertoken");
    setUsername("Not Logged In");
    setIsShowingUserProfile(false);
    setIsShowingRegisterOrLoginForm(true);
    setIsLoggedIn(false);
  };
  const handleDeletion = async () => {
    const token: string | null = localStorage.getItem("usertoken");
    if (token !== null) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("token", token);
      try {
        const response = await fetch(AUTH_API + "/deleteUser", {
          method: "DELETE",
          body: urlencoded,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.ok) {
          console.log("Logging out & deleting");
          localStorage.removeItem("usertoken");
          setUsername("Not Logged In");
          setIsShowingUserProfile(false);
          setIsLoggedIn(false);
        } else {
          console.log("Deletion failed!");
        }
      } catch (error) {
        console.log("brukh");
      }
    }
  };
  const authenticateWithExistingToken = async () => {
    const token: string | null = localStorage.getItem("usertoken");
    if(token !== null) {
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
        //operate on the response
        if(response.ok) {

        } else {
          console.log('Response is not 200 - please log in.')
        }
      } catch (error) {
        console.log('Error whilst fetching response.')
      }
    } else {
      console.log('user token does not exist in localstorage - please log in');
    }
  };
  useEffect(() => {
    console.log("s0rcerer frontend, built by Antonio0806");
  });
  return (
    <>
      <EuiSpacer />
      <EuiHeader position={"fixed"} theme={"default"}>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <img src="./logo.svg" alt="aerocloud" width={250} height={50} />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            {isLoggedIn ? (
              <EuiButtonIcon
                iconType="userAvatar"
                aria-label="Login"
                onClick={() => {
                  setIsShowingUserProfile(true);
                }}
              >
                View Profile
              </EuiButtonIcon>
            ) : (
              <></>
            )}
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiButtonIcon
              iconType="users"
              aria-label="Login"
              onClick={() => {
                if (isShowingRegisterOrLoginForm == false) {
                  handleSwitchBetweenLoginAndHomePage();
                } else {
                  handleSwitchBetweenHomePageAndLogin();
                }
              }}
            >
              Login
            </EuiButtonIcon>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUpdates />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUserMenu
              username={Username}
              updateUser={updateUsername}
              handleLogout={handleLogout}
            />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem></EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      <EuiSpacer />
      {isShowingUserProfile ? (
        <>
          <UserData
            emailAddress={email}
            name={name}
            date={date}
            role={role}
            handleLogout={handleLogout}
            deleteUser={handleDeletion}
            handleSwitchToHomePageFromProfile={
              handleSwitchToHomePageFromProfileBruv
            }
            style={{
              width: "300px",
              height: "100 %",
              marginLeft: "25px",
              marginTop: "15px",
              textAlign: "center",
            }}
          />
        </>
      ) : (
        <div>
          {" "}
          {isShowingRegisterOrLoginForm ? (
            <>
              {isRegistered ? (
                <RegisterForm />
              ) : (
                <LoginForm
                  onLogin={handleLogin}
                  onRegister={handleLoadingRegisterForm}
                />
              )}
            </>
          ) : (
            <HomePage LoggedIn={isLoggedIn} /> //Homepage
          )}
        </div>
      )}
      <EuiSpacer />
    </>
  );
};
