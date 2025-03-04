"use client";
import { useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const INSTANCE_ID = process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID;

export default function PusherSetup() {
  useEffect(() => {
    if (typeof window !== "undefined" && INSTANCE_ID) {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: INSTANCE_ID,
      });

      beamsClient
        .start()
        .then(() => beamsClient.addDeviceInterest("all-users"))
        .then(() => console.log("Successfully registered and subscribed!"))
        .catch(console.error);
    }
  }, []);

  return null;
}
