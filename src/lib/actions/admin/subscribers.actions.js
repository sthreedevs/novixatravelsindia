"use server";

import { connectDB } from "@/lib/db/index.js";
import { Subscriber } from "@/lib/models/subscriber.model.js";
import { revalidatePath } from "next/cache";

export async function deleteSubscriber(id) {
  try {
    await connectDB();
    const sub = await Subscriber.findById(id);
    if (!sub) return { success: false, error: "Subscriber not found" };

    await Subscriber.findByIdAndDelete(id);

    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (error) {
    console.error("Delete Subscriber Error:", error);
    return { success: false, error: error.message };
  }
}
