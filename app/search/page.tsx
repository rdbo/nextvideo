"use client";

import { AlertError } from "@/components/AlertError";
import VideoSkeleton from "@/components/VideoSkeleton";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const params = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [matches, setMatches] = useState<
    { title: string; description: string; video_url: string }[]
  >([]);
  const [isSearching, setIsSearching] = useState(true);
  const searchQuery = params.get("query");

  useEffect(() => {
    if (!searchQuery) {
      router.push("/");
      return;
    }

    axios
      .get(`/api/search`, { params: { query: searchQuery } })
      .then((resp) => {
        setIsSearching(false);
        if (resp.status < 200 || resp.status > 299) {
          setErrorMsg("Bad response from the server");
          return;
        }

        setMatches(resp.data);
      })
      .catch(() => {
        setIsSearching(false);
        setErrorMsg("Failed to search for videos");
      });
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Search Results</h1>
      {isSearching ? (
        <p className="text-center my-4 text-xl">Searching...</p>
      ) : matches.length > 0 ? (
        <div className="w-full flex flex-wrap justify-center">
          {matches.map((video, index) => (
            <div key={index} className="mr-4 mb-8">
              <VideoSkeleton
                title={video.title}
                videoUrl={video.video_url}
                onClick={(url) => router.push(url)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center my-4 text-xl">No matches found</p>
      )}
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
