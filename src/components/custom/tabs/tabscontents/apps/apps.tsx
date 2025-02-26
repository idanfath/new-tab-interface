import { TabsAppsCard } from "./appcard";
import TabsAppsItems from "./appsitemsmap";

export default function TabsApps() {
  return (
    <div className="flex-1 w-full">
      <div className="flex border-white/10 bg-glass bg-black/20 rounded-md border">
        {TabsAppsItems.map((item) => (
          <TabsAppsCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
