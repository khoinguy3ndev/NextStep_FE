export const LATEST_ANALYSIS_ID_STORAGE_KEY = "nextstep.latestAnalysisId";

export function getLatestAnalysisId(): number | null {
  const value = localStorage.getItem(LATEST_ANALYSIS_ID_STORAGE_KEY);
  if (!value) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function setLatestAnalysisId(analysisId: number): void {
  localStorage.setItem(LATEST_ANALYSIS_ID_STORAGE_KEY, String(analysisId));
}
