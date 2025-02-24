/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function openUrl(url: string, target: string = "_self"): void {
    window.open(url, target);
}
export function capitalize(str: string, eachLetter: boolean = true): string {
    if (eachLetter) {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function ellipsis(str: string, length: number, ellipsisText: string = "..."): string {
    return str.length > length ? str.slice(0, length) + ellipsisText : str;
}
export function getUrlDomain(url: string) {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    return urlObj.hostname;
}


export function fetchLocalData(key: string, defaultValue: any) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}
export function postLocalData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}
