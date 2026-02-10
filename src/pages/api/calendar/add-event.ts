import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log("Incoming request:", JSON.stringify(req.body, null, 2));


  const { accessToken, event } = req.body;

  if (!accessToken || !event) {
    return res.status(400).json({ error: "Missing access token or event data." });
  }

  try {
    const googleRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    

    const data = await googleRes.json();

    if (!googleRes.ok) {
        console.error("Google API error:", JSON.stringify(data, null, 2));
        return res.status(googleRes.status).json({
          error: data.error?.message || "Google API error",
        });
      }
      

    return res.status(200).json({ event: data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
