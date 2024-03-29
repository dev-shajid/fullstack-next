import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Toaster } from "react-hot-toast";
import ContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <ContextProvider>
          <Nav />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
