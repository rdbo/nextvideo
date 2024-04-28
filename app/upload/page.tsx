"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

interface VideoInfo {
  name: string;
  description: string;
}

interface VideoInfoContextProps {
  videoInfo: VideoInfo | null;
  setVideoInfo: React.Dispatch<React.SetStateAction<VideoInfo | null>>;
}

const VideoInfoContext = createContext<VideoInfoContextProps | null>(null);

function VideoInformation() {
  const { videoInfo, setVideoInfo } = useContext(VideoInfoContext) as VideoInfoContextProps;
  const formVideoName = useRef(null);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Video Information</h1>
      <div className="flex flex-col items-center">
      <form onSubmit={handleFormSubmit} className="w-96">
        <Label htmlFor="name" className="font-bold text-xl">Title</Label>
        <Input id="name" name="name" ref={formVideoName} className="mb-4" />
        <Label htmlFor="description" className="font-bold text-xl">Description</Label>
        <Textarea id="description" name="description" rows={10} className="resize-none" />
        <Button className="w-full mt-4">Continue</Button>
      </form>
      </div>
    </>
  );
}

function UploadVideoFile() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setIsUploading(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: { "video/*": [".mp4", ".avi", ".mpeg", ".mkv"] },
    disabled: isUploading,
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Upload a Video</h1>
      <div className="px-8">
        <div
          {...getRootProps()}
          className="border-4 border-slate-800 border-dashed h-96 w-full rounded-lg flex justify-center items-center text-2xl text-center text-slate-400"
        >
          <input {...getInputProps()} />
          <Upload size={32} />
          <p className="ml-2">
            {isUploading
              ? "Uploading..."
              : isDragActive
                ? "Drop the video file here..."
                : "Select a video file"}
          </p>
        </div>
        {isUploading && (
          <div className="my-2 relative h-8 flex items-center justify-center">
            <Progress value={uploadProgress} className="h-6" />
            <p className="absolute top-0 h-8 text-sm flex items-center font-bold text-blue-400">
              {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function UploadPage() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  return (
    <VideoInfoContext.Provider value={{ videoInfo, setVideoInfo }}>
      {videoInfo ? <UploadVideoFile /> : <VideoInformation />}
    </VideoInfoContext.Provider>
  );
}
