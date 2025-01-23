"use client";
import config from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import React from "react";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo
        path={videoUrl}
        controls
        className="rounded-xl w-full"
        transformation={[
          {
            height: "1080",
            width: "1920",
          },
        ]}
      />
    </ImageKitProvider>
  );
};

export default BookVideo;
