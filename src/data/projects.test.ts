import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";

function isWebp(path: string) {
  return path.toLowerCase().endsWith(".webp");
}

describe("PROJECTS image metadata", () => {
  it("requires a non-webp fallback when primary image is webp", () => {
    const invalid = PROJECTS.filter(
      (project) =>
        isWebp(project.image) &&
        (!project.imageFallback || isWebp(project.imageFallback)),
    );

    expect(invalid).toEqual([]);
  });
});
