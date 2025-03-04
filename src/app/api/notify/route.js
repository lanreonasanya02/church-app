const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;

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

// export async function POST(req) {
//     try {
//       const { message } = await req.json();

//       const response = await fetch("https://onesignal.com/api/v1/notifications", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Basic ${ONESIGNAL_API_KEY}`,
//         },
//         body: JSON.stringify({
//           app_id: ONESIGNAL_APP_ID,
//           included_segments: ["Subscribed Users"], // Send to all subscribed users
//           contents: { en: message || "Default notification message" },
//         }),
//       });

//       // Log full response before parsing
//       const text = await response.text();
//       console.log("OneSignal Response:", text);

//       // Parse JSON if the response is valid
//       const data = JSON.parse(text);
//       return Response.json(data, { status: 200 });
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       return Response.json(
//         { error: "Failed to send notification", details: error.message },
//         { status: 500 }
//       );
//     }
//   }
