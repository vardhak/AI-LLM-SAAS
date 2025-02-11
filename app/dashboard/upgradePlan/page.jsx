"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRightIcon, CheckIcon, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useState } from "react";

if (typeof window !== "undefined") {
  window.Razorpay = window.Razorpay || {}; // You can assign Razorpay to an existing object or leave it as undefined
}

function Upgrade() {
  const router = useRouter();

  const { user } = useUser();

  const [isProcessing, setProcessing] = useState(false);

  const handleUpgrade = async (AMOUNT, CREDITS) => {
    setProcessing(true);
    try {
      const response = await axios.post("/api/create-order", {
        AMOUNT: AMOUNT,
      });

      const data = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KAY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "VardhakK",
        description: "Plan upgrade",
        orderId: data.orderId,
        handler: async function (res) {
          console.log("Payment Successfull ", res);
          //handle now
          try {
            const response = await axios.post("/api/upgreade-course-credits", {
              _email: user?.primaryEmailAddress?.emailAddress,
              _credits: CREDITS,
            });
            console.log(response.status);
            toast({
              title: "EasyStudy",
              description: `Your plan has been upgraded successfully status : ${
                response.status == 200 ? "PAYED" : "PENDING"
              }`,
            });
          } catch (e) {
            console.log(e);
          } finally {
            router.push("/");
          }
        },
        prefill: {
          name: "VardhakK",
          email: "vardhakk@gmail.com",
          contact: "1234567890",
        },
        theame: {
          color: "#3399cc",
        },
      };
      const rozp = new window.Razorpay(options);
      rozp.open();
    } catch (e) {
      console.log(e);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="text-3xl font-bold">Plans</h1>
      <p>upgrade your plan to generate more courses</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-5 w-[88%] mx-auto">
        <div className="border border-black shadow-lg flex justify-center items-center flex-col p-4 rounded-lg">
          <h2 className="font-bold mt-5">Basic</h2>
          <h1 className="text-3xl my-3">50₹</h1>
          <div className="flex justify-start items-center flex-col">
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> 10 courses generate
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Limited Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Email Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Help Center Access
            </p>
          </div>

          <Button
            className="mt-5"
            size="sm"
            disabled={isProcessing}
            onClick={() => {
              handleUpgrade(50, 10);
            }}
          >
            <ArrowRightIcon /> Purchase
          </Button>
        </div>
        <div className="border border-black shadow-lg flex justify-center items-center flex-col p-4 rounded-lg">
          <h2 className="font-bold mt-5">Medium</h2>
          <h1 className="text-3xl my-3">250₹</h1>
          <div className="flex justify-start items-center flex-col">
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> 50 courses generate
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Unlimited Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Email Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Help Center Access
            </p>
          </div>

          {/* <h2 className="text-primary mt-5">current plan</h2> */}
          <Button
            className="mt-5"
            size="sm"
            disabled={isProcessing}
            onClick={() => {
              handleUpgrade(250, 50);
            }}
          >
            <ArrowRightIcon /> Purchase
          </Button>
        </div>
        <div className="border border-black shadow-lg flex justify-center items-center flex-col p-4 rounded-lg">
          <h2 className="font-bold mt-5">Advance</h2>
          <h1 className="text-3xl my-3">500₹</h1>
          <div className="flex justify-start items-center flex-col">
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> 100 courses generate
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Unlimited Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Email Support
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Help Center Access
            </p>
            <p className="flex justify-center items-start gap-2 w-full">
              <CheckIcon /> Direct Chat With AI
            </p>
          </div>

          {/* <h2 className="text-primary mt-5">current plan</h2> */}
          <Button
            className="mt-5"
            size="sm"
            disabled={isProcessing}
            onClick={() => {
              handleUpgrade(500, 100);
            }}
          >
            <ArrowRightIcon /> Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
