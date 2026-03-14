import React from "react";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";
import Features from "./_components/features";
import Showcase from "./_components/showcase";

const MarketingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-20">
        <Heading />
        <Heroes />
      </div>
      
      {/* Features Section */}
      <Features />

      {/* Showcase Section */}
      <Showcase />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MarketingPage;
