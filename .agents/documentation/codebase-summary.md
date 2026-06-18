# lynx-coder

## Summary
Collection of Lynx AI coding agents, skills, and actions for the Agent Smith framework — provides specialized agents for code coordination, planning, review, and testing workflows.

## Dependencies
- `@agent-smith/core` — runtime for agent execution and feature discovery

## Used By
- End users — Interact with Lynx coding agents via Agent Smith CLI or server
- AI coding agents — Use lynx-coder agents (lx.yml coordinator) for coordinated coding tasks

## Entry Point
- `dist/agents/*.yml` — 21 YAML agent definitions loaded as features by @agent-smith/core
- `dist/skills/*` — Skill definitions loaded via `load-skill` tool
- `dist/actions/run-npm-command.js` — Action for npm command execution

## Key Files
| File | Purpose |
|------|---------|
| `dist/agents/lx.yml` | Coordinator agent — delegates tasks to specialized agents (coder, planner, reviewer) |
| `dist/agents/lx-coder.yml` | TypeScript-focused coding agent |
| `dist/agents/lx-planner.yml` | Task planning and decomposition agent |
| `dist/agents/lx-review.yml` | Code review agent |
| `dist/agents/lx-doc.yml` | Documentation generation agent |
| `dist/agents/lx-test.yml` | Test generation agent |
| `dist/skills/create-or-edit-code` | Skill for creating/editing code files |
| `dist/skills/task-planning` | Skill for breaking down complex tasks |
| `dist/skills/task-success-evaluation` | Skill for evaluating task completion |
| `dist/fragments/agents-manager-ts.md` | TypeScript agent manager context fragment |
| `dist/fragments/workspace.md` | Workspace context fragment |

## Architecture
- **Coordinator Pattern**: `lx.yml` orchestrates workflow by delegating to specialized agents via `run-agent` tool
- **Skill-Based Actions**: Agents use `load-skill` tool to access task-specific instructions (create-or-edit-code, task-planning)
- **Context Fragments**: YAML agents reference markdown fragments for dynamic context injection (`{file:...}` syntax)
- **NPM Package**: Published as `lynx-coder` with `dist/` containing all feature files discovered at runtime

## Related
- See `agent-smith/packages/core` — runtime that discovers and executes lynx-coder agents
- See `agent-smith-plugins` — similar plugin structure with YAML agents and skills
- See `.agents/documentation/project-nav.md` — navigation map including lynx-coder agents

## Documentation
| Resource | Path |
|----------|------|
| Root codebase summary | `/workspace/.agents/documentation/codebase-summary.md` |
| Navigation map | `/workspace/.agents/documentation/project-nav.md` |