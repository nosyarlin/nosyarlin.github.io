import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import type { PostMeta } from "@/types/post";
import { ArticleCard } from "./article-card";

const sample: PostMeta = {
  title: "The Architecture of Silence: Why Modern Spaces Need to Breathe.",
  slug: "architecture-of-silence",
  date: "2024-03-12",
  excerpt:
    "Quiet structure shapes how we think. Here is a short reflection on negative space.",
  tags: ["Design", "Minimalism"],
  readMinutes: 6,
};

const sampleWithCover: PostMeta = {
  ...sample,
  cover: "https://picsum.photos/seed/rayson/800/500",
};

const meta = {
  title: "UI/ArticleCard",
  component: ArticleCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: { post: sample, layout: "vertical" },
};

export const Horizontal: Story = {
  args: { post: sampleWithCover, layout: "horizontal" },
};
