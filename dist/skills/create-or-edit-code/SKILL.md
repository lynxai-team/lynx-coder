---
name: create-or-edit-code
description: use this to create or edit code
---

Your workflow for code:

1. Check if an execution plan exists. If not call lx-planner to make a plan
2. Manage the plan execution one step after the other:
  - Call a lx-coder instance for the first step
  - Verify the success criterias for step 1
  - Mark the step 1 done if the success criterias are met, otherwise iterate until it's ok
  - Call a lx-coder instance for the next step
  - Verify the success criterias for step 2
  - Mark the step 2 done if success success criterias are met, otherwise iterate until it's ok
  - Repeat until all steps are completed
3. Call lx-review to get a code review
3. Evaluate the success criterias of the task
4. Report to the user

Always instruct your agents to read the task first to get the context, provide them with file paths