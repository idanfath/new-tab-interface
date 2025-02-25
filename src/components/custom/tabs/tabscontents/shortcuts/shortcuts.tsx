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
import { fetchLocalData, getUniqueID, postLocalData } from "@/lib/utils";
import ShortcutCard from "./shortcutcard";

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

  const isFormValid = (data: Shortcut): boolean => {
    return Boolean(data.name.trim() && data.url.trim());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid(currentData)) {
              handleSubmit();
            }
          }}
        >
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
        </form>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
          <DialogTrigger asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
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

  const updateShortcuts = (newShortcuts: Shortcut[]) => {
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
        className="flex gap-2 flex-1 flex-wrap w-full "
        items={[
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
        ]}
      >
        {shortcuts.map((shortcut) => (
          <ShortcutCard key={shortcut.id} shortcut={shortcut} modify={modify} />
        ))}
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
