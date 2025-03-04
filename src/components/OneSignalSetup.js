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

      // Check if user already has an external ID
      let externalUserId = localStorage.getItem("externalUserId");

      if (!externalUserId) {
        // Generate a new random external ID
        externalUserId = `user_${Math.random().toString(36).substr(2, 9)}`;

        // Store in localStorage
        localStorage.setItem("externalUserId", externalUserId);
      }

      // Set the external ID in OneSignal
      await OneSignal.setExternalUserId(externalUserId);
    };

    setupOneSignal();
  }, []);

  return null;
}
