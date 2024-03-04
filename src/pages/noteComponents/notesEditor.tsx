import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { EditorState } from "lexical";
import ToolbarPlugin from "./editorPlugins/ToolbarPlugin";
import TreeViewPlugin from "./editorPlugins/TreeViewPlugin";
import { useEuiBackgroundColor } from "@elastic/eui";
interface props {}
const NotesEditor: React.FC<props> = () => {
  let { noteid } = useParams();
  useEffect(() => {
    console.log(noteid);
    //verify token normally, if the note exists then load the initial state from the base64.
  }, []);
  const onChangeFunc = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log(markdown);
    });
    //something
  };
  const Placeholder = () => {
    return <div className="editor-placeholder">Start typing your note!</div>;
  };
  const editorConfig = {
    namespace: "AeroNotes",
    nodes: [],
    onError(error: Error) {
      throw error;
    },
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        style={{
          margin: "20px auto 20px auto",
          borderRadius: "2px",
          width: "80%",
          maxHeight: "1000px",
          color: "#fff",
          position: "relative",
          lineHeight: "20px",
          fontWeight: "400",
          textAlign: "left",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <ToolbarPlugin />
        <div
          style={{
            background: `${useEuiBackgroundColor("plain")}`,
            position: "relative",
          }}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
          <OnChangePlugin onChange={onChangeFunc} />
        </div>
      </div>
    </LexicalComposer>
  );
};
export default NotesEditor;
