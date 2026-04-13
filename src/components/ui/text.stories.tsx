import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TextBody,
  TextEyebrow,
  TextHeading,
  TextLabel,
} from "./text";

const meta = {
  title: "UI/Text",
  component: TextHeading,
  args: {
    as: "h2" as const,
    children: "Heading",
  },
} satisfies Meta<typeof TextHeading>;

export default meta;

export const Scale: StoryObj = {
  name: "Typography scale",
  render: () => (
    <div className="max-w-prose space-y-4">
      <TextEyebrow>Recent entries</TextEyebrow>
      <TextHeading as="h1">Headline (h1)</TextHeading>
      <TextHeading as="h2">Section (h2)</TextHeading>
      <TextHeading as="h3">Subsection (h3)</TextHeading>
      <TextBody>
        Body copy with relaxed line height for comfortable reading in light and dark
        mode.
      </TextBody>
      <TextLabel>Label / meta text</TextLabel>
    </div>
  ),
};
