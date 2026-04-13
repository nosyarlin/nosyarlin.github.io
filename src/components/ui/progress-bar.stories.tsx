import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./progress-bar";

const meta = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  args: {
    value: 60,
    max: 100,
    className: "max-w-md",
    barClassName: "bg-primary",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: { barClassName: "bg-secondary" },
};
export const Tertiary: Story = {
  args: { barClassName: "bg-tertiary" },
};
