import { Skeleton } from "@/components/ui/skeleton";
import { MouseEventHandler } from "react";

export interface Props {
  title?: string;
  videoUrl?: string;
  onClick: (videoUrl: string) => void;
}

export default function VideoSkeleton({ title, videoUrl, onClick }: Props) {
  return (
    <div
      className={
        "flex flex-col space-y-3 w-min" + (videoUrl ? " cursor-pointer" : "")
      }
      onClick={() => videoUrl && onClick(videoUrl)}
    >
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-2">
        {title ? (
          <h1 className="w-60">{title}</h1>
        ) : (
          <>
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-48" />
          </>
        )}
      </div>
    </div>
  );
}
