import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

const MarketingPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
