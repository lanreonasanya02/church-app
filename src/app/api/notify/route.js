// OneSignal Credentials
const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;

export async function POST(req) {
  try {
    const { title, message } = await req.json();

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
      throw new Error("Missing OneSignal credentials");
    }

    const response = await fetch(
      "https://api.onesignal.com/api/v1/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Key ${ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: ONESIGNAL_APP_ID,
          included_segments: ["All"],
          headings: { en: title || "Shalom!" },
          contents: {
            en: message || "Go to the website to join us for today's sermon.",
          },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("OneSignal API Error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send notification", details: data }),
        { status: response.status }
      );
    }
    return new Response(JSON.stringify(data), { status: response.status });
  } catch (error) {
    console.log("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      { status: 500 }
    );
  }
}
