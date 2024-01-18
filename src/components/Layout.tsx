import React, { ReactNode } from "react";
import HeaderNav from "./HeaderNav";
import { EuiPageTemplate } from "@elastic/eui";
interface LayoutInterface {
  children: ReactNode;
}
const Layout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <EuiPageTemplate panelled={undefined} offset={0} grow={true}>
        <HeaderNav />
        <main>{children}</main>
      </EuiPageTemplate>
    </>
  );
};

export default Layout;
