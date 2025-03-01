const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;

// const response = await fetch("https://onesignal.com/api/v1/notifications", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Basic ${ONESIGNAL_API_KEY}`,
//   },
//   body: JSON.stringify({
//     app_id: ONESIGNAL_APP_ID,
//     included_segments: ["Subscribed Users"],
//     contents: { en: message || "Default notification message" },
//   }),
// });

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["Subscribed Users"], // Send to all subscribed users
        contents: { en: message || "Default notification message" },
      }),
    });

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Response.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
