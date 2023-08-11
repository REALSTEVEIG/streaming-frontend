import Head from "next/head";
import React from "react";

const AppHead = ({ title, children }) => {
  const pageTitle = title ? `KTN | ${title}` : "KTN | Loading...";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content="Kingdom Television Network" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/images/ktn-logo.png" />
      {children}
    </Head>
  );
};

export default AppHead;
