# Plan: Cheatsheet Full Commands Coverage

## Summary
目前速查表只涵蓋 23 個指令，但 ECC 共有 72 個指令。此計畫將速查表擴展至涵蓋全部指令，並新增三個分類：學習系統（Learning）、語言支援（Language）、工具整合（Tools）。同時移除不存在的 `update-config` 指令，修正 `loop` 對應到 `loop-start`。

## User Story
As a 學習 ECC 的開發者,
I want 一個涵蓋所有 72 個指令的速查表,
So that 我不會錯過任何功能，且能在需要時快速查閱。

## Problem → Solution
速查表只有 23/72 個指令 → 涵蓋全部 72 個，新增 3 個分類

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: 8 個新/修改檔案

---

## 現有指令分類（需擴充）

### 現有 5 個分類保留，各新增指令：

| 分類 | 現有 | 新增 | 合計 |
|------|------|------|------|
| planning | plan, multi-plan, prp-plan, prp-implement, prp-commit | prp-prd, prp-pr, prompt-optimize | 8 |
| development | tdd, build-fix, verify, docs, checkpoint | quality-gate, test-coverage, update-docs, model-route | 9 |
| quality | code-review, security-review, refactor-clean, e2e | harness-audit | 5 |
| automation | loop, orchestrate, save-session, resume-session | loop-status, sessions, aside, multi-backend, multi-frontend, multi-workflow | 10 |
| advanced | multi-execute, devfleet, context-budget, update-codemaps | skill-create, skill-health, rules-distill, gan-build, gan-design (移除 update-config) | 9 |

### 新增 3 個分類：

| 分類 | 指令 | 數量 |
|------|------|------|
| learning | learn, learn-eval, evolve, prune, promote, projects, instinct-export, instinct-import, instinct-status | 9 |
| language | cpp-build, cpp-review, cpp-test, go-build, go-review, go-test, rust-build, rust-review, rust-test, kotlin-build, kotlin-review, kotlin-test, flutter-build, flutter-review, flutter-test, python-review, gradle-build | 17 |
| tools | jira, pm2, setup-pm | 3 |

**總計：8 + 9 + 5 + 10 + 9 + 9 + 17 + 3 = 70 個（另有 2 個純 legacy shim 略過：claw, eval）**

---

## Files to Change

| File | Action | Justification |
|------|--------|---------------|
| `app/cheatsheet/data/types.ts` | UPDATE | 新增 "learning" \| "language" \| "tools" 到 CommandCategory，更新 CATEGORIES 陣列 |
| `app/cheatsheet/data/commands-planning.ts` | UPDATE | 新增 prp-prd, prp-pr, prompt-optimize |
| `app/cheatsheet/data/commands-development.ts` | UPDATE | 新增 quality-gate, test-coverage, update-docs, model-route |
| `app/cheatsheet/data/commands-quality.ts` | UPDATE | 新增 harness-audit |
| `app/cheatsheet/data/commands-automation.ts` | UPDATE | 新增 loop-status, sessions, aside, multi-backend, multi-frontend, multi-workflow；修正 loop→loop-start |
| `app/cheatsheet/data/commands-advanced.ts` | UPDATE | 移除 update-config，新增 skill-create, skill-health, rules-distill, gan-build, gan-design |
| `app/cheatsheet/data/commands-learning.ts` | CREATE | 9 個學習系統指令 |
| `app/cheatsheet/data/commands-language.ts` | CREATE | 17 個語言支援指令 |
| `app/cheatsheet/data/commands-tools.ts` | CREATE | jira, pm2, setup-pm |
| `app/cheatsheet/data/index.ts` | UPDATE | 加入新 import |

## NOT Building
- `claw`（pure legacy shim，指向 nanoclaw-repl skill）
- `eval`（pure legacy shim，指向 eval-harness skill）
- `santa-loop`（節日彩蛋，非一般用途）
- 各語言指令的詳細 ChatDemo 對話（語言類指令用統一模板，省去重複工作）

---

## Step-by-Step Tasks

### Task 1: 更新 types.ts（新增分類）
- **ACTION**: 在 CommandCategory 加入 "learning" | "language" | "tools"
- **IMPLEMENT**: 在 CATEGORIES 陣列新增 3 個分類物件，含 id/label/emoji/color
- **VALIDATE**: `npx tsc --noEmit` 無錯誤

### Task 2: 更新 commands-planning.ts（+3 指令）
- **ACTION**: 新增 prp-prd, prp-pr, prompt-optimize
- **IMPLEMENT**: 每個指令含 slug/name/emoji/category/shortDesc/whatItDoes/whenToUse/promptExample/claudeMessages/pitfalls/relatedSlugs
- **VALIDATE**: 資料結構符合 CommandData 介面

### Task 3: 更新 commands-development.ts（+4 指令）
- **ACTION**: 新增 quality-gate, test-coverage, update-docs, model-route
- **VALIDATE**: 型別正確

### Task 4: 更新 commands-quality.ts（+1 指令）
- **ACTION**: 新增 harness-audit
- **VALIDATE**: 型別正確

### Task 5: 更新 commands-automation.ts（+6 指令，修正 loop）
- **ACTION**: 新增 loop-status, sessions, aside, multi-backend, multi-frontend, multi-workflow
- **GOTCHA**: loop 的 slug 應為 "loop-start"，promptExample 用 `/loop 5m npm test`（用戶習慣）
- **VALIDATE**: 型別正確

### Task 6: 更新 commands-advanced.ts（移除 update-config，+5 指令）
- **ACTION**: 移除 update-config（不存在），新增 skill-create, skill-health, rules-distill, gan-build, gan-design
- **VALIDATE**: 型別正確

### Task 7: 建立 commands-learning.ts
- **ACTION**: 建立 9 個學習系統指令（learn, learn-eval, evolve, prune, promote, projects, instinct-export, instinct-import, instinct-status）
- **IMPLEMENT**: category: "learning"

### Task 8: 建立 commands-language.ts
- **ACTION**: 建立 17 個語言支援指令，每種語言 3 個（build/review/test）+ python-review + gradle-build
- **IMPLEMENT**: category: "language"；使用語言圖示（🦀 Rust, 🐹 Go, ➕ C++, 🍃 Kotlin, 🦋 Flutter, 🐍 Python, 🐘 Gradle）

### Task 9: 建立 commands-tools.ts
- **ACTION**: 建立 jira, pm2, setup-pm
- **IMPLEMENT**: category: "tools"

### Task 10: 更新 index.ts
- **ACTION**: 新增 3 個新檔案的 import，加入 ALL_COMMANDS
- **VALIDATE**: `npm run build` 成功，所有 slug 頁面正常生成

---

## Validation Commands

```bash
npx tsc --noEmit        # 零型別錯誤
npm test -- --run       # 76+ 測試通過
npm run build           # 70 個指令詳細頁靜態生成
```

## Acceptance Criteria
- [ ] ALL_COMMANDS.length === 70
- [ ] 所有新分類顯示在索引頁篩選列
- [ ] 每個 slug 對應詳細頁可正常訪問（非 404）
- [ ] TypeScript 無錯誤
- [ ] 測試無迴歸
