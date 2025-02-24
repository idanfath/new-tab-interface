import { TabsContent } from "@/components/ui/tabs";
import { TabsName } from "./const";
import TabsContentHeader from "./tabscontentheader";

export default function TabsContentWrapper({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <TabsContent value={activeTab}>
      <div className="max-w-[70vw] max-h-[70vh] bg-black/40 bg-glass rounded-lg min-h-[600px] min-w-[800px]">
        <TabsContentHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-2 px-4">{TabsName[activeTab].content()}</div>
      </div>
    </TabsContent>
  );
}
