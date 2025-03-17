
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";
import "react-circular-progressbar/dist/styles.css";
import "styles/theme.scss";
import "react-toastify/dist/ReactToastify.css";
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
import { Providers } from "../reduxes/Providers";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

import MyProvider from "./context/Myprovider";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "GRC - Next.Js Admin Dashboard Template";
  const description =
    "GRC is a fully responsive and yet modern premium Nextjs template & snippets. Geek is feature-rich Nextjs components and beautifully designed pages that help you create the best possible website and web application projects. Nextjs Snippet ";
  const keywords =
    " GRC, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose";

  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        {/* <script  type="text/javascript" src="./images/bundle.min.js"/> */}
        {/* <script  type="text/javascript" src="http://34.235.207.221/apiv2test/cookies-banner/66d83ad42ab41613514ef60c"/> */}
       
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
        }}
      />
      <MyProvider>
        <Providers>
          <Layout>
            <ToastContainer />
            {/* <Consent/> */}
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </Providers>
      </MyProvider>
    </>
  );
}

export default MyApp;
