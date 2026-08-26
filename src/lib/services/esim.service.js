import { ESimPlan } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function getAllESims() {
  await connectDB();
  const esims = await ESimPlan.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(esims));
}

export async function getESimById(id) {
  if (id === 'add' || id === 'new') return null;
  try {
    await connectDB();
    const esim = await ESimPlan.findById(id).lean();
    if (!esim) return null;
    return JSON.parse(JSON.stringify(esim));
  } catch (error) {
    console.error("Error fetching eSIM by ID:", error);
    return null;
  }
}
