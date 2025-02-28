import { cn } from "@/lib/utils";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import { Loader, Globe } from "lucide-react";
import { useState } from "react";

export default function GetIcon(item: TabsAppsItem): React.ReactNode {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <>
      {isLoading ? (
        <Loader size={32} className="animate-spin" />
      ) : (
        error && <Globe size={32} />
      )}
      <img
        src={item.icon.url}
        alt={`${item.name} favicon`}
        className={cn({
          hidden: isLoading || error,
          block: !isLoading && !error,
        })}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </>
  );
}
