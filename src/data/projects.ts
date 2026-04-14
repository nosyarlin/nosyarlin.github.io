export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  href?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "Jublia Email Scheduler Tool",
    description:
      "Built a tool using Celery and Flask for the customer success team to schedule emails to be sent in the future.",
    image: "/imgs/jublia.png",
    imageAlt: "Jublia email scheduler screenshot",
    tags: ["Python", "Flask", "Celery", "MySQL"],
  },
  {
    title: "Timetable Scheduler",
    description:
      "Designed and implemented a web application that generates school timetables using a genetic algorithm with resource availability constraints.",
    image: "/imgs/se7en.jpg",
    imageAlt: "Timetable scheduler interface",
    tags: ["NodeJS", "Python", "MySQL"],
    href: "https://youtu.be/LYNfFkF9f3Q",
  },
  {
    title: "Part-of-Speech Tagging",
    description:
      "Implemented Perceptron and Hidden Markov Models to perform part-of-speech tagging on tweets.",
    image: "/imgs/language.jpg",
    imageAlt: "Natural language processing project",
    tags: ["Machine Learning", "Python"],
    href: "https://github.com/nosyarlin/machine-learning-pos-tagging",
  },
  {
    title: "Happiness Map of Singapore",
    description:
      "Conducted a study on happiness by location in Singapore using emojis from tweets and Instagram posts.",
    image: "/imgs/makingmaps.png",
    imageAlt: "Map visualization of happiness in Singapore",
    tags: ["R", "Shiny", "Plotly"],
    href: "https://raysonljk.shinyapps.io/happiness-map/",
  },
  {
    title: "ISTD Showcase Voting System",
    description:
      "Built a voting system where students and professors can vote for projects using their student or employee card.",
    image: "/imgs/virk.jpg",
    imageAlt: "Voting system project",
    tags: ["PHP", "MySQL", "Android"],
    href: "https://github.com/nosyarlin/voting-system",
  },
  {
    title: "Cyber Attack Detection",
    description:
      "Built a statistical model to detect cyber attacks in a computer-controlled water distribution system.",
    image: "/imgs/data.jpg",
    imageAlt: "Data science cyber attack detection project",
    tags: ["R", "Python", "Data Science"],
    href: "https://github.com/nosyarlin/cyber-attack-detection",
  },
];
