import { Shortcut, shortcutModifyFunction } from "@/types/shortcuts";

export function sortPinned(shortcuts: Shortcut[]): Shortcut[] {
  return [...shortcuts].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return b.createdAt - a.createdAt;
    }
    return a.pinned ? -1 : 1;
  });
}

export function useShortcutsModify(
  updateShortcuts: (newShortcuts: Shortcut[]) => void,
  shortcuts: Shortcut[],
  setIsEditing: (isEditing: boolean) => void,
  setCurrentData: (data: Shortcut) => void,
  setIsOpen: (isOpen: boolean) => void
): shortcutModifyFunction {
  return (id: string) => ({
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
}
