"use client";

import { AlertError } from "@/components/AlertError";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Watch() {
  const params = useSearchParams();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [videoInfo, setVideoInfo] = useState<{
    title: string;
    description: string;
    video_url: string;
  } | null>(null);
  const video_id = params.get("id");

  useEffect(() => {
    if (!video_id) {
      router.push("/");
      return;
    }

    axios
      .get(`/api/video/${video_id}`)
      .then((resp) => {
        if (resp.status < 200 || resp.status > 299) {
          setErrorMsg("Bad response from the server");
          return;
        }

        const requiredProps = ["title", "description", "video_url"];
        for (let prop of requiredProps) {
          if (!resp.data.hasOwnProperty(prop)) {
            setErrorMsg("Malformed response from the server");
            return;
          }
        }

        const newVideoInfo = {
          title: resp.data.title,
          description: resp.data.description,
          video_url: resp.data.video_url,
        };
        setVideoInfo(newVideoInfo);
      })
      .catch(() => {
        setErrorMsg("Failed to load video");
      });
  }, []);

  return (
    <>
      <div className="mt-4 flex justify-center">
        <div className="h-[40vw] w-[80vw] min-h-40 max-h-96 max-w-[50rem]">
          {videoInfo ? (
            <video
              src={videoInfo.video_url}
              controls
              className="h-full w-full"
            ></video>
          ) : (
            <Skeleton className="h-full w-full" />
          )}
          <div className="h-8 mt-4">
            { videoInfo ? <p className="h-full w-full text-xl">{videoInfo.title}</p> : <Skeleton className="h-full w-full" />}
          </div>
          <div className="h-20 mt-4">
            { videoInfo ? <p className="h-full w-full text-lg text-slate-400">{videoInfo.description}</p> : <Skeleton className="h-full w-full" />}
          </div>
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
