[![npm package](https://img.shields.io/npm/v/lynx-coder)](https://www.npmjs.com/package/lynx-coder)

# Lynx Coder

A collection of Lynx AI coding agents, skills, and actions for the [Agent Smith](https://github.com/lynxai-team/agent-smith) toolkit — provides a multi-agent coding team with coordinator, planner, reviewer, and specialist agents.

## ✨ Features

- 🤖 **16 specialized agents** — Coordinator, coder, planner, reviewer, doc writer, tester, searcher, manager, and worker agents
- 🧠 **Coordinator pattern** — `lx.yml` delegates tasks to specialized agents via the `run-agent` tool
- 🤝 **Collaborator pattern** — `lx-colab.yml` and `lx-ts-colab.yml` use `run-collaborator` to fork independent agent instances
- 🏗️ **Worker pattern** — `wagent.yml` delegates long-running tasks to worker agents (`worker-shell.yml`)
- 📚 **3 reusable skills** — `create-or-edit-code`, `task-planning`, and `task-success-evaluation` for structured workflows
- 🔧 **Custom actions** — npm command execution with path authorization and shell sanitization
- 📝 **Context fragments** — Dynamic context injection via `{file:...}` syntax for workspace awareness

## 📦 Installation

```bash
npm install -g lynx-coder
```

## 🚀 Quick Start

### Using the Coordinator Agent

The easiest way to use Lynx Coder is through the coordinator agent `lx`. It orchestrates a team of specialized agents to handle complex development tasks:

```bash
# Create a REST API with Express and TypeScript
lm lx "Create a REST API with Express and TypeScript" --workspace /workspace/my-project
```

The coordinator will load skills, delegate planning to `lx-planner`, assign implementation to `lx-coder` or `lx-ts`, request review from `lx-review`, and report results back.

### Using a Specialist Agent Directly

You can also invoke specialist agents directly for focused tasks:

```bash
# Create a utility file
lm lx-coder "Create a new file src/utils.ts with utility functions" --workspace /workspace/my-project

# Generate documentation
lm lx-doc "Write API documentation for the project" --workspace /workspace/my-project

# Review code
lm lx-review "Review the code in src/ for potential issues" --workspace /workspace/my-project

# Plan a task
lm lx-planner "Break down building a React app with authentication into steps" --workspace /workspace/my-project
```

## 📖 Usage

### Available Agents

| Agent | Model | Description |
|-------|-------|-------------|
| **lx** | qwen35b | Coordinator — orchestrates the coding team |
| **lx-ts** | qwen35b | TypeScript coordinator with npm support |
| **lx-coder** | qwen80b | General-purpose coding agent (create/edit files) |
| **lx-coder-ts** | qwen80b | TypeScript-focused coding agent with npm commands |
| **lx-planner** | qwen35b | Task decomposition & planning |
| **lx-review** | qwen35b | Adversarial code reviewer (tools: rshell, readfile) |
| **lx-doc** | qwen35b | Documentation generation agent |
| **lx-test** | qwen35b | Test execution & debugging agent |
| **lx-search** | qwen35b | Web search & page reading agent |
| **lx-manager** | qwen35b | Task management & success evaluation |
| **lx-project** | qwen35b | Project-level coordination |
| **lx-colab** | qwen35b | Collaborator mode (run-collaborator) |
| **lx-ts-colab** | qwen35b | TypeScript collaborator |
| **lxa** | qwen35b | General-purpose agent |
| **wagent** | qwen4b | Test agent with worker delegation |
| **worker-shell** | qwen4b | Shell operations worker (read, write, search) |

### Skills

#### `create-or-edit-code`
Structured workflow for code implementation:
1. Check for execution plan (call `lx-planner` if missing)
2. Execute steps one at a time with verification
3. Request code review from `lx-review`
4. Evaluate success criteria and report

#### `task-planning`
Task decomposition workflow:
1. Analyze task and determine goals
2. Call `lx-planner` for execution plan
3. Define success criteria
4. Write goals to `.agents/tasks/[task-name]/state.md`

#### `task-success-evaluation`
Task completion assessment:
1. Read goals from `.agents/tasks/[task-name]/state.md`
2. Review the implemented code
3. Evaluate against success criteria
4. Provide evaluation report

### Context Fragments

Agents reference these markdown fragments for dynamic context injection:

| Fragment | Purpose |
|----------|---------|
| `workspace.md` | Workspace path and Linux environment instructions |
| `ctx-helper-files.md` | Project context helper file locations |
| `agents-manager.md` | List of available sub-agents (general) |
| `agents-manager-ts.md` | List of available sub-agents (TypeScript-focused) |

### Custom Action: `run-npm-command`

Execute npm commands safely within the workspace. Pipe characters (`|`), shell operators (`&`, `;`), and output redirection (`2>`) are sanitized — this runs npm directly, not through a shell interpreter.

## 📁 Project Structure

```
lynx-coder/
├── dist/
│   ├── agents/              # 16 YAML agent definitions
│   │   ├── lx.yml           # Main coordinator (qwen35b)
│   │   ├── lx-ts.yml        # TypeScript coordinator (qwen35b)
│   │   ├── lx-coder.yml     # Coding agent (qwen80b)
│   │   ├── lx-coder-ts.yml  # TypeScript coding agent (qwen80b)
│   │   ├── lx-planner.yml   # Planning agent (qwen35b)
│   │   ├── lx-review.yml    # Code review agent (qwen35b)
│   │   ├── lx-colab.yml     # Collaborator agent (qwen35b)
│   │   ├── lx-ts-colab.yml  # TypeScript collaborator (qwen35b)
│   │   ├── wagent.yml       # Test agent with workers (qwen4b)
│   │   └── ...              # Other agents
│   ├── skills/              # 3 skill definitions
│   │   ├── create-or-edit-code/SKILL.md
│   │   ├── task-planning/SKILL.md
│   │   └── task-success-evaluation/SKILL.md
│   ├── actions/             # Custom tool actions
│   │   └── run-npm-command.js
│   ├── fragments/           # Context helper markdown files
│   │   ├── workspace.md
│   │   ├── ctx-helper-files.md
│   │   ├── agents-manager.md
│   │   └── agents-manager-ts.md
│   └── utils.js             # Path parsing utilities
├── package.json
└── README.md
```

## 📝 License

MIT

---

*Part of the [Agent Smith](https://github.com/lynxai-team/agent-smith) toolkit — a TypeScript framework for building local-first AI agents.*
