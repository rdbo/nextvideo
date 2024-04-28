import { Button } from "@/components/ui/button";
import VideoSkeleton from "@/components/VideoSkeleton";

export default function Home() {
  const generateElements = (count: number, element) => {
    let elements = [];
    for (let i = 0; i < count; ++i) elements.push(element);
    return elements;
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4">Latest Uploads</h1>
      {generateElements(
        3,
        <div className="flex mb-8">
          {generateElements(
            5,
            <div className="mr-4">
              <VideoSkeleton />
            </div>,
          )}
        </div>,
      )}
    </div>
  );
}
