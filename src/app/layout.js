import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import AuthWrapper from "@/components/authComponents/authProvider";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TaskFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthWrapper>
            <Navbar />
            {children}
            <ToastContainer/>
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>

  );
}
