import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn, ellipsis, getUrlDomain, openUrl } from "@/lib/utils";
import { Shortcut } from "@/types/tabstypes/shortcuts";
import { AppWindow, Globe, LayoutDashboard, Pin, Settings } from "lucide-react";
const iconMap = {
  LayoutDashboard: LayoutDashboard,
  AppWindow: AppWindow,
  Settings: Settings,
};

const exampleShortcut: Shortcut[] = [
  {
    id: "example",
    pinned: true,
    icon: "LayoutDashboard",
    name: "Example",
    url: "https://example.com",
    description: "An example shortcut.",
    createdAt: Date.now(),
  },
  {
    id: "example2",
    pinned: false,
    icon: "LayoutDashboard",
    name: "Example 2",
    url: "https://example.com",
    createdAt: Date.now(),
  },
];
function ShortcutCard({ shortcut }: { shortcut: Shortcut }) {
  const Icon = shortcut.pinned ? Pin : iconMap[shortcut.icon] || Globe;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "bg-glass bg-white/10 p-2 rounded-md flex-col cursor-pointer flex border border-white/10  hover:bg-white/[0.08] animfast",
            "w-32 aspect-square"
          )}
          onClick={() => {
            openUrl(shortcut.url);
          }}
        >
          <div className="flex h-full flex-col gap-1">
            <div className="flex gap-1.5 items-center">
              <div className="rounded-full bg-white/15 w-7 flex-center h-7 aspect-square">
                <Icon size={18} />
              </div>
              <div className="text-sm text-gray-50">{shortcut.name}</div>
            </div>
            <div className="text-gray-300 text-sm">
              {ellipsis(shortcut.description || "", 20)}
            </div>
            <div className="text-white/50 text-nowrap text-[0.8rem]">
              {ellipsis(getUrlDomain(shortcut.url), 20)}
            </div>
            <div className="text-white/20 h-full flex items-end text-nowrap text-[0.6rem]">
              Created {new Date(shortcut.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>{shortcut.pinned ? "Unpin" : "Pin"}</ContextMenuItem>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem className="text-red-500">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default function ShortcutsContent() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex gap-2 flex-wrap">
          {exampleShortcut.map((shortcut) => (
            <ShortcutCard key={shortcut.id} shortcut={shortcut} />
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New Shortcut</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
