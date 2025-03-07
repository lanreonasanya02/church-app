const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;
const MIXLR_USERNAME = process.env.NEXT_PUBLIC_MIXLR_USERNAME;
const MIXLR_API_URL = `https://api.mixlr.com/users/${MIXLR_USERNAME}`;

// Define service schedule
const SERVICES = {
  Tuesday: { name: "Hour of Transformation", time: "08:30" },
  Wednesday: { name: "Hour of Mercy", time: "17:30" },
  Friday: { name: "Hour of Warfare", time: "17:30" },
  Sunday: { name: "Sunday Sermon", time: "07:45" },
};

export async function POST() {
  try {
    const now = new Date();
    const today = now.toLocaleString("en-US", { weekday: "long" });
    const currentTime = now.toTimeString().slice(0, 5);

    if (!SERVICES[today]) {
      return Response.json(
        { message: "No service scheduled today" },
        { status: 200 }
      );
    }

    const { name, time } = SERVICES[today];
    const mixlrResponse = await fetch(MIXLR_API_URL);
    const mixlrData = await mixlrResponse.json();
    const isLive = mixlrData?.isLive || false;

    let title, message;

    if (isLive) {
      title = `${name} now live!`;
      message = `Click or tap to listen!`;
    } else if (currentTime === time) {
      title = `${name} goes live in 30 minutes!`;
      message = `Get ready! Program starts soon.`;
    } else {
      return Response.json(
        { message: "Not time for a scheduled notification" },
        { status: 200 }
      );
    }

    const response = await fetch(
      `https://${PUSHER_INSTANCE_ID}.pusher.com/notifications/publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUSHER_SECRET_KEY}`,
        },
        body: JSON.stringify({
          interests: ["all-users"],
          web: {
            notification: {
              title: title,
              body: message,
              deep_link: "https://church-app-blond.vercel.app",
            },
          },
        }),
      }
    );

    const data = await response.json();
    return Response.json(data, { status: response.ok ? 200 : 400 });
  } catch (error) {
    return Response.json(
      { error: "Failed to send notification", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Get user ID from request (or handle multiple users if needed)
    const userId = req.headers["x-user-id"]; // Ensure this is sent from the frontend
    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_external_user_ids: [userId], // Send notification to the specific user
        contents: { en: message || "Default notification message" },
      }),
    });

    // Log full response before parsing
    const text = await response.text();
    console.log("OneSignal Response:", text);

    // Parse JSON if the response is valid
    const data = JSON.parse(text);
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return Response.json(
      { error: "Failed to send notification", details: error.message },
      { status: 500 }
    );
  }
}
