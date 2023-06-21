
import dynamic from "next/dynamic";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import { NextAuthProvider } from "../components/NextAuthProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const Hero = dynamic(() => import("@/components/Hero"))

export const metadata = {
  title: "Impact Nutrition Consult",
  description: "The place where we grow expert in Nutrition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
        <div className="relative dark:bg-black">
          <NextAuthProvider>
            <Header />
            <Hero />
            {children}
            <Footer />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
