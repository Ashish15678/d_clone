"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface fileuploadprops {
  onChange: (url?: String) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ value, onChange, endpoint }: fileuploadprops) => {
  const filetype = value?.split(".").pop();

  if (value && filetype !== "pdf") {
    return (
      <>
        <div className="relative h-20 w-20">
          <Image
            fill
            src={value}
            className="rounded-full"
            alt="upladed Image"
          />
        </div>
        <button
          className="bg-rose-500 rounded-full top-0 right-0 text-white p-1"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="h-4 w-4"></X>
        </button>
      </>
    );
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log("ERROR ON UPLOADING:", error);
        }}
      />
    </>
  );
};

export default FileUpload;
