import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// OneSignal Credentials
const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;

router.post("/send-notification", async (req, res) => {
  try {
    const { title, message } = req.body;

    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["Subscribed Users"],
        contents: { en: message },
        headings: { en: title },
      },
      {
        headers: {
          Authorization: `Basic ${ONESIGNAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error(
      "Error sending notification:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ success: false, error: error.response?.data || error.message });
  }
});

export default router;
