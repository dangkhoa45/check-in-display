"use client";
import { useEffect, useRef, useState } from "react";

interface CameraViewProps {
  cameraId?: string;
  code?: string;
  location?: string;
}

export default function CameraView({
  cameraId,
  location,
  code,
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamUrl = `https://camera.goiliace.engineer/stream/${cameraId}/channel/0/webrtc`;
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    function startPlay(videoEl: HTMLVideoElement, url: string) {
      const webrtc = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.l.google.com:19302"],
          },
        ],
      });

      webrtc.ontrack = function (event) {
        console.log(event.streams.length + " track is delivered");
        videoEl.srcObject = event.streams[0];
        videoEl.play();
      };

      webrtc.addTransceiver("video", { direction: "sendrecv" });

      webrtc.onnegotiationneeded = async function () {
        const offer = await webrtc.createOffer();
        await webrtc.setLocalDescription(offer);

        try {
          const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
              data: btoa(webrtc.localDescription?.sdp || ""),
            }),
          });

          const resultText = await response.text();
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }

          const decodedSDP = atob(resultText);

          webrtc.setRemoteDescription(
            new RTCSessionDescription({
              type: "answer",
              sdp: decodedSDP,
            })
          );
        } catch (error) {
          console.error("Negotiation failed:", error);
        }
      };

      const sendChannel = webrtc.createDataChannel("rtsptowebSendChannel");
      sendChannel.onopen = () => {
        console.log(`${sendChannel.label} has opened`);
        setIsOnline(true);
        sendChannel.send("ping");
      };

      sendChannel.onclose = () => {
        console.log(`${sendChannel.label} has closed`);
        setIsOnline(false);
        startPlay(videoEl, url);
      };

      sendChannel.onmessage = (event) => {
        console.log("Message from server:", event.data);
      };
    }

    startPlay(videoEl, streamUrl!);
  }, [streamUrl]);

  return (
    <div ref={containerRef} className="relative bg-gray-900 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-1 flex justify-between items-center text-xs">
        <span>{location}</span>
        <span
          className={
            isOnline
              ? "bg-red-600 px-1 rounded-sm"
              : "bg-gray-600 px-1 rounded-sm"
          }
        >
          {isOnline ? "LIVE" : "OFFLINE"}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs">
        {code}
      </div>
    </div>
  );
}
