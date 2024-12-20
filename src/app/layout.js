
import "./globals.css";

import { UserProvider } from "../../context/userContext";
import AppWalletProvider from "./components/AppWalletProvider";
export const metadata = {
  title: "SOLSCAPE",
  description: "Generated by create next app",
  icons: {
    icon:"./assets/images/SOLSCAPE.png",
   
  },
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AppWalletProvider>
        {children}
          </AppWalletProvider>
        </UserProvider>
      </body>
    </html>
  );
}
