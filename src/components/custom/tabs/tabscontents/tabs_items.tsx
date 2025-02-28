import { TabsName as TabItems } from "@/types/tabstypes/tabs";
import { AppWindow, LayoutDashboard, Settings } from "lucide-react";
import placeholder from "../../placeholder";
import ShortcutsContent from "./shortcuts/shortcuts";
import TabsApps from "./apps/apps";

export const tab_items: TabItems = {
    shortcuts: {
        name: "shortcuts",
        icon: LayoutDashboard,
        content: ShortcutsContent,
    },
    apps: { name: "apps", icon: AppWindow, content: TabsApps },
    settings: { name: "settings", icon: Settings, content: placeholder },
};
