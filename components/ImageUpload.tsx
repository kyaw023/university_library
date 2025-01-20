"use client";
import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);

  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    console.log("Error", err);

    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} has been uploaded successfully `,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            (ikUploadRef.current as any).click();
          }
        }}
        className="upload-btn"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={200}
          height={200}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
