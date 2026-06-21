# lynx-coder

## Summary
Collection of Lynx IA coding agents, skills, and actions for the Agent Smith framework — provides specialized agents for code coordination, planning, review, documentation, and testing workflows.

## Dependencies
- **Internal**: `@agent-smith/core` — runtime for agent execution, feature discovery, and tool integration
- **External**: `ansi-colors` — ANSI terminal color formatting for CLI output
- **External**: `marked-terminal` — Markdown-to-terminal rendering for displaying content in consoles

## Used By
- End users — Interact with Lynx coding agents via Agent Smith CLI or server
- AI coding agents — Use lynx-coder agents (e.g., `lx.yml` coordinator) for coordinated coding tasks

## Entry Point
- `dist/agents/*.yml` — 16 YAML agent definitions loaded as features by @agent-smith/core
- `dist/skills/*` — Skill definitions loaded via `load-skill` tool
- `dist/actions/run-npm-command.js` — Action for executing npm commands within workspace
- `dist/utils.js` — Utility functions (e.g., path parsing for file operations)

## Key Files
| File | Purpose |
|------|---------|
| `dist/agents/lx.yml` | Coordinator agent — delegates tasks to specialized agents (coder, planner, reviewer) |
| `dist/agents/lx-coder.yml` | General coding agent for file creation and editing |
| `dist/agents/lx-coder-ts.yml` | TypeScript-focused coding agent with strict type handling |
| `dist/agents/lx-planner.yml` | Task planning and decomposition agent |
| `dist/agents/lx-review.yml` | Code review agent |
| `dist/agents/lx-doc.yml` | Documentation generation agent |
| `dist/agents/lx-test.yml` | Test generation agent |
| `dist/agents/lx-search.yml` | Code search and exploration agent |
| `dist/agents/lx-colab.yml` | Collaborative coding agent |
| `dist/agents/lx-ts-colab.yml` | TypeScript collaborative coding agent |
| `dist/agents/lx-manager.yml` | Agent manager/orchestrator |
| `dist/agents/lx-project.yml` | Project-level coordination agent |
| `dist/agents/wagent.yml` | Worker agent for shell/command execution |
| `dist/agents/worker-shell.yml` | Shell command worker agent |
| `dist/skills/create-or-edit-code/SKILL.md` | Skill for creating/editing code files |
| `dist/skills/task-planning/SKILL.md` | Skill for breaking down complex tasks |
| `dist/skills/task-success-evaluation/SKILL.md` | Skill for evaluating task completion criteria |
| `dist/fragments/agents-manager-ts.md` | TypeScript agent manager context fragment |
| `dist/fragments/agents-manager.md` | General agent manager context fragment |
| `dist/fragments/workspace.md` | Workspace context fragment |
| `dist/fragments/ctx-helper-files.md` | Context helper files reference |
| `dist/actions/run-npm-command.js` | NPM command execution action |
| `dist/utils.js` | Path parsing utilities for workspace operations |

## Architecture
- **Coordinator Pattern**: `lx.yml` orchestrates workflow by delegating to specialized agents via `run-agent` tool
- **Skill-Based Actions**: Agents use `load-skill` tool to access task-specific instructions (create-or-edit-code, task-planning)
- **Context Fragments**: YAML agents reference markdown fragments for dynamic context injection (`{file:...}` syntax)
- **NPM Package**: Published as `lynx-coder` with `dist/` containing all feature files discovered at runtime

## Related Modules
- See `agent-smith/packages/core` — runtime that discovers and executes lynx-coder agents
- See `agent-smith-plugins` — similar plugin structure with YAML agents and skills
- See `.agents/documentation/project-nav.md` — navigation map including lynx-coder agents
