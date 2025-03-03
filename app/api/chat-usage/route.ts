import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.email;

    // Fetch current usage count
    const { data: userData, error: fetchError } = await supabase
      .from("chat_usage")
      .select("usage_count, verification_count")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // Ignore "No rows found" error
      console.error("Error fetching chat usage:", fetchError);
      return NextResponse.json({ error: "Failed to update chat usage" }, { status: 500 });
    }

    const newUsageCount = userData ? userData.usage_count + 1 : 1;

    // Upsert chat usage with incremented count
    const { error: upsertError } = await supabase
      .from("chat_usage")
      .upsert(
        {
          user_id: userId,
          usage_count: newUsageCount,
          last_used: new Date().toISOString(),
          verification_count: userData?.verification_count ?? 0,
        },
        { onConflict: "user_id" }
      );

    if (upsertError) {
      console.error("Error in upsert operation:", upsertError);
      return NextResponse.json({ error: "Failed to update chat usage" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating chat usage:", error);
    return NextResponse.json({ error: "Failed to update chat usage" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: result, error } = await supabase
      .from("chat_usage")
      .select("usage_count, last_used, verification_count")
      .eq("user_id", session.user.email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching chat usage:", error);
      return NextResponse.json({ error: "Failed to fetch chat usage" }, { status: 500 });
    }

    const usageData = result ?? { usage_count: 0, last_used: null, verification_count: 0 };

    return NextResponse.json(usageData, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat usage:", error);
    return NextResponse.json({ error: "Failed to fetch chat usage" }, { status: 500 });
  }
}
