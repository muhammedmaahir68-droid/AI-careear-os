// src/hooks/useAIExplanation.ts
import { useState } from "react";
import { getAIExplanation } from "../lib/api";

/**
 * Hook to fetch an AI explanation for a given prompt.
 * Returns the explanation, loading state and any error.
 */
export function useAIExplanation() {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getAIExplanation(prompt);
      setExplanation(resp);
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return { explanation, loading, error, fetchExplanation };
}
