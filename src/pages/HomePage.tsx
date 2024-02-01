import {
  EuiEmptyPrompt,
  EuiLink,
  EuiTitle,
} from "@elastic/eui";
import React from "react";
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {

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
              Click here!
            </EuiLink>
          </>
        }
      />
    </>
  );
};

export default HomePage;
