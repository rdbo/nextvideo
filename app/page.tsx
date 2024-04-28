import { Button } from "@/components/ui/button";
import VideoSkeleton from "@/components/VideoSkeleton";

export default function Home() {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold mb-2">Latest Uploads</h1>
      <VideoSkeleton />
      <Button>Hello</Button>
    </div>);
}
