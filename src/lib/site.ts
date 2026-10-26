export const SITE = {
  name: "Rayson Lim",
  tagline: "Portfolio & writing",
  description:
    "Portfolio and blog of Rayson Lim, a full-stack software engineer documenting side projects, programming languages, and lessons learned along the way.",
  author: "Rayson Lim",
  links: {
    github: "https://github.com/nosyarlin",
    linkedin: "https://www.linkedin.com/in/rayson-lim/",
  },
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home", end: true },
  { href: "/articles", label: "Articles", end: false },
  { href: "/projects", label: "Projects", end: false },
  { href: "/about", label: "About", end: false },
] as const;

/** Mirrors React Router's NavLink matching: `end` requires an exact match. */
export function isNavActive(pathname: string, href: string, end: boolean) {
  const path = pathname.replace(/\.html$/, "").replace(/\/+$/, "") || "/";
  if (end || href === "/") return path === href;
  return path === href || path.startsWith(`${href}/`);
}
