"use client";

import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

import { useEffect, useState } from "react";

export default function Home() {
  const [initCode, setInitCode] = useState("");

  useEffect(() => {
    (async () => {
      const clientId = "payper";
      const externalArticleId = "0004";

      const res = await fetch(
        `https://shared-payper-api.northernlabs-dev.cloud/api/apps/authorize?grantType=blah&scope=blah&state=blah&clientId=${clientId}&externalId=${externalArticleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const authToken = await res.text();
      setInitCode(authToken);
    })();
  }, []);

  useEffect(() => {
    if (window && initCode) {
      setTimeout(() => {
        window.initPayer({
          containerId: "payper-widget-container",
          blockTo: ".article-title",
          initCode,
        });
      }, 1000);
    }
  }, [initCode]);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          http-equiv="Content-Security-Policy"
          content="script-src 'self' https://shared-payper-ui.northernlabs-dev.cloud https://cdn.getpayper.io https://accounts.google.com https://js.stripe.com 'unsafe-inline'"
        />
        <script
          crossOrigin="anonymous"
          type="module"
          async
          src="https://shared-payper-ui.northernlabs-dev.cloud/payper.js"
        />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <div className=".article-title"></div>
        <div id="payper-widget-container"></div>
      </main>

      <Footer />
    </div>
  );
}
