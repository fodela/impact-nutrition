import dynamic from "next/dynamic";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import GetPostsProvider from "@/components/context/PostContext";
import GetEventsProvider from "@/components/context/EventContext";
import { ReduxProvider } from "./redux/Provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 

const Hero = dynamic(() => import("@/components/Hero"));

export const metadata = {
  title: "Impact Nutrition Consult",
  description: "The place where we grow expert in Nutrition",
  icons: { icon: "./src/app/favicon.ico"}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={cn(
          "font-sans antialiased",
          fontSans.variable
        )}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className={` relative`}>
          <ReduxProvider>
            <GetPostsProvider>
              <GetEventsProvider>
                <Header />
                {children}
                <Footer />
              </GetEventsProvider>
            </GetPostsProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
