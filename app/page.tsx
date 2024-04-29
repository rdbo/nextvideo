"use client";

import VideoSkeleton from "@/components/VideoSkeleton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const loadVideo = (videoUrl: string) => {
    router.push(videoUrl);
  };

  return (
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
  );
}
