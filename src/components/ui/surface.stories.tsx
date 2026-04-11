import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "./surface";

const meta = {
  title: "UI/Surface",
  component: Surface,
  args: {
    children: "Surface content",
    className: "max-w-md",
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = { args: { variant: "muted" } };
export const Elevated: Story = { args: { variant: "elevated" } };
