import { TabsName } from "@/types/tabstypes/tabs";
import { AppWindow, LayoutDashboard, Settings } from "lucide-react";
import placeholder from "../../placeholder";
import ShortcutsContent from "./shortcuts/shortcuts";

export const tabsName: TabsName = {
  shortcuts: {
    name: "shortcuts",
    icon: LayoutDashboard,
    content: ShortcutsContent,
  },
  apps: { name: "apps", icon: AppWindow, content: placeholder },
  settings: { name: "settings", icon: Settings, content: placeholder },
};
