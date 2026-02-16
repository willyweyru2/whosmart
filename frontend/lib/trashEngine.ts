let trashCache: string[] = [];
let index = 0;
let fetching = false;

const LOW_WATER = 5;

async function fetchTrashBatch() {
  if (fetching) return;
  fetching = true;

  try {
    const res = await fetch("/api/geminiTrashBatch", {
      method: "POST",
      cache: "no-store",
    });

    const data = await res.json();
    if (Array.isArray(data)) {
      trashCache.push(...data);
    }
  } catch (e) {
    console.error("Trash fetch failed", e);
  } finally {
    fetching = false;
  }
}

export async function getTrashLine() {
  if (trashCache.length === 0) {
    await fetchTrashBatch();
  }

  const line = trashCache[index] || "Neural silence...";

  index++;

  if (index >= trashCache.length) index = 0;

  // Background refill
  if (trashCache.length - index < LOW_WATER) {
    fetchTrashBatch();
  }

  return line;
}
