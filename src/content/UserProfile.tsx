import React, { useState, useEffect } from "react";
import { EuiMarkdownEditor, EuiSplitPanel } from "@elastic/eui";
interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const initialContent4 = `## 👋 Hello again!

I'm just a **EuiMarkdownEditor** with:
- a \`height\` set to \`200\`
- a \`maxHeight\` set to \`300\`
`;
  const onvalue = () => {
    console.log("asdf");
  };
  useEffect(() => {});
  return (
    <>
      <EuiSplitPanel.Outer direction="row">
        <EuiSplitPanel.Inner style={{height: 500, maxHeight: 1000}}>
        <EuiMarkdownEditor
              aria-label="EUI markdown editor with fixed and max height"
              placeholder="Your markdown here..."
              initialViewMode="viewing"
              value={initialContent4}
              onChange={onvalue}
              height={400}
              maxHeight={1000}
            />
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner></EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </>
  );
};

export default UserProfile;
