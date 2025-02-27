import { TabsAppsCard } from "./appcard";
import { TabsAppsItems } from "./appsitemsmap";

export default function TabsApps() {
  return (
    <div className="flex-1 w-full flex flex-col gap-2">
      {TabsAppsItems.map((item) => (
        <TabsAppsCard key={item.name} item={item} />
      ))}
    </div>
  );
}
