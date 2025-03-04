"use client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

export default function OneSignalSetup() {
  useEffect(() => {
    const setupOneSignal = async () => {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        notifyButton: { enable: true },
      });

      // Wait for OneSignal to be ready
      OneSignal.on("subscriptionChange", async function (isSubscribed) {
        if (isSubscribed) {
          let externalUserId = localStorage.getItem("externalUserId");

          if (!externalUserId) {
            externalUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("externalUserId", externalUserId);
          }

          // Ensure OneSignal is fully initialized before setting external ID
          const isInitialized = await OneSignal.isPushNotificationsEnabled();
          if (isInitialized) {
            await OneSignal.setExternalUserId(externalUserId);
            console.log("User External ID set:", externalUserId);
          }
        }
      });
    };

    setupOneSignal();
  }, []);

  return null;
}
