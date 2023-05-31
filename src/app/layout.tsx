
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import { NextAuthProvider } from "../components/NextAuthProvider";
import "./globals.css";



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
        <div className="content">
          <NextAuthProvider>
            <Header />
            {children}
            <Footer />
          </NextAuthProvider>
        </div>

      </body>
    </html>
  );
}
