import { IconMap, Shortcut } from "@/types/shortcuts";
import { Globe, Pin } from "lucide-react";

export const iconMap = {
  Pin: Pin,
  Globe: Globe,
} as const;
export const DEFAULT_SHORTCUT: Omit<Shortcut, "id"> = {
  pinned: false,
  icon: "Globe" as IconMap,
  name: "",
  url: "",
  createdAt: Date.now(),
  description: "",
};
