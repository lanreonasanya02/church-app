"use client";
import { useEffect } from "react";

export default function OneSignalSetup() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import(
        "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      ).then(() => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async (OneSignal) => {
          await OneSignal.init({
            appId: "c27d6f68-3cc7-4add-ab5b-9f0e3fb9889a",
            notifyButton: { enable: true },
            serviceWorkerParam: { scope: "/" }, // Ensure correct scope
            serviceWorkerPath: "/OneSignalSDKWorker.js",
            serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
          });
        });
      });
    }
  }, []);

  return null;
}
