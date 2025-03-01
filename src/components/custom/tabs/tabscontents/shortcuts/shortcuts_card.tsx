import { Favicon } from "@/components/custom/favicon/Favicon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";
import { iconMap } from "@/consts/shortcuts";
import { ellipsis } from "@/lib/stringlib";
import { cn, openUrl, getUrlHostname } from "@/lib/utils";
import { Shortcut, shortcutModifyFunction } from "@/types/tabstypes/shortcuts";
import { Pin, Globe } from "lucide-react";

export default function ShortcutCard({
  shortcut,
  modify,
}: {
  shortcut: Shortcut;
  modify: shortcutModifyFunction;
}) {
  const hoverCardItem = [
    { label: "Name", value: shortcut.name },
    {
      label: "URL",
      value: shortcut.url,
      className: "hover:underline cursor-pointer",
    },
    { label: "Description", value: shortcut.description },
    {
      label: "Created",
      value: new Date(shortcut.createdAt).toLocaleDateString(),
    },
  ];
  return (
    <ContextMenuWrap
      className="h-fit"
      items={[
        {
          children: shortcut.pinned ? "Unpin" : "Pin",
          props: {
            onClick: (e) => {
              e.stopPropagation();
              modify(shortcut.id).togglePin();
            },
          },
        },
        {
          children: "Edit",
          props: {
            onClick: (e) => {
              e.stopPropagation();
              modify(shortcut.id).edit(shortcut);
            },
          },
        },
        {
          children: "Delete",
          props: {
            className: "text-red-500",
            onClick: (e) => {
              e.stopPropagation();
              modify(shortcut.id).remove();
            },
          },
        },
      ]}
    >
      <HoverCard>
        <HoverCardTrigger>
          <ShortcutCardBarebone shortcut={shortcut} viewOnly={false} />
        </HoverCardTrigger>
        <HoverCardContent className="bg-glass border-white/10 w-64 space-y-3 cursor-default">
          <Favicon
            url={shortcut.url}
            size={96}
            className="rounded-lg  cursor-pointer hover:scale-[1.02] animfast"
          />
          {hoverCardItem.map(({ label, value, className }) => (
            <div key={label}>
              <div className="text-white/50 text-xs">{label}</div>
              <div className={cn("text-white/80 text-sm", className)}>
                {value}
              </div>
            </div>
          ))}
        </HoverCardContent>
      </HoverCard>
    </ContextMenuWrap>
  );
}

function ShortcutCardBarebone({
  shortcut,
  viewOnly,
}: {
  shortcut: Shortcut;
  viewOnly: boolean;
}) {
  const Icon = shortcut.pinned
    ? iconMap["Pin"]
    : iconMap[shortcut.icon] || Globe;
  return (
    <div
      className={cn(
        "bg-glass bg-white/10 p-2 rounded-md flex-col cursor-pointer flex border border-white/10  hover:bg-white/[0.08] animfast",
        "w-32 aspect-square"
      )}
      onClick={() => {
        if (!viewOnly) {
          openUrl(shortcut.url);
        }
      }}
    >
      <div className="flex h-full flex-col max-w-full gap-1 overflow-clip">
        <div className="flex gap-1.5 items-center  ">
          <div className="rounded-full bg-white/15 w-7 flex-center h-7 aspect-square">
            {shortcut.pinned ? (
              <Pin size={18} />
            ) : (
              <Favicon
                url={shortcut.url}
                size={18}
                fallback={<Icon size={18} />}
              />
            )}
          </div>
          <div className="text-sm text-gray-50 text-nowrap">
            {ellipsis(shortcut.name || "", 10)}
          </div>
        </div>
        <div className="text-gray-300 text-sm">
          {ellipsis(shortcut.description || "", 20)}
        </div>
        <div className="text-white/50 text-nowrap text-[0.8rem]">
          {ellipsis(getUrlHostname(shortcut.url), 20)}
        </div>
        <div className="text-white/20 h-full flex items-end text-nowrap text-[0.6rem]">
          Created {new Date(shortcut.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
