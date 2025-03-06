// TODO: categorize functions to different files

/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function openUrl(url: string, target: string = "_self"): void {
  window.open(url, target);
}

export function getUrlHostname(url: string) {
  if (!isValidUrl(url)) return "";
  const urlObj = new URL(url.startsWith("http") ? url : `http://${url}`);
  const parts = urlObj.hostname.split(".");
  return parts.length > 2 ? parts.slice(-2).join(".") : urlObj.hostname;
}

export function isValidUrl(url: string) {
  if (!url || url === "" || url === " ") return false;
  try {
    new URL(url.startsWith("http") ? url : `http://${url}`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function toUrl(url: string) {
  return url.startsWith("http") ? url : `http://${url}`;
}

export function fetchLocalData(
  key: string,
  defaultValue: any,
  mustBeJSON: boolean = false
) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return mustBeJSON ? defaultValue : data;
    }
  }
  return defaultValue;
}
export function postLocalData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getUniqueID = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return (timestamp + random).toString(36).slice(0, 8);
};

export function getFaviconUrl(url: string, size: number = 16): string {
  url = url.startsWith("http") ? url : `https://${url}`;
  const domain = getUrlHostname(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}
