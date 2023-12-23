/* eslint-disable @typescript-eslint/no-unused-vars */
import { EuiMarkdownFormat } from "@elastic/eui";
import React, { useEffect, useState } from "react";
interface WelcomeSiteProps {}
const WelcomeSite: React.FC<WelcomeSiteProps> = () => {    
const markdownContent = `
** Welcome to [aerocloud.xyz](https://aerocloud.xyz/) **
* This website is a personal open-source project of mine. Among the highly limited capabilities of my website I aim to provide an open-source note taking application.
`;
    return (
    <>
    <EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>
    </>);
}
export default WelcomeSite;