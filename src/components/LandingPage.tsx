"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

 function LandingPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white dark:text-white">
        Zero Knowledge Asset Verifier
      </p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
export default LandingPage
