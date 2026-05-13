# InferAll VS Code Rebrand Audit

This document is the roadmap for fully rebranding this Cline fork to InferAll. It is intentionally a checklist, not a plan — items will be addressed across multiple incremental PRs. Step 1 (this PR) only changes the highest-visibility user-facing strings, because command-id/view-id renames break user keybindings and warrant their own focused PR.

Issue: `kindlyrobotics/inferall.ai#5` — decided: **commit** to the fork.

## Branding tokens in the wild

The fork inherits four overlapping branding namespaces:

- **`Cline`** — display name, marketing copy, walkthrough headings
- **`cline.*`** — command ids (`cline.plusButtonClicked`, `cline.addToChat`, etc.)
- **`claude-dev`** — sidebar view container id, sidebar view id, marketplace slug heritage
- **`cline-icon` / `cline-ai-review` / `cline.isDevMode` / `cline.isGeneratingCommit`** — icon font names, comment controller ids, custom context keys

## 1. User-facing strings (this PR — step 1)

These are the high-visibility items being rebranded NOW:

- [x] `package.json` `displayName` — already "InferAll AI", confirm
- [x] `package.json` `description` — rewrite to lead with InferAll positioning (Anthropic-compat, free 100k tokens)
- [x] `package.json` `contributes.viewsContainers.activitybar[0].title` — currently `"Cline"`, change to `"InferAll"`
- [x] `package.json` `contributes.walkthroughs[0].title` — currently `"Meet Cline, your new coding partner"`
- [x] `package.json` `contributes.walkthroughs[0].description`
- [x] `package.json` `contributes.walkthroughs[0].steps[*].title|description` — five steps, each references "Cline"
- [x] `package.json` `contributes.configuration.title` — currently `"Cline"`
- [x] `walkthrough/step1.md` through `step5.md` — body copy references Cline throughout
- [x] `README.md` — full top-section rewrite leading with InferAll positioning; keep upstream Cline attribution at bottom

## 2. Command ids, view ids, context keys (FUTURE PR — step 2)

These are intentionally NOT touched in this PR because changing them breaks user keybindings and saved workspace state. They will need a migration story (likely keep old ids as deprecated aliases for one minor version).

- `cline.plusButtonClicked`, `cline.mcpButtonClicked`, `cline.historyButtonClicked`, `cline.accountButtonClicked`, `cline.settingsButtonClicked`
- `cline.dev.createTestTasks`, `cline.dev.expireMcpOAuthTokens`
- `cline.addToChat`, `cline.addTerminalOutputToChat`
- `cline.focusChatInput`
- `cline.generateGitCommitMessage`, `cline.abortGitCommitMessage`
- `cline.explainCode`, `cline.improveCode`
- `cline.jupyterGenerateCell`, `cline.jupyterExplainCell`, `cline.jupyterImproveCell`
- `cline.openWalkthrough`, `cline.reconstructTaskHistory`
- `cline.reviewComment.reply`, `cline.reviewComment.addToChat`
- View container id `claude-dev-ActivityBar`
- Sidebar view id `claude-dev.SidebarProvider`
- Icon font `cline-icon`
- Comment controller `cline-ai-review`
- Context keys `cline.isDevMode`, `cline.isGeneratingCommit`
- Command `category` strings (`"Cline"`)
- ~~Walkthrough id `ClineWalkthrough`~~ (renamed to `InferAllWalkthrough` in step 1c — license compliance)
- ~~All `cline.addToChat` titles ("Add to Cline")~~ (command **titles** rewritten in step 1c — license compliance; `command` ids and `category` strings remain deferred)

## 3. Walkthrough rewrite (FUTURE PR — step 3)

This PR replaces the headline references to Cline in the walkthrough markdown, but the walkthrough's underlying story is still upstream Cline's positioning ("Bring your own API key"). InferAll's value prop is the opposite — zero-setup, key included. A from-scratch walkthrough that reflects InferAll's positioning is a follow-up:

- Step 1 should be "Sign in once, start coding" (no API key)
- Step 3's "Always Use the Best Models" should pivot to "Anthropic-compatible — works with Claude Code flows"
- New step on `inferall.auditLog.enabled` (govtech-targeted)
- Step 5 already aligns ("Full Visibility & Control") — minor tweaks

## 4. Marketplace listing copy (FUTURE PR — step 4)

When publishing to Marketplace:
- Marketplace short description (separate from `package.json` description)
- Marketplace category positioning
- Screenshots / GIFs in the listing
- Banner/hero image (currently still references Cline assets)

## 5. On-prem / audit log implementation (FUTURE PR — step 5)

The setting `inferall.auditLog.enabled` is scaffolded in this PR with no implementation. Real work:
- Wire writer that logs request/response metadata (NOT bodies) to a local rotating file
- Configurable log path
- Documented schema
- Hook into the existing gateway-call path

## 6. Things that stay (do NOT change)

- **`LICENSE`** — Apache-2.0; attribution to upstream Cline copyright stays
- Upstream README attribution block at the bottom of `README.md`
- The Cline copyright/license headers in source files
- The `cline/` proto namespace and `.clinerules/` developer docs — these are internal-facing, do not surface to users, and renaming would create a huge proto/codegen churn for zero user benefit. Track separately.
- `CHANGELOG.md` historical entries
- Test fixtures referencing upstream commit messages / behavior

## License/attribution check

`LICENSE` is Apache-2.0. Apache-2.0 only requires that the license itself, copyright notices in source files, and any existing NOTICE file be preserved. The current `LICENSE` file is the unmodified Apache 2.0 text, and source-file headers continue to credit upstream. The bottom of the new `README.md` retains explicit Cline-fork attribution.

**Step 1d update (license review, `kindlyrobotics/inferall.ai#9`):** A `NOTICE` file has been added at the repo root to satisfy Apache 2.0 §4(b) (modification notice), §4(d) (NOTICE inclusion if applicable), and §6 (no implied endorsement / no use of the licensor's marks). The README now carries a top-level "Acknowledgments" pointer to `NOTICE` and the License footer was rewritten to avoid implying that Cline Bot Inc. distributes this fork.
