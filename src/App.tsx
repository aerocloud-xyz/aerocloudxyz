/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  EuiButtonIcon,
} from "@elastic/eui";
import Main from "./components/Main";
import LoginForm from "./components/LoginForm";
import AeroNote from "./content/AeroNote";
import Layout from "./components/Layout";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile";

export default () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};
