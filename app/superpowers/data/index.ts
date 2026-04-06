import type { SkillPhase } from "./types";
import { brainstorming, writingPlans, executingPlans } from "./skills-planning";
import {
  subagentDrivenDevelopment,
  dispatchingParallelAgents,
} from "./skills-development";
import { usingGitWorktrees, finishingBranch } from "./skills-git";
import {
  testDrivenDevelopment,
  requestingCodeReview,
  receivingCodeReview,
} from "./skills-quality";
import {
  systematicDebugging,
  verificationBeforeCompletion,
} from "./skills-debugging";
import { writingSkills, usingSuperpowers } from "./skills-meta";

export type { SkillData, SkillPhase, PhaseInfo, SkillStep, SkillChatMessage } from "./types";
export { PHASES } from "./types";

export const ALL_SKILLS = [
  brainstorming,
  writingPlans,
  executingPlans,
  subagentDrivenDevelopment,
  dispatchingParallelAgents,
  usingGitWorktrees,
  finishingBranch,
  testDrivenDevelopment,
  requestingCodeReview,
  receivingCodeReview,
  systematicDebugging,
  verificationBeforeCompletion,
  writingSkills,
  usingSuperpowers,
] as const;

export const SKILLS_BY_SLUG = Object.fromEntries(
  ALL_SKILLS.map((s) => [s.slug, s])
) as Record<string, (typeof ALL_SKILLS)[number]>;

export const SKILLS_BY_PHASE: Record<SkillPhase, (typeof ALL_SKILLS)[number][]> = {
  planning: ALL_SKILLS.filter((s) => s.phase === "planning"),
  development: ALL_SKILLS.filter((s) => s.phase === "development"),
  git: ALL_SKILLS.filter((s) => s.phase === "git"),
  quality: ALL_SKILLS.filter((s) => s.phase === "quality"),
  debugging: ALL_SKILLS.filter((s) => s.phase === "debugging"),
  meta: ALL_SKILLS.filter((s) => s.phase === "meta"),
};
