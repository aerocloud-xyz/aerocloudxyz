import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  $convertToMarkdownString,
  $convertFromMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { EditorState } from "lexical";
import ToolbarPlugin from "./editorPlugins/ToolbarPlugin";
import TreeViewPlugin from "./editorPlugins/TreeViewPlugin";
import { decodeFromBase64 } from "../../utils/base64util";
import { useEuiBackgroundColor } from "@elastic/eui";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
type NoteObject = {
  content: {
    name: string;
    mediaType: string;
    enablePublicUrl: boolean;
    signedUrlTimeout: number;
    uploadUrlTimeout: number;
    size: number;
    version: number;
    url: string;
    signedUrl: string;
    base64Content: string;
  };
  id: string;
  isPublic: boolean;
  isShort: boolean;
  owner: string;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
};
interface props {}
const NotesEditor: React.FC<props> = () => {
  let { noteid } = useParams();
  const NoteFetcherComponent: React.FC<props> = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      const fetchTheNote = async () => {
        const locstrgToken = localStorage.getItem("usertoken");
        if (locstrgToken !== null) {
          const noteResponse = await fetch(
            `https://notes.aerocloud.xyz/api/getmsg?token=${locstrgToken}&msgid=${noteid}`,
            {
              method: "GET",
            }
          );
          if (noteResponse.ok) {
            editor.setEditable(false);
            const noteObject: Array<NoteObject> = await noteResponse.json();
            const noteBase64 = await noteObject[0].content.base64Content;
            // Load the data into the editor.
            editor.update(() => {
              $convertFromMarkdownString(
                decodeFromBase64(noteBase64),
                TRANSFORMERS
              );
            });
            editor.setEditable(true);
          }
        }
      };
      fetchTheNote();
    }, [editor]);
    return null;
  };
  const onChangeFunc = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log(markdown);
    });
  };
  const Placeholder = () => {
    return (
      <div className="editor-placeholder">
        Start typing your note! You can use the GitHub Markdown Syntax and also
        the modificators at the top of the editor.
      </div>
    );
  };
  const editorConfig = {
    namespace: "AeroNotes",
    nodes: [
      HorizontalRuleNode,
      CodeNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
    ],
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
            contentEditable={
              <ContentEditable
                style={{
                  minHeight: "250px",
                  resize: "none",
                  fontSize: "15px",
                  caretColor: "rgb(5, 5, 5)",
                  position: "relative",
                  tabSize: "1",
                  outline: "0",
                  padding: "15px 10px",
                }}
              />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
          <OnChangePlugin onChange={onChangeFunc} />
          <NoteFetcherComponent />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
};
export default NotesEditor;
