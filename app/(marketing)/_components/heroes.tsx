"use client";

import Image from "next/image";
import React from "react";

const Heroes: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px]">
          <Image
            src={"/next.svg"}
            alt=""
            fill
            className="object-contain dark:invert"
          />
        </div>
      </div>
      {/* Put your image here */}
      {/* <Image /> */}
    </div>
  );
};

export default Heroes;
