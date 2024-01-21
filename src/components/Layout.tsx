import React, { ReactNode } from "react";
import HeaderNav from "./HeaderNav";
import { EuiSpacer } from "@elastic/eui";
interface LayoutInterface {
  children: ReactNode;
}
const Layout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <>
        <HeaderNav />
        <EuiSpacer size="xxl"/>
        <main>{children}</main>
    </>
  );
};

export default Layout;
