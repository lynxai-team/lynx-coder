# Lynx Coder

A collection of Lynx AI coding agents, skills, and actions for the [Agent Smith](https://github.com/lynxai-team/agent-smith) framework — provides specialized agents for code coordination, planning, review, and testing workflows.

## 📋 Overview

Lynx Coder is a plugin package that extends Agent Smith with a **multi-agent coding team**. It implements a coordinator pattern where a lead agent (`lx.yml`) orchestrates specialized sub-agents to handle different aspects of software development — from task planning and code implementation to review and documentation.

## ✨ Features

- 🤖 **16 specialized agents** — Coordinators, coders, planners, reviewers, doc writers, testers, searchers, managers, and workers
- 🧠 **Coordinator pattern** — `lx.yml` delegates tasks to specialized agents via the `run-agent` tool
- 🤝 **Collaborator pattern** — `lx-colab.yml` and `lx-ts-colab.yml` use `run-collaborator` to fork independent agent instances
- 🧪 **Worker pattern** — `wagent.yml` delegates long-running tasks to worker agents (`worker-shell.yml`)
- 📚 **3 reusable skills** — `create-or-edit-code`, `task-planning`, and `task-success-evaluation` for structured workflows
- 🔧 **Custom actions** — npm command execution with path authorization and shell sanitization
- 📝 **Context fragments** — Dynamic context injection via `{file:...}` syntax for workspace awareness
- 🐧 **Linux-compatible** — Designed for Linux filesystems with `/workspace` as the default operating directory

## 🏗️ Architecture

### Agent Hierarchy

```
lx.yml (Coordinator)
 ├── lx-planner      → Task decomposition & planning
 ├── lx-coder        → Code implementation (create/edit files)
 ├── lx-coder-ts     → TypeScript-focused coding (qwen80b)
 ├── lx-ts           → TypeScript coordinator with npm support
 ├── lx-review       → Adversarial code review (limited tools: rshell, readfile)
 ├── lx-doc          → Documentation generation
 ├── lx-test         → Test execution & debugging
 ├── lx-search       → Web search & page reading
 ├── lx-manager      → Task management & success evaluation
 ├── lx-project      → Project-level coordination
 ├── lx-colab        → Collaborator mode (run-collaborator tool)
 ├── lx-ts-colab     → TypeScript collaborator (run-collaborator tool)
 └── lxa             → General-purpose agent

Worker Pattern:
wagent.yml (Test agent)
 └── worker-shell  → Shell operations (read, write, search files)
```

### How It Works

1. **Feature Discovery**: YAML agent definitions in `dist/agents/` are scanned and registered by `@agent-smith/core` at runtime
2. **Coordinator Delegation**: The lead agent (`lx.yml`) receives user requests, loads skills, and delegates to specialized agents using the `run-agent` tool
3. **Skill-Based Workflows**: Agents use the `load-skill` tool to access step-by-step instructions for specific tasks
4. **Context Injection**: Agents reference markdown fragments (workspace info, helper files) via `{file:...}` syntax
5. **Collaborator Mode**: `lx-colab.yml` and `lx-ts-colab.yml` can fork independent agent instances using `run-collaborator`
6. **Worker Delegation**: `wagent.yml` offloads long-running tasks to workers (`worker-shell`) to preserve context

### Agent Types

| Type | Description | Example |
|------|-------------|---------|
| **Coordinator** | Orchestrates workflow, delegates to specialists | `lx.yml`, `lx-ts.yml` |
| **Specialist** | Focused on a single domain (coding, review, docs) | `lx-coder.yml`, `lx-review.yml` |
| **Collaborator** | Forked agent with independent execution | `lx-colab.yml`, `lx-ts-colab.yml` |
| **Worker** | Lightweight agent for specific operations | `worker-shell.yml` |
| **Test Agent** | Uses workers for long-running tasks | `wagent.yml` |

### Backend Configuration

Some agents have explicit backend requirements:

| Backend | Agents |
|---------|--------|
| `llamacpp_colin` | `lx-coder`, `lx-coder-ts`, `lx-planner`, `lx-review`, `lx-doc`, `lx-test` |
| Default (configurable) | `lx.yml`, `lx-ts`, `lx-manager`, `lx-project`, `lx-colab`, `lx-ts-colab`, `lxa` |
| Default (configurable) | `wagent`, `worker-shell` |

> **Note**: Some agent YAML files contain a typo in the backend name (`llamaccp` instead of `llamacpp_colin`) for `lx-colab`, `lx-search`, and `lx-ts-colab`. These may need correction when configuring your environment.

## 📦 Installation

```bash
npm install lynx-coder
```

### Dependencies

- `@agent-smith/core` — Runtime engine for feature discovery and agent execution
- `ansi-colors` — Terminal output formatting
- `marked-terminal` — Markdown rendering in terminal

## 🚀 Quick Start

### Using the Coordinator Agent

The easiest way to use Lynx Coder is through the coordinator agent `lx`. It orchestrates a team of specialized agents to handle complex development tasks:

```bash
# Create a REST API with Express and TypeScript
lm lx "Create a REST API with Express and TypeScript" --workspace /workspace/my-project
```

The coordinator will:
1. Load the `create-or-edit-code` skill
2. Delegate planning to `lx-planner`
3. Assign implementation to `lx-coder` or `lx-ts`
4. Request review from `lx-review`
5. Report results back to you

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

### Multiple Usage Examples

Here are several practical examples to get you started:

```bash
# Create a Python script to display the n prime numbers
lm lx "Create a Python script to display the n prime numbers" --workspace /workspace/my-project

# Build a full-stack application
lm lx-ts "Build a Node.js backend with TypeScript and connect it to a PostgreSQL database" --workspace /workspace/my-project

# Refactor existing code
lm lx-coder "Refactor the src/auth module to use JWT tokens instead of session-based auth" --workspace /workspace/my-project

# Write unit tests
lm lx-test "Write comprehensive unit tests for the user authentication module" --workspace /workspace/my-project

# Search for solutions
lm lx-search "Find best practices for handling file uploads in Express.js" --workspace /workspace/my-project

# Manage project tasks
lm lx-manager "Evaluate the current project status and suggest next steps" --workspace /workspace/my-project

# Create a React component
lm lx-coder "Create a React TypeScript component for a user profile card with avatar, name, and bio fields" --workspace /workspace/my-project

# Generate unit tests for an API endpoint
lm lx-test "Write unit tests for the user CRUD API endpoints using Jest and Supertest" --workspace /workspace/my-project

# Review and improve code quality
lm lx-review "Review src/services/ for security vulnerabilities and performance issues" --workspace /workspace/my-project

# Plan a complex feature
lm lx-planner "Break down implementing real-time chat with WebSocket into actionable steps" --workspace /workspace/my-project

# Generate project documentation
lm lx-doc "Create comprehensive README with setup instructions, API docs, and contribution guidelines" --workspace /workspace/my-project
```

### Using the TypeScript Coordinator

For TypeScript-focused projects, use `lx-ts` which includes npm command support:

```bash
# Build a TypeScript project with npm integration
lm lx-ts "Create a TypeScript CLI tool with proper package.json and build scripts" --workspace /workspace/my-project
```

### Collaboration Mode

Use collaborator agents for independent parallel work:

```bash
# Fork an independent agent instance
lm lx-colab "Implement the user registration endpoint with input validation" --workspace /workspace/my-project
```

## 📖 Usage

### Available Agents

| Agent | File | Description | Model | Backend |
|-------|------|-------------|-------|---------|
| **lx** | `lx.yml` | Coordinator — orchestrates the team | qwen35b | default |
| **lx-ts** | `lx-ts.yml` | TypeScript coordinator with npm support | qwen35b | default |
| **lx-coder** | `lx-coder.yml` | General-purpose coding agent | qwen80b | llamacpp_colin |
| **lx-coder-ts** | `lx-coder-ts.yml` | TypeScript-focused coding agent | qwen80b | llamacpp_colin |
| **lx-planner** | `lx-planner.yml` | Task decomposition & planning | qwen35b | llamacpp_colin |
| **lx-review** | `lx-review.yml` | Adversarial code reviewer | qwen35b | llamacpp_colin |
| **lx-doc** | `lx-doc.yml` | Documentation generator | qwen35b | llamacpp_colin |
| **lx-test** | `lx-test.yml` | Test runner & debugger | qwen35b | llamacpp_colin |
| **lx-search** | `lx-search.yml` | Web search agent | qwen35b | default |
| **lx-manager** | `lx-manager.yml` | Task management & success metrics | qwen35b | default |
| **lx-project** | `lx-project.yml` | Project-level coordination | qwen35b | default |
| **lx-colab** | `lx-colab.yml` | Collaborator mode (run-collaborator) | qwen35b | default |
| **lx-ts-colab** | `lx-ts-colab.yml` | TypeScript collaborator | qwen35b | default |
| **lxa** | `lxa.yml` | General-purpose agent | qwen35b | default |
| **wagent** | `wagent.yml` | Test agent with workers | qwen4b | default |
| **worker-shell** | `worker-shell.yml` | Shell operations worker | qwen4b | default |

### Skills

#### `create-or-edit-code`
Structured workflow for code implementation:
1. Check for execution plan (call `lx-planner` if missing)
2. Execute steps one at a time with verification:
   - Call `lx-coder` for the current step
   - Verify success criteria
   - Mark step done or iterate until complete
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

Agents reference these markdown fragments for context:

| Fragment | Purpose |
|----------|---------|
| `workspace.md` | Workspace path and Linux environment instructions |
| `ctx-helper-files.md` | Project context helper file locations |
| `agents-manager.md` | List of available sub-agents (general) |
| `agents-manager-ts.md` | List of available sub-agents (TypeScript-focused) |

### Custom Action: `run-npm-command`

Execute npm commands safely within the workspace:

```javascript
// Tool specification (auto-discovered from dist/actions/run-npm-command.js)
{
  name: "run-npm-command",
  description: "Run an npm command inside the workspace",
  arguments: {
    arguments: { required: true, description: "npm command args (e.g., 'test', 'run build')" },
    path: { required: false, description: "Working directory (defaults to /workspace)" }
  }
}
```

**Security**: Pipe characters (`|`), shell operators (`&`, `;`), and output redirection (`2>`) are sanitized — this runs npm directly, not through a shell interpreter.

## 🔧 Configuration

### Inference Parameters

Agents use configurable inference parameters. Common settings:

```yaml
inferParams:
    min_p: 0
    top_k: 20
    top_p: 0.85
    temperature: 0.6        # Lower = more deterministic (review uses 0.2)
    repetition_penalty: 1
    chat_template_kwargs:
        enable_thinking: true
        preserve_thinking: true
```

### Model Recommendations

| Agent Type | Recommended Model | Rationale |
|------------|-------------------|-----------|
| Coordinator agents | qwen35b | Balanced reasoning and delegation |
| Coding agents (coder, coder-ts) | qwen80b | Strong code generation capabilities |
| Reviewer | qwen35b (temp: 0.2) | Deterministic analysis with low temperature |
| Worker agents | qwen4b | Lightweight for simple shell operations |

## 📁 Project Structure

```
lynx-coder/
├── dist/
│   ├── agents/              # 16 YAML agent definitions
│   │   ├── lx.yml           # Main coordinator
│   │   ├── lx-ts.yml        # TypeScript coordinator
│   │   ├── lx-coder.yml     # Coding agent
│   │   ├── lx-coder-ts.yml  # TypeScript coding agent
│   │   ├── lx-planner.yml   # Planning agent
│   │   ├── lx-review.yml    # Code review agent
│   │   ├── lx-colab.yml     # Collaborator agent
│   │   ├── lx-ts-colab.yml  # TypeScript collaborator
│   │   ├── wagent.yml       # Test agent with workers
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

## 🔗 Integration with Agent Smith

Lynx Coder integrates with the Agent Smith framework:

- **Feature Discovery**: YAML files in `dist/agents/` are auto-discovered by `@agent-smith/core`
- **Tool Access**: Agents have access to standard tools (`readfile`, `writetofile`, `edit-search-replace`, `shell`, `python`) plus agent-specific tools (`run-agent`, `load-skill`, `run-npm-command`, `run-collaborator`)
- **Variable Substitution**: `{prompt}` and `{file:...}` syntax for dynamic content injection
- **SQLite Registration**: All features are registered in Agent Smith's SQLite database at runtime

## 📝 License

MIT

---

*Part of the [Agent Smith](https://github.com/lynxai-team/agent-smith) toolkit — a TypeScript framework for building local-first AI agents.*
