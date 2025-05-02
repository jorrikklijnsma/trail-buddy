# Documentation Generation Prompt

```
Please create comprehensive documentation for the refactored component to help future developers understand it.

## Refactored Component
[PASTE REFACTORED COMPONENT CODE HERE]

## Related Components/Utilities
[PASTE RELEVANT COMPONENT/UTILITY DESCRIPTIONS FROM PHASE 1]

## Refactoring Changes
[PASTE SUMMARY OF KEY CHANGES MADE]

Please generate the following documentation:

1. **Component Overview**
   - Purpose and functionality of the component
   - Where it fits in the application architecture
   - Key features and behaviors

2. **API Documentation**
   - Props (if applicable)
   - Return value/rendered output
   - State managed within the component
   - Effects and their purposes
   - Public methods or exported functionality

3. **Usage Examples**
   - Basic usage example
   - Examples with different props/configurations
   - Integration example with parent components

4. **Implementation Notes**
   - Key design decisions
   - Performance considerations
   - Architectural patterns applied (SOLID, hooks patterns, etc.)
   - Dependencies and why they're used

5. **Maintenance Guide**
   - How to test the component
   - Common issues and how to address them
   - Guidelines for future modifications
   - Areas that might need future refactoring

6. **JSDoc Comments**
   - Provide JSDoc comments that could be added to the component

7. **Changelog**
   - Summary of changes from the original implementation
   - Benefits of the new implementation

Please format the documentation as markdown that could be used in a project wiki or README.
```