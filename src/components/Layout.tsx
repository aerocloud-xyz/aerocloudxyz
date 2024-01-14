import React, { ReactNode } from 'react';
import HeaderNav from './HeaderNav';
interface LayoutInterface {
    children: ReactNode
}
const Layout: React.FC<LayoutInterface> = ({ children }) => {
    return (
      <>
        <HeaderNav />
        <main>{children}</main>
      </>
    )
  }
  
  export default Layout