"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    OneSignalDeferred?: ((OneSignal: any) => Promise<void>)[];
  }
}

export default function OneSignalSetup() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async (OneSignal) => {
        await OneSignal.init({
          appId: "c27d6f68-3cc7-4add-ab5b-9f0e3fb9889a",
        });
      });
    }
  }, []);

  return null;
}
