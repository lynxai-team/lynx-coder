# lynx-coder

## Mission
Lynx IA coding agents — specialized AI agents for code coordination, planning, review, documentation, and testing workflows within the Agent Smith framework.

## Structure

| Directory | Purpose |
|-----------|---------|
| `dist/agents/` | 18 YAML agent definitions: coordinator (`lx.yml`), coder (`lx-coder.yml`), planner, reviewer, doc, test, search, colab, manager, and workers |
| `dist/skills/` | Skill definitions: create-or-edit-code, task-planning, task-success-evaluation |
| `dist/actions/` | Executable actions: `goshell.js` (shell execution), `run-npm-command.js` (npm commands) |
| `dist/fragments/` | Context fragments: agents-manager, workspace, ctx-helper-files (injected into agent prompts) |

## Conventions
- **YAML agent definitions**: All agents defined as `.yml` files with prompt templates, model config, and feature declarations
- **Coordinator pattern**: `lx.yml` orchestrates workflow by delegating to specialized agents via `run-agent` tool
- **Skill-based actions**: Agents use `load-skill` tool to access task-specific instructions
- **Context fragments**: YAML agents reference markdown fragments via `{file:...}` syntax for dynamic context injection
- **NPM package**: Published as `lynx-coder` with `dist/` containing all feature files discovered at runtime by `@agent-smith/core`
- **Worker agents**: `wagent.yml` and `worker-shell.yml` handle shell/command execution

## Quick Start for AI Agents
1. Read `.agents/documentation/codebase-summary.md` for technical summary
2. Explore key files listed in codebase-summary.md
3. Use `run-agent` tool with agent names from `dist/agents/` (e.g., `lx` for coordinator)

## Documentation
- `.agents/documentation/codebase-summary.md` — Technical summary of this repo
- `../../AGENTS.md` — Project-wide context and conventions (workspace root)
