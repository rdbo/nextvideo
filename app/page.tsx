"use client";

import { AlertError } from "@/components/AlertError";
import VideoSkeleton from "@/components/VideoSkeleton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [videos, setVideos] = useState<{ title: string; video_url: string }[]>(
    [],
  );

  const loadVideo = (videoUrl: string) => {
    router.push(videoUrl);
  };

  useEffect(() => {
    axios
      .get(`/api/videos`)
      .then((resp) => {
        if (resp.status < 200 || resp.status > 299) {
          setErrorMsg("Bad response from the server");
          return;
        }

        setVideos(resp.data);
      })
      .catch(() => {
        setErrorMsg("Failed to load videos");
      });
  }, []);

  return (
    <>
      <div className="pl-4">
        <h1 className="text-2xl font-bold my-4 text-center">Random Videos</h1>
        <div className="w-full flex flex-wrap justify-center">
          {videos.length > 0
            ? videos.map((video, i) => (
                <div key={i} className="mr-4 mb-8">
                  <VideoSkeleton
                    title={video.title}
                    videoUrl={video.video_url}
                    onClick={loadVideo}
                  />
                </div>
              ))
            : Array.from({ length: 32 }, (_, i) => {
                return (
                  <div key={i} className="mr-4 mb-8">
                    <VideoSkeleton onClick={() => {}} />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="fixed bottom-0 px-8 pb-8 w-full">
        {errorMsg && (
          <AlertError
            onClick={() => {
              setErrorMsg("");
              window.location.reload();
            }}
          >
            {errorMsg}
          </AlertError>
        )}
      </div>
    </>
  );
}
