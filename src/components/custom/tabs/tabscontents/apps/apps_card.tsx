import { Button } from "@/components/ui/button";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { useState } from "react";
import GetIcon from "./app_icon";
import dedent from "dedent";
import { capitalize } from "@/lib/stringlib";
import { openUrl } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function TabsAppsCard({ item }: { item: TabsAppsItem }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      className="flex-col py-4 items-center gap-2 flex border-white/10 w-full bg-glass bg-black/20 rounded-md border"
      open={open}
    >
      <div className="flex px-4 w-full gap-2">
        <div className="p-3  rounded-full bg-glass flex-center bg-white aspect-square w-14 h-14">
          {GetIcon(item)}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className=" font-semibold flex items-center gap-1.5">
            {item.name}{" "}
            <div className="flex items-center">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="mr-1 text-[0.6rem] font-thin bg-white rounded-lg bg-glass p-0.5 px-1.5 text-white/50"
                >
                  #{capitalize(tag)}
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm text-white/50 max-w-[80%] text-pretty">
            {dedent`${item.description}`}
          </div>
        </div>
        <div className="flex justify-end items-center">
          {item.content ? (
            <CollapsibleTrigger asChild>
              <Button
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? "Close" : "Open"}
              </Button>
            </CollapsibleTrigger>
          ) : (
            item.path && (
              <Button
                onClick={() => {
                  navigate(item.path);
                }}
              >
                Open
              </Button>
            )
          )}
        </div>
      </div>
      <CollapsibleContent className="w-full">
        <div className="w-full h-[1px] mt-2 bg-white/10" />
        <div className="px-4 pt-4">{item.content}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
