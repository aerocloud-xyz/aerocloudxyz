/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import {
  EuiAvatar,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
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
  EuiPortal,
  EuiSpacer,
  EuiText,
  EuiTitle,
  useGeneratedHtmlId,
  useEuiTheme,
} from '@elastic/eui';

import alerts from './alerts';
import LoginForm from './LoginForm';
import UserData from './UserData';
import Metrics from './metrics'
import RegisterForm from './RegisterForm'

const HeaderUpdates = () => {
  const { euiTheme } = useEuiTheme();
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const newsFeedFlyoutId = useGeneratedHtmlId({ prefix: 'newsFeedFlyout' });
  const newsFeedFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'newsFeedFlyoutTitle',
  });
  const newsFeedPopoverId = useGeneratedHtmlId({ prefix: 'newsFeedPopover' });
  
  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };
  const closePopover = () => {
    setIsPopoverVisible(false);
  };
  const showFlyout = () => {
    setIsFlyoutVisible(!isFlyoutVisible);
  };
  const showPopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };
  const bellButton = (
    <EuiHeaderSectionItemButton
      aria-controls="headerFlyoutNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup="true"
      aria-label={'Alerts feed: Updates available'}
      onClick={() => showFlyout()}
      notification={true}
    >
      <EuiIcon type="bell" />
    </EuiHeaderSectionItemButton>
  );
  const cheerButton = (
    <EuiHeaderSectionItemButton
      aria-controls="headerPopoverNewsFeed"
      aria-expanded={isPopoverVisible}
      aria-haspopup="true"
      aria-label={"News feed: Updates available'"}
      onClick={showPopover}
      notification={6}
    >
      <EuiIcon type="cheer" />
    </EuiHeaderSectionItemButton>
  );
  const flyout = (
    <EuiPortal>
      <EuiFlyout
        onClose={closeFlyout}
        size="s"
        id={newsFeedFlyoutId}
        aria-labelledby={newsFeedFlyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id={newsFeedFlyoutTitleId}>What&apos;s new</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          {alerts.map((alert, i) => (
            <EuiHeaderAlert
              key={`alert-${i}`}
              title={alert.title}
              text={alert.text}
              date={alert.date}
              badge={alert.badge}
            />
          ))}
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText color="subdued" size="s">
                <p>Version 7.0</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    </EuiPortal>
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
          maxHeight: '40vh',
          overflowY: 'auto',
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
  return (
    <>
      {bellButton}
      {popover}
      {isFlyoutVisible && flyout}
    </>
  );
};
interface HeaderUserMenuProps {
  username: string;
  updateUser: () => void;
  handleLogout: () => void;
}
const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ username, updateUser, handleLogout }) => {
  const userPopoverId = useGeneratedHtmlId({ prefix: 'userPopover' });
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [Username, setUsername] = useState('Not Logged In');

  //UserData
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const handleLoadingRegisterForm = () => {
    console.log('Opening register form');
    setIsRegistered(true);
  };
  const handleNameChange = (newName: string) => {
    setUpdatedName(newName);
  };
  const updateUsername = () => {
    setUsername(updatedName);
  };
  const handleLogin = (email: string, name: string, dateOfCreation: string) => {
    //handling UI changes
    setIsLoggedIn(true);
    setUsername(name);

    //handling setting the variables for <UserData/>
    setEmail(email);
    setDate(dateOfCreation);
    setName(name);
  };
  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('usertoken');
    setUsername('Not Logged In');
    setIsLoggedIn(false);
  };
  useEffect(() => {
    console.log('s0rcerer frontend, built by Antonio0806')
  }); 
  return (
    <>
      <EuiSpacer />
      <EuiHeader position={'fixed'} theme={'default'}>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <EuiIcon type="/src/ikonka.svg" size="xl" title="s0rcerer" />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUpdates />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUserMenu username={Username} updateUser={updateUsername} handleLogout={handleLogout}/>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>

          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      <EuiSpacer />
    {isLoggedIn ? <UserData emailAddress={email} name={name} date={date} handleLogout={handleLogout} /> : <div> {isRegistered ? <RegisterForm /> : <LoginForm onLogin={handleLogin} onRegister={handleLoadingRegisterForm}/>}</div>}
      <EuiSpacer />
      <EuiSpacer size='xs' />
      <Metrics />
    </>
  );
};