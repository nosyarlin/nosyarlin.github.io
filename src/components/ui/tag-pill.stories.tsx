import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagPill } from "./tag-pill";

const meta = {
  title: "UI/TagPill",
  component: TagPill,
  args: {
    children: "Technology",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "primary", "secondary", "tertiary"],
    },
  },
} satisfies Meta<typeof TagPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary", children: "Design" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Product" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Shipped" },
};

export const AllTones: StoryObj = {
  name: "All tones",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TagPill variant="neutral">Technology</TagPill>
      <TagPill variant="primary">Design</TagPill>
      <TagPill variant="secondary">Productivity</TagPill>
      <TagPill variant="tertiary">Philosophy</TagPill>
    </div>
  ),
};
