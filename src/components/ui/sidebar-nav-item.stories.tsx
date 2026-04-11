import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Folder, Home, User } from "lucide-react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SidebarNavItem } from "./sidebar-nav-item";

function NavDemo() {
  return (
    <div className="w-64 rounded-2xl border border-neutral-200 bg-surface-sidebar p-3 dark:border-neutral-800 dark:bg-neutral-900">
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
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/articles"]}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SidebarNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    to: "/articles",
    children: "Articles",
    icon: <FileText className="h-4 w-4" />,
  },
};

export const Group: StoryObj = {
  name: "Navigation group",
  render: () => (
    <MemoryRouter initialEntries={["/articles"]}>
      <Routes>
        <Route path="*" element={<NavDemo />} />
      </Routes>
    </MemoryRouter>
  ),
};
