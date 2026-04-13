import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectCard } from "./project-card";

const meta = {
  title: "UI/ProjectCard",
  component: ProjectCard,
  args: {
    title: "Timetable Scheduler",
    description:
      "A web app that generates school timetables using a genetic algorithm.",
    image: "https://picsum.photos/seed/project/640/360",
    imageAlt: "",
    tags: ["NodeJS", "Python", "MySQL"],
    href: "https://github.com",
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoLink: Story = {
  args: { href: undefined },
};
