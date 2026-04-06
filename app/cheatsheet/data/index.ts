export { planningCommands } from "./commands-planning";
export { developmentCommands } from "./commands-development";
export { qualityCommands } from "./commands-quality";
export { automationCommands } from "./commands-automation";
export { advancedCommands } from "./commands-advanced";
export { learningCommands } from "./commands-learning";
export { languageCommands } from "./commands-language";
export { toolsCommands } from "./commands-tools";
export { CATEGORIES } from "./types";
export type { CommandData, CommandCategory, Pitfall, ChatMessage, CategoryInfo } from "./types";

import { planningCommands } from "./commands-planning";
import { developmentCommands } from "./commands-development";
import { qualityCommands } from "./commands-quality";
import { automationCommands } from "./commands-automation";
import { advancedCommands } from "./commands-advanced";
import { learningCommands } from "./commands-learning";
import { languageCommands } from "./commands-language";
import { toolsCommands } from "./commands-tools";
import type { CommandData } from "./types";

export const ALL_COMMANDS: CommandData[] = [
  ...planningCommands,
  ...developmentCommands,
  ...qualityCommands,
  ...automationCommands,
  ...advancedCommands,
  ...learningCommands,
  ...languageCommands,
  ...toolsCommands,
];

export const COMMANDS_BY_SLUG: Record<string, CommandData> = Object.fromEntries(
  ALL_COMMANDS.map((cmd) => [cmd.slug, cmd])
);
