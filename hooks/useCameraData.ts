import { useEffect, useRef, useState } from "react";

interface Face {
  name: string;
  label: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export function useCameraData(cameraId: string) {
  const [faces, setFaces] = useState<Face[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = `ws://localhost:8000/ws/cameras/${cameraId}`;
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.faces) {
        setFaces(data.faces);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [cameraId]);

  return { faces };
}
