import { Button } from "@/components/ui/button";
import VideoSkeleton from "@/components/VideoSkeleton";

export default function Home() {
  return (
    <div className="pl-4">
      <h1 className="text-2xl font-bold my-4 text-center">Latest Uploads</h1>
      <div className="w-full flex flex-wrap justify-center">
        {Array.from({ length: 32 }, (_, i) => {
          return (
            <div key={i} className="mr-4 mb-8">
              <VideoSkeleton />
            </div>
          );
        })}
      </div>
    </div>
  );
}
