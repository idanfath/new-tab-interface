import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DEFAULT_SHORTCUT } from "@/consts/shortcuts";
import { getUniqueID, isValidUrl } from "@/lib/utils";
import { DialogWrapperProps, Shortcut } from "@/types/tabstypes/shortcuts";
import { useEffect } from "react";

export default function AddEditDialogWrap({
  isOpen,
  onOpenChange,
  currentData,
  isEditing,
  updateShortcuts,
  setCurrentData,
  shortcuts,
}: DialogWrapperProps) {
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
    console.log(validateForm());
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
        currentData.url.length > 0 &&
        currentData.name.length > 0 &&
        isValidUrl(currentData.url)
    );
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
          <Button onClick={() => handleSubmit()}>Save</Button>
          <DialogTrigger asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
