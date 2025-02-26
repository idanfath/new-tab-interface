import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Globe, Loader } from "lucide-react";
import { useState } from "react";
function GetIcon(item: TabsAppsItem): React.ReactNode {
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

export function TabsAppsCard({ item }: { item: TabsAppsItem }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      className="flex flex-col py-4  rounded-lg w-full items-center gap-2"
      open={open}
    >
      <div className="flex pr-4 w-full gap-2">
        <div className="w-1 h-full rounded-r-md bg-white/5 cursor-move"></div>
        <div className="p-3  rounded-full bg-glass flex-center bg-white aspect-square w-14 h-14">
          {GetIcon(item)}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className=" font-semibold">{item.name}</div>
          <div className="text-sm text-white/50">{item.description}</div>
        </div>
        <div className="flex justify-end items-center">
          <CollapsibleTrigger asChild>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? "Close" : "Open"}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="w-full">
        <div className="w-full h-[1px] mt-2 bg-white/10" />
        <div className="px-4 pt-4">{item.content}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
