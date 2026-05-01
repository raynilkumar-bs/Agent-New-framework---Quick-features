import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/app/components/ui/menubar";

const meta: Meta = {
  title: "UI/Menubar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [showRatings, setShowRatings] = useState(true);
    const [showDates, setShowDates] = useState(true);
    const [platform, setPlatform] = useState("all");

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Report <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Export Data <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Print <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Select All <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Bulk Actions</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Mark All Responded</MenubarItem>
                <MenubarItem>Archive Selected</MenubarItem>
                <MenubarItem className="text-destructive">
                  Delete Selected
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Columns</MenubarLabel>
            <MenubarCheckboxItem
              checked={showRatings}
              onCheckedChange={setShowRatings}
            >
              Star Ratings
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showDates}
              onCheckedChange={setShowDates}
            >
              Review Dates
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>Platform Filter</MenubarLabel>
            <MenubarRadioGroup value={platform} onValueChange={setPlatform}>
              <MenubarRadioItem value="all">All Platforms</MenubarRadioItem>
              <MenubarRadioItem value="google">Google</MenubarRadioItem>
              <MenubarRadioItem value="yelp">Yelp</MenubarRadioItem>
              <MenubarRadioItem value="facebook">Facebook</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Documentation</MenubarItem>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Contact Support</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
