"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

const buildClipPath = (progress) => {
  const x = progress * 100; // from 100% to 0%
  return `polygon(${x}% 0%, 100% 0%, 100% 100%, ${x}% 100%)`;
};

const WixHero = ({ title, content, btnText, image, top }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // start animating when top hits bottom, end when bottom hits top
  });

  const totalLines = content?.length;

  // const clipPath = useTransform(scrollYProgress, (p) => buildClipPath(p));

  return (
    <div
      className="relative h-[500vh] flex flex-col text-start px-10 md:px-10 lg:px-16 snap-y snap-mandatory"
      ref={ref}
    >
      <div className="sticky top-21 scale-105 py-20 snap-center flex flex-col justify-center">
        <h1 className="text-4xl md:text-8xl mb-4">{title}</h1>

        {content.map((text, index) => {
          const start = index / totalLines;
          const end = (index + 1) / totalLines;

          const lineProgress = useTransform(
            scrollYProgress,
            [start, end],
            [0, 1]
          );
          const clipPath = useTransform(lineProgress, buildClipPath);
          return (
            <div
              key={index}
              className="relative text-4xl md:text-8xl bg-gradient-to-r bg-white text-transparent bg-clip-text"
            >
              {text}
              <motion.div
                className="absolute top-0 left-0 text-4xl md:text-8xl bg-gradient-to-r from-zinc-600 to-zinc-600 text-transparent bg-clip-text"
                style={{ clipPath }}
              >
                {text}
              </motion.div>
            </div>
          );
        })}

        <Button
          onClick={() => window.scrollBy({ top, behavior: "smooth" })}
          variant="outline"
          className="md:w-60 md:h-16 md:text-3xl mt-6 rounded-4xl"
        >
          {btnText} &darr;
        </Button>
      </div>
    </div>
  );
};

export default WixHero;
