import { TabItem } from "@/types/tabstypes/tabs";
import { LayoutDashboard, AppWindow, Settings } from "lucide-react";
import shortcutsContent from "./tabscontents/shortcuts/shortcuts";
import placeholder from "../placeholder";

export const TabsName: { [key: string]: TabItem } = {
  shortcuts: {
    name: "shortcuts",
    icon: LayoutDashboard,
    content: shortcutsContent,
  },
  apps: {
    name: "apps",
    icon: AppWindow,
    content: placeholder,
  },
  settings: {
    name: "settings",
    icon: Settings,
    content: placeholder,
  },
};
