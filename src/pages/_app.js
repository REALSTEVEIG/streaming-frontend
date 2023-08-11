import { GlobalContextProvider } from "@/context/Provider";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import NextNProgress from "nextjs-progressbar";
const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    // import("https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js");
      // Dynamically load Google Translate script
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);
  
      // Define the initialization function for Google Translate
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      };
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <NextNProgress />
      <SessionProvider session={session} refetchOnWindowFocus={true}>
        <GlobalContextProvider>{getLayout(<Component {...pageProps} />)}</GlobalContextProvider>
      </SessionProvider>
    </>
  );
};
export default App;
