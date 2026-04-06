@AGENTS.md

## Superpowers Skills

This project uses [Superpowers](https://github.com/obra/superpowers) — a composable skill library for structured Claude Code development workflow.

### Installation

**Windows:**
```powershell
.\scripts\install-superpowers.ps1
```

**Mac / Linux:**
```bash
bash scripts/install-superpowers.sh
```

### Available Skills (invoke by name in conversation)

| Skill | Purpose |
|-------|---------|
| `superpowers:brainstorming` | 9-step Socratic design refinement before any implementation |
| `superpowers:writing-plans` | Break specs into 2-5 min TDD tasks with exact file paths |
| `superpowers:executing-plans` | Sequential plan execution with checkpoints |
| `superpowers:subagent-driven-development` | Fresh agent per task + 2-stage spec/quality review |
| `superpowers:dispatching-parallel-agents` | Concurrent independent subagent workflows |
| `superpowers:using-git-worktrees` | Isolated workspace per feature branch |
| `superpowers:finishing-a-development-branch` | Merge / PR / keep / discard workflow |
| `superpowers:test-driven-development` | RED-GREEN-REFACTOR cycle enforced |
| `superpowers:requesting-code-review` | Pre-review checklist against spec |
| `superpowers:receiving-code-review` | Systematic feedback handling |
| `superpowers:systematic-debugging` | 4-phase root cause analysis |
| `superpowers:verification-before-completion` | Confirm fixes are genuine |
| `superpowers:writing-skills` | Create new reusable skills |
| `superpowers:using-superpowers` | Introduction and system overview |

### The 7-Step Workflow

1. **Brainstorm** — design-first, spec written to `docs/superpowers/specs/`
2. **Git Worktree** — isolated branch workspace
3. **Write Plan** — tasks to `docs/superpowers/plans/`
4. **Subagent Dev** — dispatch fresh agent per task
5. **TDD** — RED-GREEN-REFACTOR per task
6. **Code Review** — 2-stage: spec compliance → code quality
7. **Finish Branch** — merge / PR / keep / discard
