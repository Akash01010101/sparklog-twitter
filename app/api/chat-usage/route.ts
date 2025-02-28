import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Increment chat usage count for the user
    await sql`
      INSERT INTO chat_usage (user_id, usage_count, last_used)
      VALUES (${session.user.email}, 1, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id)
      DO UPDATE SET 
        usage_count = chat_usage.usage_count + 1,
        last_used = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating chat usage:", error);
    return NextResponse.json(
      { error: "Failed to update chat usage" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await sql`
      SELECT usage_count, last_used
      FROM chat_usage
      WHERE user_id = ${session.user.email};
    `;

    const usageData = result.rows[0] || { usage_count: 0, last_used: null };

    return NextResponse.json(usageData, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat usage" },
      { status: 500 }
    );
  }
}
