import { Subscriber } from "@/lib/models/subscriber.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function verifySubscriber(token) {
  try {
    await connectDB();
    
    const subscriber = await Subscriber.findOne({ token });
    
    if (!subscriber) {
      return false;
    }
    
    subscriber.isVerified = true;
    subscriber.token = undefined; // clear token after verification
    await subscriber.save();
    
    return true;
  } catch (error) {
    console.error("Error verifying subscriber:", error);
    return false;
  }
}

export async function getAllSubscribers() {
  await connectDB();
  const subs = await Subscriber.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(subs));
}
