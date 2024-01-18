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
import AeroNote from "../components/AeroNote";
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = ({}) => {

  return (
    <>
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
            <EuiLink href="https://github.com/antonio0806/UI" target="_blank">
              Click here
            </EuiLink>
          </>
        }
      />
    </>
  );
};

export default HomePage;
