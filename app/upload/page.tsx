"use client";

import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length == 0) return;
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".avi", ".mpeg", ".mkv"] },
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Upload a Video</h1>
      <div className="flex justify-center px-8">
        <div
          {...getRootProps()}
          className="border-4 border-slate-800 border-dashed h-96 w-full rounded-lg flex justify-center items-center text-2xl text-center text-slate-400"
        >
          <input {...getInputProps()} />
          <Upload size={32} />
          <p className="ml-2">
            {isDragActive
              ? "Drop the video file here..."
              : "Select a video file"}
          </p>
        </div>
      </div>
    </>
  );
}
