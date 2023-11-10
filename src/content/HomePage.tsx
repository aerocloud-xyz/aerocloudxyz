import {
  EuiEmptyPrompt,
  EuiIcon,
  EuiLink,
  EuiPageTemplate,
  EuiSideNav,
  EuiTitle,
  slugify,
} from "@elastic/eui";
import { EuiSideNavItemType } from "@elastic/eui/src/components/side_nav/side_nav_types";
import React, { useState } from "react";
import AeroNote from "./AeroNote";
interface HomePageProps {
  LoggedIn: boolean;
}
const HomePage: React.FC<HomePageProps> = ({ LoggedIn }) => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState("Time stuff");
  const [isShowingNoteApp, setIsShowingNoteApp] = useState(false);
  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };

  const createItem = (name: string, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const handleSwitchToNoteApp = () => {
    //show the note app in the window next to the sidebar
    //perform some login and authentication checks yknow
    if (isShowingNoteApp) {
      setIsShowingNoteApp(false);
    } else {
      setIsShowingNoteApp(true);
    }
  };

  const sideNav:
    | (any[] &
        EuiSideNavItemType<{
          "aria-label": "Siebar";
          mobileTitle: "Navigate within aerocloud";
          toggleOpenOnMobile: () => void;
          isOpenOnMobile: boolean;
          items: any[];
          style: { width: number };
        }>[])
    | undefined = [
    createItem("AeroNote", {
      onClick: () => handleSwitchToNoteApp(),
      icon: <EuiIcon type="documents" />,
      /*items: [
        createItem("asdf"),
        createItem("asdf"),
        createItem("asdf"),
        createItem("asdf"),
        createItem("asdf"),
      ],*/
    }),
  ];

  return (
    <>
      <EuiPageTemplate panelled={undefined} offset={0} grow={true}>
        <EuiPageTemplate.Sidebar sticky={true}>
          <EuiSideNav
            aria-label="Siebar"
            mobileTitle="Navigate within aerocloud"
            toggleOpenOnMobile={toggleOpenOnMobile}
            isOpenOnMobile={isSideNavOpenOnMobile}
            items={sideNav}
            style={{ width: 192 }}
          />
        </EuiPageTemplate.Sidebar>
        {isShowingNoteApp ? (
          <>
            {LoggedIn ? (
              <>
                <AeroNote isLoggedIn={LoggedIn}/>
              </>
            ) : (
              <EuiEmptyPrompt
                title={<h2>Not logged in!</h2>}
                color={"subdued"}
                body={<p>To use the AeroNote application you need to login</p>}
              />
            )}
          </>
        ) : (
          <EuiEmptyPrompt
            iconType="cheer"
            title={<h2>The homepage is coming soon</h2>}
            color={"subdued"}
            body={
              <p>
                To learn more check the GitHub repository by clicking the link
                below:{" "}
              </p>
            }
            footer={
              <>
                <EuiTitle size="xxs">
                  <h3>Github Repository</h3>
                </EuiTitle>
                <EuiLink
                  href="https://github.com/antonio0806/UI"
                  target="_blank"
                >
                  Click here
                </EuiLink>
              </>
            }
          />
        )}
      </EuiPageTemplate>
    </>
  );
};

export default HomePage;
