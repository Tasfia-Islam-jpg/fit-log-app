import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Nav />

          {children}

          <Footer />
        </PlanProvider>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />
      </body>
    </html>
  );
}
