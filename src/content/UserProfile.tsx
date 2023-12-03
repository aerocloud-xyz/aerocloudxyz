import React, { useState, useEffect } from "react";
import { EuiButton, EuiMarkdownEditor, EuiSplitPanel } from "@elastic/eui";
interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const initialContent = `
  ## Hi! Here you can add a short 100 character long description!
  `;
  const [editorContent, setEditorContent] = useState(initialContent)
  useEffect(() => {});
  const updateMessage = () => {}
  return (
    <>
      <EuiSplitPanel.Outer direction="row">
        <EuiSplitPanel.Inner style={{height: 500, maxHeight: 1000}}>
        <EuiMarkdownEditor
              aria-label="User description editor"
              placeholder="Input your user description here..."
              initialViewMode="viewing"
              value={editorContent}
              onChange={setEditorContent}
              height={400}
              maxHeight={1000}
            />
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner>
          <EuiButton onClick={() => updateMessage()} fill>Update Message</EuiButton>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </>
  );
};

export default UserProfile;
