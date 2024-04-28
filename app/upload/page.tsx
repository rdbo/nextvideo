"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { AlertError } from "@/components/AlertError";

interface VideoInfo {
  title: string;
  description: string;
}

interface VideoInfoContextProps {
  videoInfo: VideoInfo | null;
  setVideoInfo: React.Dispatch<React.SetStateAction<VideoInfo | null>>;
}

const VideoInfoContext = createContext<VideoInfoContextProps | null>(null);

function VideoInformation() {
  const { setVideoInfo } = useContext(
    VideoInfoContext,
  ) as VideoInfoContextProps;
  const formVideoTitle = useRef<HTMLInputElement>(null);
  const formVideoDesc = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const videoTitle = (formVideoTitle.current as HTMLInputElement).value;
    const videoDesc = (formVideoDesc.current as HTMLTextAreaElement).value;
    setVideoInfo({ title: videoTitle, description: videoDesc });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Video Information</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleFormSubmit} className="w-96">
          <Label htmlFor="name" className="font-bold text-xl">
            Title
          </Label>
          <Input
            id="name"
            name="name"
            ref={formVideoTitle}
            className="mb-4"
            placeholder="How I made an Operating System"
            required
          />
          <Label htmlFor="description" className="font-bold text-xl">
            Description
          </Label>
          <Textarea
            ref={formVideoDesc}
            id="description"
            name="description"
            rows={10}
            className="resize-none"
            placeholder="This is a video about when I made my first operating system"
            required
          />
          <Button className="w-full mt-4">Continue</Button>
        </form>
      </div>
    </>
  );
}

function UploadVideoFile() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInfo = (useContext(VideoInfoContext) as VideoInfoContextProps)
    .videoInfo as VideoInfo;
  const [errorMsg, setErrorMsg] = useState("");

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      setErrorMsg("");
      setIsUploading(true);
      let formData = new FormData();
      formData.append("title", videoInfo.title);
      formData.append("description", videoInfo.description);
      formData.append("video", acceptedFiles[0]);
      const uploadVideo = async () => {
        let resp;
        try {
          resp = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },

            onUploadProgress: (event) => {
              const progress = (event.loaded / (event.total as number)) * 100;
              setUploadProgress(progress);
            },
          });
        } catch (error) {
          setIsUploading(false);
          setErrorMsg("Failed to upload video");
          return;
        }

        setIsUploading(false);

        if (resp.status < 200 || resp.status > 299) {
          setErrorMsg("Bad response after uploading video to server");
          return;
        }
      };
      uploadVideo();
    },
    [videoInfo],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: { "video/*": [".mp4", ".avi", ".mpeg", ".mkv"] },
    disabled: isUploading,
    maxFiles: 1,
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Upload a Video</h1>
      <div className="px-8">
        <p className="text-center text-xl">
          <span className="font-bold">Title:</span> {videoInfo.title}
        </p>
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
      <div className="fixed bottom-0 px-8 pb-8 w-full">
        {errorMsg && <AlertError onClick={() => setErrorMsg("")}>{errorMsg}</AlertError>}
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
