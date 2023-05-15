
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import { NextAuthProvider } from "../components/NextAuthProvider";
import "./globals.css";



export const metadata = {
  title: "Impact Nutrition",
  description: "The place where we grow expert in Nutrition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="px-10 pt-10">
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
