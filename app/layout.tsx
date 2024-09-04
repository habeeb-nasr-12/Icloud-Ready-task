import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from  "../Components/NavBar"
import Footer from "../Components/Footer"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iCloud Ready",
  description: "Generated by iCloud Ready",
};
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CartProvider } from "./Context/DrawerContext";
import DrawerComponent from "@/Components/Drawer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <html lang="en">
      <CartProvider> 
      <body   className={" min-h-screen w-[80%] overflow-y-hidden   mx-auto"}>
        <AntdRegistry>
          <DrawerComponent/>
         <Navbar/>    
         <hr className="text-gray-200" />
          {children}
          <Footer/>
          </AntdRegistry>
      </body>
      </CartProvider>
    </html>

  );
}
