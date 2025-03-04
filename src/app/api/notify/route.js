const beamsInstanceId = process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID;
const beamsSecretKey = process.env.PUSHER_BEAMS_SECRET_KEY;

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      `https://${beamsInstanceId}.pushnotifications.pusher.com/publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${beamsSecretKey}`,
        },
        body: JSON.stringify({
          interests: ["church-notifications"], // Send to all subscribed users
          web: {
            notification: {
              title: "Church Notification",
              body: message || "Default notification message",
              deep_link: "https://church-app-blond.vercel.app/",
            },
          },
        }),
      }
    );

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return Response.json(
      { error: "Failed to send notification", details: error.message },
      { status: 500 }
    );
  }
}
