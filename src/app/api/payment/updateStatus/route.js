import { NextResponse } from "next/server";
import { Payment } from "@/lib/models/payment.model.js";
import { connectDB } from "@/lib/db/index.js";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 });
    }

    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    payment.paymentId = paymentDetails.id;
    payment.status = paymentDetails.status === "captured" ? "paid" : "failed";
    await payment.save();

    return NextResponse.json({ success: true, message: "Payment status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
