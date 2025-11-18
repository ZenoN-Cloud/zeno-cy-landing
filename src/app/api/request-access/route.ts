import { NextResponse } from "next/server";

interface FormData {
  email: string;
  companySize: string;
  banks: string[];
  featureRequests?: string;
}

export async function POST(request: Request) {
  try {
    const payload: FormData = await request.json();
    
    console.log("✅ NEW BETA REQUEST:", payload);
    
    // Send to Notion
    if (process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID) {
      await sendToNotion(payload);
      console.log("✅ Saved to Notion database");
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Form submission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

async function sendToNotion(data: FormData) {
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Email: { email: data.email },
        "Company Size": { select: { name: data.companySize } },
        Banks: { multi_select: data.banks.map(bank => ({ name: bank })) },
        "Feature Requests": { rich_text: [{ text: { content: data.featureRequests || "" } }] },
        "Submitted At": { date: { start: new Date().toISOString() } },
      },
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error: ${response.status} ${error}`);
  }
}

