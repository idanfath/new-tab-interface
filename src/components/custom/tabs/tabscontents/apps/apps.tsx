import { TabsAppsCard } from "./apps_card";
import { TabsAppsItems } from "./apps_items";

export default function TabsApps() {
  return (
    <div className="flex-1 w-full flex flex-col gap-2">
      {TabsAppsItems.map((item) => (
        <TabsAppsCard key={item.name} item={item} />
      ))}
    </div>
  );
}
