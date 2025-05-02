# Test Plan Generation Prompt

```
Based on the codebase analysis and the component I need to refactor, please help me create a comprehensive test plan to ensure the refactoring preserves all functionality.

## Component to Refactor
[PASTE THE COMPONENT CODE HERE]

## Codebase Analysis Summary
[PASTE RELEVANT SECTIONS FROM PHASE 1 ANALYSIS]

## Refactoring Requirements
[PASTE REQUIREMENTS FROM THE REQUIREMENTS FILE]

Please create a detailed test plan including:

1. **Test Approach**
   - Which testing frameworks and tools to use
   - How to structure the tests
   - How to handle dependencies and mocking

2. **Functionality to Test**
   - List all behaviors and features that need to be verified
   - Identify edge cases and error states to test
   - Note any performance characteristics to measure

3. **Test Cases**
   - Provide specific test cases with:
     - Test name/description
     - Preconditions
     - Steps to execute
     - Expected results
     - Potential points of failure

4. **Testing Utilities**
   - Suggest any helper functions or utilities needed for testing
   - Provide mock implementations if needed

5. **Test Implementation**
   - Generate a sample test file with the most critical test cases implemented

Please be as specific as possible about what needs to be tested to ensure the refactored component maintains all functionality of the original.
```