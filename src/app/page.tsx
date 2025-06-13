"use client";

import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import TrackMap from "@/components/TrackMap";

export default function Home() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOnboardingComplete ? (
        <Onboarding onComplete={() => setIsOnboardingComplete(true)} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <TrackMap />
        </div>
      )}
    </div>
  );
}
