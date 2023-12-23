/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useMemo } from "react";
import {
  EuiTabs,
  EuiTab,
} from "@elastic/eui";
import tabs from "./Tabs";

interface TabbedContentProps {}
const TabbedContent: React.FC<TabbedContentProps> = ({}) => {
  const [selectedTabId, setSelectedTabId] = useState("welcome--id");
  const selectedTabContent = useMemo(() => {
    return tabs.find((obj) => obj.id === selectedTabId)?.content;
  }, [selectedTabId, tabs]);
  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        key={index}
        href={tab.href}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        prepend={tab.prepend}
        append={tab.append}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <>
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabContent}
    </>
  );
};

export default TabbedContent;
