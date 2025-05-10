import { useEffect, useState } from "react";

export function useAIStatus() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((res) => res.json())
      .then((data) => setEnabled(data.ai_enabled));
  }, []);

  const toggleAI = async () => {
    const response = await fetch("/api/ai/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !enabled }),
    });

    const data = await response.json();
    setEnabled(data.current_state);
  };

  return { enabled, toggleAI };
}
