import { TabsContent } from "@/components/ui/tabs";
import TabsContentHeader from "./tabscontentheader";
import { cn } from "@/lib/utils";

export default function TabsContentWrapper({
  activeTab,
  setActiveTab,
  children,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}) {
  return (
    <TabsContent value={activeTab}>
      <div
        className={cn(
          "max-w-[70vw] max-h-[70vh] flex flex-col relative bg-black/40 bg-glass rounded-lg",
          "min-h-[600px] min-w-[800px]"
        )}
      >
        <TabsContentHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-2 px-4 flex-1 flex">{children}</div>
      </div>
    </TabsContent>
  );
}
