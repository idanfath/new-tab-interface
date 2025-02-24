import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import { TabsName } from "./const";
import { TabsDock } from "./tabsdock";
import TabsContentWrapper from "./tabscontentwrapper";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("shortcuts");
  const switchTab = (tab: string) => setActiveTab(activeTab === tab ? "" : tab);
  return (
    <>
      <Tabs value={activeTab}>
        {activeTab && (
          <TabsContentWrapper
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </Tabs>
      <TabsDock activeTab={activeTab} switchTab={switchTab} tabs={TabsName} />
    </>
  );
}
