export const HAS_SCANNED_CV_STORAGE_KEY = "nextstep.hasScannedCv";

export function getHasScannedCv(): boolean {
  return localStorage.getItem(HAS_SCANNED_CV_STORAGE_KEY) === "true";
}

export function setHasScannedCv(value: boolean): void {
  localStorage.setItem(HAS_SCANNED_CV_STORAGE_KEY, value ? "true" : "false");
}
