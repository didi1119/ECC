import { describe, expect, it } from "vitest";

import {
  expertScenarioCards,
  expertScenarioNavItems,
} from "../data";

describe("expert scenario data", () => {
  it("includes the new self-supervision scenario cards", () => {
    expect(expertScenarioCards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: "/scenarios/expert/reviewer-loop",
          title: "雙 Agent 評審迴圈",
        }),
        expect.objectContaining({
          href: "/scenarios/expert/autopilot-delivery",
          title: "不中斷交付模式",
        }),
        expect.objectContaining({
          href: "/scenarios/expert/self-qa-sprint",
          title: "自我驗收補漏衝刺",
        }),
        expect.objectContaining({
          href: "/scenarios/expert/repo-onboarding",
          title: "陌生 Repo 接手模式",
        }),
        expect.objectContaining({
          href: "/scenarios/expert/pr-final-sprint",
          title: "PR 前自動衝刺",
        }),
        expect.objectContaining({
          href: "/scenarios/expert/fail-until-pass",
          title: "失敗就重試到過線",
        }),
      ])
    );
  });

  it("exposes matching navbar items for the new scenarios", () => {
    expect(expertScenarioNavItems).toEqual(
      expect.arrayContaining([
        {
          href: "/scenarios/expert/reviewer-loop",
          label: "評審迴圈",
        },
        {
          href: "/scenarios/expert/autopilot-delivery",
          label: "不中斷交付",
        },
        {
          href: "/scenarios/expert/self-qa-sprint",
          label: "自我驗收",
        },
        {
          href: "/scenarios/expert/repo-onboarding",
          label: "接手陌生 Repo",
        },
        {
          href: "/scenarios/expert/pr-final-sprint",
          label: "PR 前衝刺",
        },
        {
          href: "/scenarios/expert/fail-until-pass",
          label: "重試到過線",
        },
      ])
    );
  });
});
