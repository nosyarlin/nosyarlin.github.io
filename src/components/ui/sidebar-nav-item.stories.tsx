import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Folder, Home, User } from "lucide-react";
import { MemoryRouter } from "react-router-dom";
import { SidebarNavItem } from "./sidebar-nav-item";

function NavDemo() {
  return (
    <div className="w-64 rounded-md border border-neutral-200 bg-surface-sidebar p-3 dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="flex flex-col gap-1">
        <SidebarNavItem to="/" end icon={<Home className="h-4 w-4" />}>
          Home
        </SidebarNavItem>
        <SidebarNavItem to="/articles" icon={<FileText className="h-4 w-4" />}>
          Articles
        </SidebarNavItem>
        <SidebarNavItem to="/projects" icon={<Folder className="h-4 w-4" />}>
          Projects
        </SidebarNavItem>
        <SidebarNavItem to="/about" icon={<User className="h-4 w-4" />}>
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
    children: "Articles",
    icon: <FileText className="h-4 w-4" />,
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/articles"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Group: StoryObj = {
  name: "Navigation group",
  render: () => (
    <MemoryRouter initialEntries={["/articles"]}>
      <NavDemo />
    </MemoryRouter>
  ),
};

function NavDemoMinimal() {
  return (
    <div className="w-64 rounded-md border border-neutral-200 bg-surface-sidebar p-3 dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="flex flex-col gap-1">
        <SidebarNavItem to="/" end appearance="minimal" icon={<Home className="h-4 w-4" />}>
          Home
        </SidebarNavItem>
        <SidebarNavItem to="/articles" appearance="minimal" icon={<FileText className="h-4 w-4" />}>
          Articles
        </SidebarNavItem>
        <SidebarNavItem to="/projects" appearance="minimal" icon={<Folder className="h-4 w-4" />}>
          Projects
        </SidebarNavItem>
        <SidebarNavItem to="/about" appearance="minimal" icon={<User className="h-4 w-4" />}>
          About
        </SidebarNavItem>
      </nav>
    </div>
  );
}

export const MinimalRail: StoryObj = {
  name: "Minimal (app shell)",
  render: () => (
    <MemoryRouter initialEntries={["/articles"]}>
      <NavDemoMinimal />
    </MemoryRouter>
  ),
};
