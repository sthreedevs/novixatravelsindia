"use server";

import { connectDB } from "@/lib/db/index.js";
import { ESimPlan } from "@/lib/models/eSim.model.js";
import { revalidatePath } from "next/cache";

export async function createESim(formData) {
  try {
    await connectDB();

    const newESim = await ESimPlan.create({
      planName: formData.get("planName"),
      dataMB: formData.get("dataMB"),
      validityDays: formData.get("validityDays"),
      dataSpeed: formData.get("dataSpeed"),
      operatorName: formData.get("operatorName"),
      fupLimit: formData.get("fupLimit"),
      dataGB: formData.get("dataGB"),
      country: formData.get("country"),
    });

    revalidatePath("/admin/esims");
    revalidatePath("/esims");
    revalidatePath("/");

    return { success: true, eSimId: newESim._id.toString() };
  } catch (error) {
    console.error("Create eSIM Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateESim(id, formData) {
  try {
    await connectDB();
    const eSim = await ESimPlan.findById(id);
    if (!eSim) return { success: false, error: "eSIM not found" };

    await ESimPlan.findByIdAndUpdate(id, {
      planName: formData.get("planName"),
      dataMB: formData.get("dataMB"),
      validityDays: formData.get("validityDays"),
      dataSpeed: formData.get("dataSpeed"),
      operatorName: formData.get("operatorName"),
      fupLimit: formData.get("fupLimit"),
      dataGB: formData.get("dataGB"),
      country: formData.get("country"),
    });

    revalidatePath("/admin/esims");
    revalidatePath("/esims");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update eSIM Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteESim(id) {
  try {
    await connectDB();
    const eSim = await ESimPlan.findById(id);
    if (!eSim) return { success: false, error: "eSIM not found" };

    await ESimPlan.findByIdAndDelete(id);

    revalidatePath("/admin/esims");
    revalidatePath("/esims");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete eSIM Error:", error);
    return { success: false, error: error.message };
  }
}
