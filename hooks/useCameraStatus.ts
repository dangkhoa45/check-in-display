import { useEffect, useRef, useState } from "react";

export function useCameraStatus(cameraId: string) {
  const [status, setStatus] = useState(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Kết nối WebSocket
    ws.current = new WebSocket(`ws://localhost:8000/ws/cameras/${cameraId}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data); // status, fps, frameCount, faces[]
    };

    ws.current.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      ws.current?.close();
    };
  }, [cameraId]);

  return { status };
}
