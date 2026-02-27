import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(req: NextRequest) {
  try {
    const { ask } = await req.json();

    if (!ask || typeof ask !== "string") {
      return NextResponse.json(
        { message: "No input provided." },
        { status: 400 },
      );
    }

    // 🚀 This waits for the function to complete
    const result = (await inngest.send({
      name: "chat/message",
      data: { ask },
    })) as any;

    const output =
      result?.output?.output ||
      result?.output?.message ||
      result?.output ||
      "No response generated.";

    return NextResponse.json({ message: output });
  } catch (error: any) {
    console.error("API error:", error);

    return NextResponse.json(
      { message: error?.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
