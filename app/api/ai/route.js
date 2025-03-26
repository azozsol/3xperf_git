import { randomUUID } from "crypto"; // Built-in Node.js module

export async function POST(req) {
    try {
        const body = await req.json();
        const sessionId = body.sessionId || randomUUID(); // Generate if not provided

        const auth = Buffer.from("slim:slim1234").toString("base64");
        const response = await fetch("https://xperf.app.n8n.cloud/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
             },
            body: JSON.stringify({
                chatInput: body.query,
                sessionId: sessionId
            }),
        });

        const data = await response.json();
        console.log("Received response from n8n:", data);
        return Response.json(data);
    } catch (error) {
        console.error("Error fetching from n8n:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}