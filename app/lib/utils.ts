import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes >= GB) {
    return `${(bytes / GB).toFixed(2)} GB`;
  }
  if (bytes >= MB) {
    return `${(bytes / MB).toFixed(2)} MB`;
  }
  if (bytes >= KB) {
    return `${(bytes / KB).toFixed(2)} KB`;
  }
  return `${bytes} B`;
}

export default formatSize;

export const generateUUID = () => {
  // Prüft, ob randomUUID verfügbar ist (nur in HTTPS/Localhost)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback: Ein einfacher, manueller UUID-Generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};