# Performance Baseline Generation Prompt

```
Based on the component I need to refactor, please help me establish performance baselines to measure the success of my refactoring efforts.

## Component to Refactor
[PASTE THE COMPONENT CODE HERE]

## Codebase Analysis Summary
[PASTE RELEVANT SECTIONS FROM PHASE 1 ANALYSIS]

## Refactoring Requirements
[PASTE PERFORMANCE-RELATED REQUIREMENTS FROM THE REQUIREMENTS FILE]

Please provide a comprehensive plan for establishing performance baselines including:

1. **Key Performance Metrics**
   - Which metrics are most relevant for this component
   - How each metric relates to user experience
   - Acceptable thresholds for each metric

2. **Measurement Tools**
   - Specific tools to use for measurement
   - How to configure these tools
   - Sample commands or code snippets for measurement

3. **Measurement Methodology**
   - How to set up a controlled testing environment
   - Number of measurements needed for statistical significance
   - How to account for variability

4. **Baseline Establishment**
   - How to document baseline measurements
   - Format for recording results
   - Which scenarios to test (e.g., different data loads, user interactions)

5. **Comparison Strategy**
   - How to compare before and after measurements
   - Statistical methods to use
   - How to interpret results

6. **Implementation Code**
   - Provide sample code for measuring performance of this specific component
   - Include React-specific tools like the Profiler component if applicable
   - Show how to instrument the code for measurement

Please focus on practical, implementable approaches that I can use to ensure my refactoring improves (or at least maintains) the component's performance.
```