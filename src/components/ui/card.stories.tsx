import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardBody } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <p className="font-medium text-neutral-900 dark:text-neutral-50">Card title</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Supporting text for the card body.
        </p>
      </CardBody>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: "max-w-md" } };
