/**
 * Helper to reliably resolve package duration (days & nights).
 * Handles cases where database records have 0, null, or undefined values
 * by parsing from the title (e.g., "3 Nights 4 Days Scenic Kerala")
 * or timeline entries.
 */
export function getPackageDuration(pkg) {
  let days = Number(pkg?.days) || 0;
  let nights = Number(pkg?.nights) || 0;

  // If both days and nights are valid positive numbers, return directly
  if (days > 0 && nights > 0) {
    return { days, nights };
  }

  // 1. Attempt to parse from title (e.g. "3 Nights 4 Days", "4N/5D", "5 Days 4 Nights")
  const title = (pkg?.title || "").trim();
  if (title) {
    const nightsMatch = title.match(/(\d+)\s*(?:nights?|n\b)/i);
    const daysMatch = title.match(/(\d+)\s*(?:days?|d\b)/i);

    if (nights <= 0 && nightsMatch) {
      nights = parseInt(nightsMatch[1], 10);
    }
    if (days <= 0 && daysMatch) {
      days = parseInt(daysMatch[1], 10);
    }
  }

  // 2. Fallback: inspect timeline count if available
  if (days <= 0 && Array.isArray(pkg?.timeline) && pkg.timeline.length > 0) {
    days = pkg.timeline.length;
  }

  // 3. Fallback: derive one from the other
  if (days > 0 && nights <= 0) {
    nights = days > 1 ? days - 1 : 1;
  } else if (nights > 0 && days <= 0) {
    days = nights + 1;
  }

  return {
    days: days > 0 ? days : 1,
    nights: nights > 0 ? nights : 1,
  };
}

