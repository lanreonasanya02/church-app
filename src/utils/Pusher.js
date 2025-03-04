import PusherPushNotifications from "@pusher/push-notifications-web";

export const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID,
});

export const registerDevice = async () => {
  try {
    await beamsClient.start();
    await beamsClient.addDeviceInterest("church-notifications");
    console.log("Push notifications enabled!");
  } catch (error) {
    console.error("Error enabling push notifications:", error);
  }
};
