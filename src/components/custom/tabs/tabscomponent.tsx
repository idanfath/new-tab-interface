import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import { TabsDock } from "./tabsdock";
import TabsContentWrapper from "./tabscontentwrapper";
import { tabsName } from "./tabscontents/tabscontentmap";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("shortcuts");

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
