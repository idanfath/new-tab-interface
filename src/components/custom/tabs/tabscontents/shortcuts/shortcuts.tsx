/* eslint-disable react-hooks/exhaustive-deps */
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";
import { Shortcut, shortcutModifyFunction } from "@/types/tabstypes/shortcuts";
import ShortcutCard from "./shortcutcard";
import { useEffect, useState } from "react";
import { fetchLocalData, postLocalData } from "@/lib/utils";

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
    icon: "Globe",
    name: "Youtube",
    url: "https://youtube.com",
    createdAt: Date.now(),
  },
  {
    id: "example3",
    pinned: true,
    icon: "LayoutDashboard",
    name: "Example",
    url: "https://example.com",
    description: "An example shortcut.",
    createdAt: Date.now(),
  },
  {
    id: "example4",
    pinned: false,
    icon: "LayoutDashboard",
    name: "Example",
    url: "https://example.com",
    description: "An example shortcut.",
    createdAt: Date.now(),
  },
];

const sortPinned = (shortcuts: Shortcut[] | []) => {
  return [
    ...shortcuts.filter((shortcut) => shortcut.pinned),
    ...shortcuts.filter((shortcut) => !shortcut.pinned),
  ];
};

//   TODO: shits are done, now make add and edit. also make this simpler first
export default function ShortcutsContent() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(
    sortPinned(fetchLocalData("shortcuts", exampleShortcut))
  );

  const updateShortcuts = (newShortcut: Shortcut[]) => {
    setShortcuts(sortPinned(newShortcut));
  };

  useEffect(() => {
    postLocalData("shortcuts", shortcuts);
  }, [shortcuts]);

  const modify: shortcutModifyFunction = (id: string) => {
    const togglePin = () => {
      updateShortcuts(
        shortcuts.map((shortcut) =>
          shortcut.id === id
            ? { ...shortcut, pinned: !shortcut.pinned }
            : shortcut
        )
      );
    };
    const remove = () => {
      updateShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
    };
    return { togglePin, remove };
  };
  return (
    <ContextMenuWrap
      className="flex gap-2 flex-1 flex-wrap w-full"
      items={[{ children: "New Shortcut" }]}
    >
      {shortcuts.map((shortcut) => (
        <ShortcutCard key={shortcut.id} shortcut={shortcut} modify={modify} />
      ))}
    </ContextMenuWrap>
  );
}
