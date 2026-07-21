// src/hooks/useFetch.ts

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Generic data‑fetch hook for a Supabase table.
 * @param table   The table name in Supabase.
 * @param filter  Optional equality filter – [column, value].
 * @returns      {data, loading, error, refetch}
 */
export function useFetch<T>(
  table: string,
  filter?: [string, any]
): {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).select("*");
      if (filter) {
        query = query.eq(filter[0], filter[1]);
      }
      const { data, error } = await query;
      if (error) throw error;
      setData(data as T[]);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, JSON.stringify(filter)]);

  return { data, loading, error, refetch: load };
}
