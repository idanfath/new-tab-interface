/* eslint-disable @typescript-eslint/no-explicit-any */
import ShinyText from "@/components/ReactBits/ShinyText";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Edit, ExternalLink, Trash } from "lucide-react";

function getLocalItem(key: string, defaultValue: any) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

export default function SideBar() {
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [links, setLinks] = useState<{ name: string; url: string }[]>(
    getLocalItem("sidebar-links", "[]")
  );
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = [...links, { name: newName, url: newUrl }];
    setLinks(newLink);
    localStorage.setItem("sidebar-links", JSON.stringify(newLink));
  };
  const deleteLink = (index: number) => {
    const newLink = links.filter((_, i) => i !== index);
    setLinks(newLink);
    localStorage.setItem("sidebar-links", JSON.stringify(newLink));
  };
  const editLink = (index: number) => {
    const newLink = links.map((item, i) => {
      if (i === index) {
        return { name: newName, url: newUrl };
      }
      return item;
    });
    setLinks(newLink);
    localStorage.setItem("sidebar-links", JSON.stringify(newLink));
  };
  return (
    <>
      <div className="absolute left-2 space-y-2">
        {links.map((link, index) => (
          <div className="sidebar-item" key={index}>
            <Dialog
              onOpenChange={(isOpen) => {
                if (isOpen) {
                  setNewName(link.name);
                  setNewUrl(link.url);
                } else {
                  setNewName("");
                  setNewUrl("");
                }
              }}
            >
              {/*  */}
              <ContextMenu>
                <ContextMenuTrigger>
                  <div
                    key={index}
                    onClick={() => window.open(link.url, "_self")}
                  >
                    <ShinyText text={link.name} speed={6} />
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => window.open(link.url, "_self")}
                  >
                    <ExternalLink size={16} className="mr-1.5" />
                    Open
                  </ContextMenuItem>
                  <DialogTrigger className="w-full ">
                    <ContextMenuItem className="cursor-pointer">
                      <Edit size={16} className="mr-1.5" />
                      Edit
                    </ContextMenuItem>
                  </DialogTrigger>
                  <ContextMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteLink(index)}
                  >
                    <Trash size={16} className="mr-1.5" />
                    Hapus
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
              {/*  */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit a Sidebar Shortcut</DialogTitle>
                  <DialogDescription>
                    Edit the name and URL of the shortcut.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
                <DialogFooter>
                  <Button
                    onClick={() => {
                      editLink(index);
                      document
                        .getElementById("sidebar-edit-dialog-close")
                        ?.click();
                    }}
                    disabled={
                      !newName ||
                      !newUrl ||
                      !newUrl.match(
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/
                      )
                    }
                  >
                    Edit
                  </Button>
                  <DialogTrigger asChild id="sidebar-edit-dialog-close">
                    <Button type="button" variant={"outline"}>
                      Cancel
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}

        <Dialog
          onOpenChange={() => {
            setNewName("");
            setNewUrl("");
          }}
        >
          <DialogTrigger className="sidebar-item ">
            <ShinyText text={"+"} speed={6} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sidebar Shortcut</DialogTitle>
              <DialogDescription>
                Add a new shortcut to the sidebar.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              placeholder="URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <DialogFooter>
              <Button
                onClick={(e) => {
                  submit(e);
                  document.getElementById("sidebar-add-dialog-close")?.click();
                }}
                disabled={
                  !newName ||
                  !newUrl ||
                  !newUrl.match(
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/
                  )
                }
              >
                Add
              </Button>
              <DialogTrigger asChild id="sidebar-add-dialog-close">
                <Button type="button" variant={"outline"}>
                  Cancel
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
