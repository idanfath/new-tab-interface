import { useEffect, useState } from "react";
import React from "react";
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconMap,
  Shortcut,
  shortcutModifyFunction,
} from "@/types/tabstypes/shortcuts";
import {
  fetchLocalData,
  getUniqueID,
  isValidUrl,
  postLocalData,
} from "@/lib/utils";
import ShortcutCard from "./shortcutcard";
import { toast } from "sonner";
import { sonnerMap } from "@/consts/sonnermap";
import { exportToJson, handleJsonFileImport } from "@/lib/jsonlib";
import { ContextMenuItemProps } from "@/types/contextmenuwrap";
import { XCircle } from "lucide-react";
import TooltipWrap from "@/components/wrapper/tooltipwrap";

interface DialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentData: Shortcut | null;
  isEditing: boolean;
  updateShortcuts: (newShortcut: Shortcut[]) => void;
  setCurrentData: (currentData: Shortcut | null) => void;
  shortcuts: Shortcut[];
}

const DEFAULT_SHORTCUT: Omit<Shortcut, "id"> = {
  pinned: false,
  icon: "Globe" as IconMap,
  name: "",
  url: "",
  createdAt: Date.now(),
  description: "",
};

const sortPinned = (shortcuts: Shortcut[]): Shortcut[] => {
  return [...shortcuts].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return b.createdAt - a.createdAt;
    }
    return a.pinned ? -1 : 1;
  });
};

const AddEditDialogWrap: React.FC<DialogWrapperProps> = ({
  isOpen,
  onOpenChange,
  currentData,
  isEditing,
  updateShortcuts,
  setCurrentData,
  shortcuts,
}) => {
  useEffect(() => {
    if (!currentData && isOpen) {
      setCurrentData({
        ...DEFAULT_SHORTCUT,
        id: getUniqueID(),
        createdAt: Date.now(),
      });
    }
  }, [currentData, isOpen, setCurrentData]);

  if (!currentData) return null;

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (isEditing) {
      updateShortcuts(
        shortcuts.map((shortcut) =>
          shortcut.id === currentData.id ? currentData : shortcut
        )
      );
    } else {
      updateShortcuts([...shortcuts, currentData]);
    }
    setCurrentData(null);
    onOpenChange(false);
  };

  const handleInputChange =
    (field: keyof Shortcut) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentData({ ...currentData, [field]: e.target.value });
    };

  const validateForm = (): boolean => {
    return Boolean(
      currentData &&
        currentData.name &&
        currentData.url &&
        currentData.url.length < 1 &&
        currentData.name.length < 1 &&
        !isValidUrl(currentData.url)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Shortcut" : "Add New Shortcuts"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your shortcut details."
                : "Add a new shortcut to your list."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              defaultValue={currentData.name}
              onChange={handleInputChange("name")}
              placeholder="Enter shortcut name"
            />
            <Input
              defaultValue={currentData.url}
              onChange={handleInputChange("url")}
              placeholder="Enter shortcut URL"
            />
            <Input
              defaultValue={currentData.description}
              onChange={handleInputChange("description")}
              placeholder="Enter shortcut description"
            />
          </div>
          <DialogFooter>
            <Button>Save</Button>
            <DialogTrigger asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

const ShortcutsContent: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() =>
    sortPinned(fetchLocalData("shortcuts", []))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Shortcut | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredShortcuts, setFilteredShortcuts] = useState<
    Shortcut[] | null
  >();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter.length < 1) {
      setFilteredShortcuts(null);
    }
    const searchterm = filter.trim().toLowerCase();
    setFilteredShortcuts(
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

  const modify: shortcutModifyFunction = (id: string) => ({
    togglePin: () => {
      updateShortcuts(
        shortcuts.map((shortcut) =>
          shortcut.id === id
            ? { ...shortcut, pinned: !shortcut.pinned }
            : shortcut
        )
      );
    },
    edit: (currentData: Shortcut) => {
      setIsEditing(true);
      setCurrentData(currentData);
      setIsOpen(true);
    },
    remove: () => {
      updateShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
    },
  });

  return (
    <>
      <ContextMenuWrap
        className=" flex-1  w-full "
        items={createContextMenuItems(
          setIsEditing,
          setCurrentData,
          setIsOpen,
          setShortcuts,
          shortcuts
        )}
      >
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
        <div className="flex gap-2 flex-wrap">
          {(filteredShortcuts || shortcuts).map((shortcut) => (
            <ShortcutCard
              key={shortcut.id}
              shortcut={shortcut}
              modify={modify}
            />
          ))}
        </div>
      </ContextMenuWrap>
      <AddEditDialogWrap
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
