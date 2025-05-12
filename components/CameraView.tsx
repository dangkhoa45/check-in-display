"use client";

import { useCameraData } from "@/hooks/useCameraData";
import { useEffect, useRef, useState } from "react";

interface CameraViewProps {
  cameraId: string;
  location: string;
  code: string;
}

export default function CameraView({
  cameraId,
  location,
  code,
}: CameraViewProps) {
  const { faces } = useCameraData(cameraId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });

  useEffect(() => {
    const resize = () => {
      if (videoRef.current) {
        setDimensions({
          width: videoRef.current.clientWidth,
          height: videoRef.current.clientHeight,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // useEffect(() => {
  //   const videoEl = videoRef.current;
  //   if (!videoEl) return;

  //   const webrtc = new RTCPeerConnection({
  //     iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
  //   });

  //   webrtc.addTransceiver("video", { direction: "recvonly" });

  //   webrtc.ontrack = (event) => {
  //     videoEl.srcObject = event.streams[0];
  //   };

  //   webrtc.onnegotiationneeded = async () => {
  //     const offer = await webrtc.createOffer();
  //     await webrtc.setLocalDescription(offer);

  //     const response = await fetch(
  //       `https://your-backend.com/webrtc/${cameraId}`,
  //       {
  //         method: "POST",
  //         body: new URLSearchParams({ data: btoa(offer.sdp || "") }),
  //       }
  //     );
  //     const answer = await response.text();
  //     await webrtc.setRemoteDescription(
  //       new RTCSessionDescription({ type: "answer", sdp: atob(answer) })
  //     );
  //   };

  //   return () => webrtc.close();
  // }, [cameraId]);

  const originalWidth = 1280;
  const originalHeight = 720;

  return (
    <div ref={containerRef} className="relative bg-gray-900 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-1 flex justify-between items-center text-xs">
        <span>{location}</span>
        <span className="bg-red-600 px-1 rounded-sm">LIVE</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs">
        {code}
      </div>

      {faces.map((face, idx) => {
        const [x1, y1, x2, y2] = face.bbox;
        const x = (x1 / originalWidth) * dimensions.width;
        const y = (y1 / originalHeight) * dimensions.height;
        const width = ((x2 - x1) / originalWidth) * dimensions.width;
        const height = ((y2 - y1) / originalHeight) * dimensions.height;

        const color = face.name === "Unknown" ? "red" : "green";

        return (
          <div key={idx}>
            <div
              className="absolute border-2 z-10"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: color,
              }}
            />
            <div
              className="absolute text-xs z-20 px-1 font-bold"
              style={{
                left: `${x}px`,
                top: `${y - 18}px`,
                backgroundColor: color,
                color: "white",
              }}
            >
              {face.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
