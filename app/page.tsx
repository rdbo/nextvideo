import { Button } from "@/components/ui/button";
import VideoSkeleton from "@/components/VideoSkeleton";

export default function Home() {
  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4">Latest Uploads</h1>
      {Array.from({ length: 3 }, (_, i) => {
        return (
          <div className="flex mb-8">
            {Array.from({ length: 5 }, (_, i) => {
              return (
                <div className="mr-4">
                  <VideoSkeleton key={i} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
