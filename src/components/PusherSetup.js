"use client";
import { useEffect } from "react";
import { registerDevice } from "@/utils/Pusher";

export default function PushNotificationSetup() {
  useEffect(() => {
    registerDevice();
  }, []);

  return null;
}
