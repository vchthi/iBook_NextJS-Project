import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import Providers from "../redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Cửa hàng sách iBook",
  description:
    "iBook is a book shop that provides you with quality books that help boost your productivity and mood. Having a physical book is great. There is no doubt that you will enjoy these books more than others you have ever tasted.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Clicker Script"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Playfair Display"
        />
        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />{" "}
      </head>{" "}
      <Providers>
        <body className={inter.className}>
          <div className="container">
            <Header />
            {children}
            <Footer />
          </div>
        </body>{" "}
      </Providers>
    </html>
  );
}
