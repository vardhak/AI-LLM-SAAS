"use client";
import { Button } from "@/components/ui/button";
import Header from "./header/header";
import Image from "next/image";
import { ArrowRightIcon, Video } from "lucide-react";
import Link from "next/link";
import Footer from "./footer/footer";
import { useRef, useState } from "react";

export default function Home() {
  const elementRef = useRef(null);
  const [play, setPlay] = useState(false);

  const scrollToElement = () => {
    setPlay(true);
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-[90%] md:w-[85%] mx-auto mt-20 md:mt-28 gap-x-24">
        <div className="max-sm:hidden">
          <Image
            src={"/knowledge.png"}
            alt="img"
            width={60}
            height={60}
            className="transform -rotate-12"
          />
        </div>
        <div className=" max-w-[550px] flex justify-center items-center text-center flex-col">
          <h1 className="text-4xl font-extrabold uppercase">
            ai-powered <span className="text-primary">exam prep</span> material
            generator
          </h1>
          <h3 className="text-slate-500 my-3 capitalize ">
            your ai exam prep companion: effortless study materail at your
            fingerprints{" "}
          </h3>
          <div className="flex justify-center items-center gap-x-4 mt-2">
            <Link href={"/dashboard"}>
              <Button>
                Get Started <ArrowRightIcon />{" "}
              </Button>
            </Link>
            <Button variant="outline" onClick={scrollToElement}>
              <Video />
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="max-sm:hidden">
          <Image
            src={"/code.png"}
            alt="img"
            width={60}
            height={60}
            className="transform rotate-12"
          />
        </div>
      </div>

      <h3 className="text-slate-500 text-lg flex justify-center items-center capitalize mt-10">
        featured in
      </h3>

      <div className="flex justify-center items-center gap-x-10 md:gap-x-32 gap-y-8 mt-10 flex-wrap opacity-80">
        <div className="flex justify-center items-center gap-1 grayscale">
          <Image src={"/github1.png"} alt="versel" width={30} height={30} />{" "}
          <h2 className="text-lg md:text-2xl font-bold text-slate-600">
            GitHub
          </h2>
        </div>
        <div className="flex justify-center items-center gap-1 grayscale">
          <Image src={"/whatsapp.png"} alt="versel" width={30} height={30} />
          <h2 className="text-lg md:text-2xl font-bold text-slate-600">
            WhatsApp
          </h2>
        </div>
        <div className="flex justify-center items-center gap-1 grayscale">
          <Image src={"/linkedin.png"} alt="versel" width={30} height={30} />
          <h2 className="text-lg md:text-2xl font-bold text-slate-600">
            LinkedIn
          </h2>
        </div>
      </div>

      <div
        className="flex justify-center items-center mt-24 mb-8 "
        ref={elementRef}
      >
        <video
          className="md:w-[900px] w-[80%] md:h-[400px] md:object-cover border shadow-md"
          autoPlay={play}
          loop={true}
          controls={true}
        >
          <source src={"/webDemo.mp4"} type="video/mp4" />
        </video>
      </div>

      <Footer />
    </>
  );
}
