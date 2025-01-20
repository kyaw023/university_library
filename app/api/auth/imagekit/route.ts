import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET(request: NextRequest) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
