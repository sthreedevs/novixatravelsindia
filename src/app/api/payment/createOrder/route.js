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
    const { amount, serviceName, receipt, currency } = body;

    if (!amount || !serviceName) {
      return NextResponse.json({ error: "Amount and Service Name are required" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // paise
      currency: currency || "INR",
      receipt: receipt || `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);

    await Payment.create({
      serviceName,
      paymentId: "",
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency,
      status: "created",
      receipt: order.receipt,
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
