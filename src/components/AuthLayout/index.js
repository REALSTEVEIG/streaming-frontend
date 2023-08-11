//#region Imports
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
//#endregion

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      //router.push("/login");
    },
  });
  
  return (
    <main className="container-fluid px-0">
      <Header />
      <div className="min-vh-100">{children}</div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
