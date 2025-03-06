import { useEffect, useState } from "react";
import React from "react";
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shortcut, shortcutModifyFunction } from "@/types/shortcuts";
import { cn, fetchLocalData, openUrl, postLocalData } from "@/lib/utils";
import ShortcutCard from "./shortcuts_card";
import { toast } from "sonner";
import { sonnerMap } from "@/consts/sonnermap";
import { exportToJson, handleJsonFileImport } from "@/lib/jsonlib";
import { ContextMenuItemProps } from "@/types/contextmenuwrap";
import { XCircle } from "lucide-react";
import TooltipWrap from "@/components/wrapper/tooltipwrap";
import {
  sortPinned,
  useShortcutsModify,
} from "@/lib/componentlib/shortcutslib";
import EditAddDialog from "./shortcuts_dialog";

const ShortcutsContent: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() =>
    sortPinned(fetchLocalData("shortcuts", []))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Shortcut | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredData, setFilteredData] = useState<Shortcut[] | null>();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter.length < 1) {
      setFilteredData(null);
    }
    const searchterm = filter.trim().toLowerCase();
    setFilteredData(
      shortcuts.filter(
        (shortcut) =>
          shortcut.name.toLowerCase().includes(searchterm) ||
          shortcut.url.toLowerCase().includes(searchterm) ||
          shortcut.description?.toLowerCase().includes(searchterm)
      )
    );
  }, [filter, shortcuts]);

  const updateShortcuts = (newShortcuts: Shortcut[]) => {
    toast("Shortcut updated", sonnerMap.success);
    setShortcuts(sortPinned(newShortcuts));
  };

  useEffect(() => {
    postLocalData("shortcuts", shortcuts);
  }, [shortcuts]);

  const modify: shortcutModifyFunction = useShortcutsModify(
    updateShortcuts,
    shortcuts,
    setIsEditing,
    setCurrentData,
    setIsOpen
  );

  return (
    <>
      <ContextMenuWrap
        className="flex-1  w-full"
        items={createContextMenuItems(
          setIsEditing,
          setCurrentData,
          setIsOpen,
          setShortcuts,
          shortcuts
        )}
      >
        {shortcuts.length > 5 && (
          <div className="w-full h-fit mb-2 gap-1 flex">
            <Input
              placeholder="Search shortcuts"
              className="bg-glass bg-black/20"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <TooltipWrap tooltip="Clear search">
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-glass bg-black/20 hover:bg-black/50"
                onClick={() => {
                  setFilter("");
                }}
              >
                <XCircle />
              </Button>
            </TooltipWrap>
          </div>
        )}
        <div
          className={cn(
            "flex gap-2 flex-wrap",
            (filteredData || shortcuts).length < 1 && "h-full items-center"
          )}
        >
          {(filteredData || shortcuts).map((shortcut) => (
            <button
              className="text-left"
              key={shortcut.id}
              onClick={() => {
                openUrl(shortcut.url);
              }}
            >
              <ShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                modify={modify}
              />
            </button>
          ))}

          {shortcuts.length < 1 && (
            <div className="text-white/20 text-center w-full text-xl">
              No shortcuts added
            </div>
          )}
        </div>
      </ContextMenuWrap>
      <EditAddDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        currentData={currentData}
        setCurrentData={setCurrentData}
        isEditing={isEditing}
        updateShortcuts={updateShortcuts}
        shortcuts={shortcuts}
      />
    </>
  );
};

export default ShortcutsContent;

function createContextMenuItems(
  setIsEditing: (isEditing: boolean) => void,
  setCurrentData: (data: Shortcut | null) => void,
  setIsOpen: (isOpen: boolean) => void,
  setShortcuts: (shortcut: Shortcut[]) => void,
  shortcuts: Shortcut[]
): ContextMenuItemProps[] {
  return [
    {
      children: "New Shortcut",
      props: {
        onClick: () => {
          setIsEditing(false);
          setCurrentData(null);
          setIsOpen(true);
        },
      },
    },
    {
      children: "Refresh",
      props: {
        onClick: () => {
          setShortcuts(sortPinned(fetchLocalData("shortcuts", [])));
          toast("Shortcuts refreshed", sonnerMap.success);
        },
      },
    },
    {
      children: "Import",
      props: {
        onClick: async () => {
          if (
            shortcuts.length > 0 &&
            !confirm(
              "Importing will overwrite all existing shortcuts. Proceed?"
            )
          ) {
            return;
          }
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".json";
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            try {
              const data = await handleJsonFileImport(file);
              setShortcuts(sortPinned(data));
              toast("Shortcuts imported successfully", sonnerMap.success);
            } catch (err) {
              console.error(err);
              toast(
                err instanceof Error ? err.message : "Import failed",
                sonnerMap.error
              );
            }
          };
          input.click();
        },
      },
    },
    {
      children: "Export",
      props: {
        onClick: () => {
          try {
            exportToJson(shortcuts, "shortcuts.json");
            toast("Shortcuts exported successfully", sonnerMap.success);
          } catch (err) {
            console.error(err);
            toast("Export failed", sonnerMap.error);
          }
        },
      },
    },
    {
      children: "Clear All",
      props: {
        className: "text-red-500",
        onClick: () => {
          if (!shortcuts.length) {
            toast("No shortcuts to clear", sonnerMap.error);
            return;
          }
          if (confirm("Are you sure you want to clear all shortcuts?")) {
            setShortcuts([]);
            toast("All shortcuts cleared", sonnerMap.error);
          }
        },
      },
    },
  ];
}
