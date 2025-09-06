"use client";

import { useState } from "react";
import { functions } from "@/lib/firebase";
import { httpsCallable } from "firebase/functions";

export default function TestPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const callGemini = async () => {
    if (!prompt) {
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const geminiFunction = httpsCallable(functions, 'gemini');
      const response: any = await geminiFunction({ prompt });
      setResult(response.data.text);
    } catch (error) {
      console.error("Error calling gemini function:", error);
      setResult("Error calling function. See console for details.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Gemini Function</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={callGemini} disabled={loading}>
        {loading ? "Loading..." : "Call Gemini"}
      </button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}