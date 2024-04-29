"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function Watch() {
  const params = useSearchParams();
  const router = useRouter();

  const video_id = params.get("id");
  if (!video_id) {
    router.push("/");
  }

  return (
    <div className="mt-4 flex justify-center">
      <div className="h-[40vw] w-[80vw] min-h-40 max-h-96 max-w-[50rem]">
        <Skeleton className="h-full w-full" />
        <div className="h-8 mt-4">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-20 mt-4">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
