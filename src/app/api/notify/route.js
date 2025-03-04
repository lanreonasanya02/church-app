const PUSHER_INSTANCE_ID = process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID;
const PUSHER_SECRET_KEY = process.env.NEXT_PUBLIC_PUSHER_SECRET_KEY;

export async function POST(req) {
  try {
    const { title, message } = await req.json();

    if (!title || !message) {
      return Response.json(
        { error: "Title and message are required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://${PUSHER_INSTANCE_ID}.pushnotifications.pusher.com/publish_api/v1/instances/${PUSHER_INSTANCE_ID}/publishes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUSHER_SECRET_KEY}`,
        },
        body: JSON.stringify({
          interests: ["all-users"],
          webhook_url: "https://your-deployed-site.vercel.app/api/webhook",
          webhook_auth_key: PUSHER_SECRET_KEY,
          apns: {
            aps: {
              alert: {
                title,
                body: message,
              },
            },
          },
          fcm: {
            notification: {
              title,
              body: message,
            },
          },
        }),
      }
    );

    const data = await response.json();
    console.log("Pusher Beams Response:", data);

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Error sending notification:", error);
    return Response.json(
      { error: "Failed to send notification", details: error.message },
      { status: 500 }
    );
  }
}
