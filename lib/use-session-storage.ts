import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { z } from "zod";

// sessionStorage fires no event for writes in the same tab, so the hook announces its own.
const CHANGE_EVENT = "session-storage-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

// Storage can be unavailable (private mode, blocked site data); treat that as empty.
function readItem(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function removeSessionItem(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Unavailable storage holds nothing to remove.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// A value kept in sessionStorage and checked against a schema when read back.
// The server has no storage, so the first render is always empty and the value
// appears right after hydration.
export function useSessionStorage<T>(key: string, schema: z.ZodType<T>) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readItem(key),
    () => null,
  );

  const value = useMemo(() => {
    if (raw === null) return undefined;
    try {
      const result = schema.safeParse(JSON.parse(raw));
      return result.success ? result.data : undefined;
    } catch {
      return undefined;
    }
  }, [raw, schema]);

  // undefined removes the value.
  const setValue = useCallback(
    (next: T | undefined) => {
      if (next === undefined) {
        removeSessionItem(key);
        return;
      }
      try {
        sessionStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Nothing to do: the booking still works, it just won't survive a reload.
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key],
  );

  return [value, setValue] as const;
}
