import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import { TabsDock } from "./tabsdock";
import TabsContentWrapper from "./tabscontentwrapper";
import { TabsName } from "@/types/tabstypes/tabs";
import { LayoutDashboard, AppWindow, Settings } from "lucide-react";
import placeholder from "../placeholder";
import ShortcutsContent from "./tabscontents/shortcuts/shortcuts";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("shortcuts");

  const tabsName: TabsName = {
    shortcuts: {
      name: "shortcuts",
      icon: LayoutDashboard,
      content: ShortcutsContent,
    },
    apps: { name: "apps", icon: AppWindow, content: placeholder },
    settings: { name: "settings", icon: Settings, content: placeholder },
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab === activeTab ? "" : tab);
  };

  const TabContent = activeTab ? tabsName[activeTab].content : null;

  return (
    <>
      <Tabs value={activeTab}>
        {activeTab && (
          <TabsContentWrapper activeTab={activeTab} setActiveTab={setActiveTab}>
            {TabContent && <TabContent />}
          </TabsContentWrapper>
        )}
      </Tabs>
      <TabsDock
        activeTab={activeTab}
        switchTab={switchTab}
        tabsName={tabsName}
      />
    </>
  );
}
