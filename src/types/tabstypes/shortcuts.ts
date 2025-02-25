import { iconMap } from "@/consts/shortcuts";

export type IconMap = keyof typeof iconMap;
export interface Shortcut {
    id: string;
    pinned: boolean;
    icon: IconMap;
    name: string;
    url: string;
    description?: string;
    createdAt: number;
}
export interface ShortcutCardProps {
    shortcut: Shortcut;
    onPin: (id: string) => void;
    onEdit: (shortcut: Shortcut) => void;
    onDelete: (id: string) => void;
    onClick: (url: string) => void;
}
export type shortcutModifyFunction = (id: string) => {
    togglePin: () => void;
    remove: () => void;
    edit: (currentData: Shortcut) => void;
};
