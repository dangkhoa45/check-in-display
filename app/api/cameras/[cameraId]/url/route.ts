import { NextRequest, NextResponse } from "next/server";

const streamUrlMap: Record<string, string> = {
  cam1: "http://103.82.134.252:8083/stream/cam1/channel/0/webrtc",
  cam2: "http://103.82.134.252:8083/stream/cam2/channel/0/webrtc",
  cam3: "http://103.82.134.252:8083/stream/cam3/channel/0/webrtc",
  cam4: "http://103.82.134.252:8083/stream/cam4/channel/0/webrtc",
};

export async function GET(
  req: NextRequest,
  { params }: { params: { cameraId: string } }
) {
  const url = streamUrlMap[params.cameraId];
  if (!url) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ streamUrl: url });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { cameraId: string } }
) {
  const data = await req.json();
  const { streamUrl } = data;

  if (!streamUrl) {
    return NextResponse.json(
      { error: "streamUrl is required" },
      { status: 400 }
    );
  }

  streamUrlMap[params.cameraId] = streamUrl;

  return NextResponse.json({ success: true });
}
