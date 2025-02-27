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
          "max-w-[60vw] mb-10 max-h-[70vh] flex flex-col border border-white/5 relative bg-black/40 bg-glass rounded-lg",
          "min-h-[600px] min-w-[800px] "
        )}
      >
        <TabsContentHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-2 px-4 flex-1 flex overflow-scroll">{children}</div>
      </div>
    </TabsContent>
  );
}
