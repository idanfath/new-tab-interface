import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

interface ContextMenuItemProps {
  props?: React.ComponentPropsWithoutRef<typeof ContextMenuItem>;
  children: React.ReactNode;
}

export default function ContextMenuWrap({
  children,
  items,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  items?: ContextMenuItemProps[];
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn(className)}>
        {children}
      </ContextMenuTrigger>
      {items && (
        <ContextMenuContent>
          {items.map((item, index) => (
            <ContextMenuItem {...item.props} key={index}>
              {item.children}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
}
