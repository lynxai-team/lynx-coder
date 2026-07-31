# lynx-coder

## Summary
Collection of Lynx IA coding agents, skills, and actions for the Agent Smith framework — provides a multi-agent coding team with coordinator, planner, reviewer, and specialist agents.

## Dependencies
- **Internal**: `@agent-smith/core` (^0.0.11) — runtime for agent execution, feature discovery, and tool integration
- **External**: `ansi-colors` (^4.1.3) — ANSI terminal color formatting for CLI output
- **External**: `@boxlite-ai/boxlite` (^0.9.5) — runtime dependency for agent execution

## Used By
- End users — Interact with Lynx coding agents via Agent Smith CLI (`lm`) or server
- AI coding agents — Use lynx-coder agents (e.g., `lx.yml` coordinator) for coordinated coding tasks

## Entry Point
- `dist/agents/*.yml` — 18 YAML agent definitions loaded as features by @agent-smith/core
- `dist/skills/*` — Skill definitions loaded via `load-skill` tool
- `dist/actions/run-npm-command.js` — Action for executing npm commands within workspace
- `dist/actions/goshell.js` — Shell execution action with path authorization and sanitization
- `dist/utils.js` — Utility functions (e.g., path parsing for file operations)

## Key Files
| File | Purpose |
|------|---------|
| `dist/agents/lx.yml` | Main coordinator (qwen35b) — orchestrates coding team via `run-agent` |
| `dist/agents/lx-ts.yml` | TypeScript coordinator (qwen35b) with npm support |
| `dist/agents/lx-coder.yml` | General coding agent (qwen80b) for file creation/editing |
| `dist/agents/lx-coder-ts.yml` | TypeScript-focused coding agent (qwen80b) with npm commands |
| `dist/agents/lx-planner.yml` | Task decomposition & planning agent (qwen35b) |
| `dist/agents/lx-review.yml` | Adversarial code reviewer (qwen35b) with rshell/readfile tools |
| `dist/agents/lx-doc.yml` | Documentation generation agent (qwen35b) |
| `dist/agents/lx-test.yml` | Test execution & debugging agent (qwen35b) |
| `dist/agents/lx-search.yml` | Web search & page reading agent (qwen35b) |
| `dist/agents/lx-colab.yml` | Collaborator mode agent using `run-collaborator` (qwen35b) |
| `dist/agents/lx-ts-colab.yml` | TypeScript collaborator agent (qwen35b) |
| `dist/agents/lx-manager.yml` | Task management & success evaluation agent (qwen35b) |
| `dist/agents/lx-project.yml` | Project-level coordination agent (qwen35b) |
| `dist/agents/lxa.yml` | General-purpose agent (qwen35b) |
| `dist/agents/lx-assistant.yml` | Assistant agent (qwen35b) |
| `dist/agents/lxgo.yml` | Go-language agent (qwen35b) |
| `dist/agents/wagent.yml` | Test agent with worker delegation (qwen4b) |
| `dist/agents/worker-shell.yml` | Shell operations worker (qwen4b) |
| `dist/skills/create-or-edit-code/SKILL.md` | Structured workflow for code implementation |
| `dist/skills/task-planning/SKILL.md` | Task decomposition workflow |
| `dist/skills/task-success-evaluation/SKILL.md` | Task completion assessment |
| `dist/fragments/workspace.md` | Workspace path and Linux environment instructions |
| `dist/fragments/ctx-helper-files.md` | Project context helper file locations |
| `dist/fragments/agents-manager.md` | List of available sub-agents (general) |
| `dist/fragments/agents-manager-ts.md` | List of available sub-agents (TypeScript-focused) |
| `dist/actions/run-npm-command.js` | Safe npm command execution with pipe/shell sanitization |
| `dist/actions/goshell.js` | Shell execution action |
| `dist/utils.js` | Path parsing utilities for workspace operations |

## Architecture
- **Coordinator Pattern**: `lx.yml` orchestrates workflow by delegating to specialized agents via `run-agent` tool; `lx-colab.yml` uses `run-collaborator` to fork independent agent instances; agents use different models (qwen35b for coordination/review, qwen80b for coding, qwen4b for workers)
- **Skill-Based Actions**: Agents use `load-skill` tool to access task-specific instructions (create-or-edit-code, task-planning, task-success-evaluation)
- **Context Fragments**: YAML agents reference markdown fragments for dynamic context injection via `{file:...}` syntax for workspace awareness
- **NPM Package**: Published as `lynx-coder` with `dist/` containing all feature files discovered at runtime by `@agent-smith/core`

## Related
- See `agent-smith/packages/core` — runtime that discovers and executes lynx-coder agents
- See `agent-smith-plugins` — similar plugin structure with YAML agents and skills
- See `.agents/documentation/project-nav.md` — navigation map including lynx-coder agents
