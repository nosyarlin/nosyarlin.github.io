import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Folder, Home, User } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";

function NavDemo({ appearance }: { appearance?: "default" | "minimal" }) {
  return (
    <div className="w-64 rounded-md border border-neutral-200 bg-surface-sidebar p-3 dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="flex flex-col gap-1">
        <SidebarNavItem to="/" appearance={appearance} icon={<Home className="h-4 w-4" />}>
          Home
        </SidebarNavItem>
        <SidebarNavItem
          to="/articles"
          active
          appearance={appearance}
          icon={<FileText className="h-4 w-4" />}
        >
          Articles
        </SidebarNavItem>
        <SidebarNavItem to="/projects" appearance={appearance} icon={<Folder className="h-4 w-4" />}>
          Projects
        </SidebarNavItem>
        <SidebarNavItem to="/about" appearance={appearance} icon={<User className="h-4 w-4" />}>
          About
        </SidebarNavItem>
      </nav>
    </div>
  );
}

const meta = {
  title: "UI/SidebarNavItem",
  component: SidebarNavItem,
} satisfies Meta<typeof SidebarNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    to: "/articles",
    active: true,
    children: "Articles",
    icon: <FileText className="h-4 w-4" />,
  },
};

export const Group: StoryObj = {
  name: "Navigation group",
  render: () => <NavDemo />,
};

export const MinimalRail: StoryObj = {
  name: "Minimal (app shell)",
  render: () => <NavDemo appearance="minimal" />,
};
