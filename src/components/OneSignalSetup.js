"use client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

export default function OneSignalSetup() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OneSignal = window.OneSignal || [];
      OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        notifyButton: {
          enable: true,
        },
      });
    }
  }, []);

  return null;
}

// useEffect(() => {
//   if (typeof window !== "undefined") {
//     window.OneSignal = window.OneSignal || [];
//     OneSignal.push(function () {
//       OneSignal.init({
//         appId: ONESIGNAL_APP_ID,
//         allowLocalhostAsSecureOrigin: true,
//         notifyButton: {
//           enable: true,
//         },
//       });
//     });
//   }
// }, []);
