"use client";

import { AlertError } from "@/components/AlertError";
import VideoSkeleton from "@/components/VideoSkeleton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const loadVideo = (videoUrl: string) => {
    router.push(videoUrl);
  };

  return (
    <>
      <div className="pl-4">
        <h1 className="text-2xl font-bold my-4 text-center">Random Videos</h1>
        <div className="w-full flex flex-wrap justify-center">
          {Array.from({ length: 32 }, (_, i) => {
            return (
              <div key={i} className="mr-4 mb-8">
                <VideoSkeleton onClick={loadVideo} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 px-8 pb-8 w-full">
        {errorMsg && (
          <AlertError onClick={() => setErrorMsg("")}>{errorMsg}</AlertError>
        )}
      </div>
    </>
  );
}
