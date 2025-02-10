const { NextRequest, NextResponse } = require("next/server");

import Razarpay from "razorpay";

const razorpay = new Razarpay({
  key_id: process.env.RAZORPAY_KAY_ID,
  key_secret: process.env.RAZORPAY_KAY_SECRET,
});

export async function POST(req) {
  const { AMOUNT } = await req.json();
  try {
    const order = await razorpay.orders.create({
      amount: AMOUNT * 100, //amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "error in creating order" },
      { status: 500 }
    );
  }
}
