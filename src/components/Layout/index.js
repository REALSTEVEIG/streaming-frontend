import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <main className="container-fluid main-container-fluid px-0">
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
