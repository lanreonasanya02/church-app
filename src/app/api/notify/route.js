const PUSHER_INSTANCE_ID = process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID;
const PUSHER_SECRET_KEY = process.env.NEXT_PUBLIC_PUSHER_BEAMS_SECRET_KEY;
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
    const today = now.toLocaleString("en-US", { weekday: "long" }); // Get today's day name
    const currentTime = now.toTimeString().slice(0, 5); // Get current time in HH:MM format

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
