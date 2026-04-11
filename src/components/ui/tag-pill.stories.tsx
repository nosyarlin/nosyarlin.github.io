import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagPill } from "./tag-pill";

const meta = {
  title: "UI/TagPill",
  component: TagPill,
  args: {
    children: "Technology",
  },
} satisfies Meta<typeof TagPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
