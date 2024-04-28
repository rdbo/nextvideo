"use client";

import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
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
