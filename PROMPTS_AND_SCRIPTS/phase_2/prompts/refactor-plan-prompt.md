# Refactoring Plan Generation Prompt

```
Based on the codebase analysis and requirements, please help me create a comprehensive step-by-step refactoring plan for this component.

## Component to Refactor
[PASTE THE COMPONENT CODE HERE]

## Codebase Analysis Summary
[PASTE RELEVANT SECTIONS FROM PHASE 1 ANALYSIS]

## Refactoring Requirements
[PASTE REQUIREMENTS FROM THE REQUIREMENTS FILE]

Please provide a detailed refactoring plan including:

1. **High-Level Approach**
   - Overall strategy for the refactoring
   - Major changes needed
   - Which patterns to apply

2. **Step-by-Step Plan**
   - Provide a sequenced list of specific changes to make
   - For each step, explain:
     - What to change
     - How to change it
     - Why this change is necessary
     - Any risks to be aware of

3. **New Structure**
   - Describe the desired end structure
   - Include any new files or components to create
   - Show the relationship between components

4. **Code Extraction**
   - Identify logic that should be extracted to utilities or hooks
   - Provide signatures for these extracted functions

5. **Dependencies**
   - List all dependencies the refactored component will have
   - Note any changes in how dependencies are used

6. **Type Definitions**
   - Provide TypeScript interfaces or types needed
   - Note how types should be improved

7. **Testing Considerations**
   - Highlight areas that might be risky during refactoring
   - Suggest verification steps for each major change

8. **Potential Challenges**
   - Identify any likely challenges in the refactoring
   - Suggest contingency plans or alternative approaches

Please make the plan detailed enough that I could follow it step-by-step to refactor the component while maintaining all functionality.
```