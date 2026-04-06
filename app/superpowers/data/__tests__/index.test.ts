import { describe, it, expect } from "vitest";
import { ALL_SKILLS, SKILLS_BY_SLUG, SKILLS_BY_PHASE } from "../index";

describe("ALL_SKILLS", () => {
  it("contains exactly 14 skills", () => {
    expect(ALL_SKILLS.length).toBe(14);
  });

  it("each skill has required fields", () => {
    for (const skill of ALL_SKILLS) {
      expect(skill.slug, `${skill.slug} missing slug`).toBeTruthy();
      expect(skill.name, `${skill.slug} missing name`).toBeTruthy();
      expect(skill.displayName, `${skill.slug} missing displayName`).toBeTruthy();
      expect(skill.phase, `${skill.slug} missing phase`).toBeTruthy();
      expect(skill.color, `${skill.slug} missing color`).toBeTruthy();
      expect(skill.emoji, `${skill.slug} missing emoji`).toBeTruthy();
      expect(skill.shortDesc, `${skill.slug} missing shortDesc`).toBeTruthy();
    }
  });

  it("skill names follow superpowers:<slug> pattern", () => {
    for (const skill of ALL_SKILLS) {
      expect(skill.name).toBe(`superpowers:${skill.slug}`);
    }
  });

  it("all slugs are unique", () => {
    const slugs = ALL_SKILLS.map((s) => s.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(ALL_SKILLS.length);
  });
});

describe("SKILLS_BY_SLUG", () => {
  it("contains an entry for every skill", () => {
    for (const skill of ALL_SKILLS) {
      expect(SKILLS_BY_SLUG[skill.slug]).toBeDefined();
    }
  });

  it("returns the correct skill for a known slug", () => {
    expect(SKILLS_BY_SLUG["brainstorming"].displayName).toBe("Brainstorming");
    expect(SKILLS_BY_SLUG["test-driven-development"].displayName).toBe("Test-Driven Development");
    expect(SKILLS_BY_SLUG["systematic-debugging"].displayName).toBe("Systematic Debugging");
  });

  it("returns undefined for an unknown slug", () => {
    expect(SKILLS_BY_SLUG["does-not-exist"]).toBeUndefined();
  });
});

describe("SKILLS_BY_PHASE", () => {
  it("returns planning skills", () => {
    const planning = SKILLS_BY_PHASE["planning"];
    expect(planning.length).toBeGreaterThanOrEqual(3);
    expect(planning.every((s) => s.phase === "planning")).toBe(true);
  });

  it("returns development skills", () => {
    const dev = SKILLS_BY_PHASE["development"];
    expect(dev.length).toBeGreaterThanOrEqual(2);
    expect(dev.every((s) => s.phase === "development")).toBe(true);
  });

  it("returns quality skills", () => {
    const quality = SKILLS_BY_PHASE["quality"];
    expect(quality.length).toBeGreaterThanOrEqual(3);
    expect(quality.every((s) => s.phase === "quality")).toBe(true);
  });

  it("all phases together cover all 14 skills", () => {
    const phases = ["planning", "development", "git", "quality", "debugging", "meta"] as const;
    const total = phases.reduce((sum, p) => sum + SKILLS_BY_PHASE[p].length, 0);
    expect(total).toBe(14);
  });
});
