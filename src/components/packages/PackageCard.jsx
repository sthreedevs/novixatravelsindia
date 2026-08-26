"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const PackageCard = ({ data }) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-md xl:mb-4 mx-auto">
      <div
        className={cn(
          "group w-full overflow-hidden relative card h-60 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          data?.image && `bg-[url('${data.image.replace(/'/g, "\\'")}')]`,
          "bg-cover bg-center bg-no-repeat",
          "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
        style={{
          backgroundImage: data?.image
            ? `url('${data.image.replace(/'/g, "\\'")}')`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text relative z-40">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {data.title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {data.description}
          </p>
          <Button
            onClick={() => router.push(`/services/packages/${data._id}`)}
            variant="outline"
            className="cursor-pointer"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};
