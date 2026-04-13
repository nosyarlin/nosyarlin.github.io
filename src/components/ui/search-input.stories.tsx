import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";

const meta = {
  title: "UI/SearchInput",
  component: SearchInput,
  args: {
    placeholder: "Search articles…",
    leftIcon: <Search className="h-4 w-4" />,
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
