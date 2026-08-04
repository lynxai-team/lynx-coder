# lynx-coder

## Mission
Collection of Lynx IA coding agents, skills, and actions for the Agent Smith framework — provides a multi-agent coding team with coordinator, planner, reviewer, and specialist agents.

## Structure

| Directory | Purpose |
|-----------|---------|
| `dist/agents/` | 22 YAML agent definitions: coordinator (`lx.yml`), TypeScript coordinator (`lx-ts.yml`), coders (`lx-coder.yml`, `lx-coder-ts.yml`), planner, reviewer, doc, test, search, collaborators, manager, and workers |
| `dist/skills/create-or-edit-code/` | Code implementation workflow skill |
| `dist/skills/task-planning/` | Task decomposition workflow skill |
| `dist/skills/task-success-evaluation/` | Task completion assessment skill |
| `dist/actions/run-npm-command.js` | Safe npm command execution with pipe/shell sanitization |
| `dist/fragments/` | Context fragments: `agents-manager.md`, `agents-manager-ts.md`, `workspace.md`, `ctx-helper-files.md` (injected into agent prompts via `{file:...}` syntax) |
| `dist/utils.js` | Utility functions for path parsing and workspace operations |
| `src/` | Source TypeScript code (if any) |

## Conventions (for AI Agents)
- **YAML agent definitions**: All agents defined as `.yml` files with prompt templates, model config, and feature declarations
- **Coordinator pattern**: `lx.yml` orchestrates workflow by delegating to specialized agents via `run-agent` tool; `lx-colab.yml` uses `run-collaborator` to fork independent agent instances
- **Skill-based actions**: Agents use `load-skill` tool to access task-specific instructions (create-or-edit-code, task-planning, task-success-evaluation)
- **Context fragments**: YAML agents reference markdown fragments via `{file:...}` syntax for dynamic context injection
- **NPM package**: Published as `lynx-coder` with `dist/` containing all feature files discovered at runtime by `@agent-smith/core`
- **Model selection**: Different agents use different models — qwen35b for coordination/review, qwen80b for coding, qwen4b for workers

## Quick Start for AI Agents
1. Read `.agents/documentation/codebase-summary.md` for technical summary
2. Explore key files listed in codebase-summary.md
3. Use `run-agent` tool with agent names from `dist/agents/` (e.g., `lx` for coordinator, `lx-coder` for coding)

## Documentation
- `.agents/documentation/codebase-summary.md` — Structured technical summary (7-section format)
- `../../AGENTS.md` — Project-wide context, conventions, and documentation map (workspace root)
