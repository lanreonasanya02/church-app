"use client";
import { useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const INSTANCE_ID = process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID;

export default function PusherSetup() {
  useEffect(() => {
    if (typeof window !== "undefined" && INSTANCE_ID) {
      // Remove any old OneSignal service workers
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });

        // ✅ Register the service worker for Pusher Beams
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) =>
            console.log("Service Worker Registered for Pusher Beams:", reg)
          )
          .catch((err) =>
            console.error("Service Worker Registration Failed", err)
          );
      }

      // Initialize Pusher Beams
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: INSTANCE_ID,
      });

      beamsClient
        .start()
        .then((beamsClient) => beamsClient.getDeviceId())
        .then((deviceId) =>
          console.log(
            "Successfully registered with Beams. Device ID:",
            deviceId
          )
        )
        .then(() => beamsClient.addDeviceInterest("all-users"))
        .then(() => beamsClient.getDeviceInterests())
        .then((interests) => console.log("Current interests:", interests))
        .catch(console.error);
    }
  }, []);

  return null;
}
