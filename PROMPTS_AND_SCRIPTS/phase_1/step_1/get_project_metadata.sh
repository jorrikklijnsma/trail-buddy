#!/bin/bash
# This script analyzes a project directory to determine its type and extract relevant metadata

# Read the project path from input.txt
PROJECT_PATH=$(cat input.txt)
OUTPUT_FILE="output.txt"

echo "Analyzing project: $PROJECT_PATH" > $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE

# Determine project type based on files present
echo "## Project Type Detection" >> $OUTPUT_FILE

if [ -f "$PROJECT_PATH/package.json" ]; then
  echo "Detected: JavaScript/TypeScript project (package.json found)" >> $OUTPUT_FILE
  PROJECT_TYPE="javascript"
elif [ -f "$PROJECT_PATH/pom.xml" ]; then
  echo "Detected: Java project (pom.xml found)" >> $OUTPUT_FILE
  PROJECT_TYPE="java"
elif [ -f "$PROJECT_PATH/requirements.txt" ] || [ -f "$PROJECT_PATH/setup.py" ]; then
  echo "Detected: Python project (requirements.txt or setup.py found)" >> $OUTPUT_FILE
  PROJECT_TYPE="python"
else
  echo "Unknown project type" >> $OUTPUT_FILE
  PROJECT_TYPE="unknown"
fi

echo "" >> $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Extract metadata based on project type
echo "## Project Metadata" >> $OUTPUT_FILE

if [ "$PROJECT_TYPE" == "javascript" ]; then
  # Get project name
  if grep -q "\"name\":" "$PROJECT_PATH/package.json"; then
    PROJECT_NAME=$(grep -o '"name": "[^"]*"' "$PROJECT_PATH/package.json" | cut -d'"' -f4)
    echo "Project Name: $PROJECT_NAME" >> $OUTPUT_FILE
  fi

  echo "" >> $OUTPUT_FILE

  # Extract package.json info
  echo "### Dependencies and Versions" >> $OUTPUT_FILE
  
  # Check if it's React
  if grep -q "\"react\":" "$PROJECT_PATH/package.json"; then
    echo "React project detected" >> $OUTPUT_FILE
    
    # Check for TypeScript
    if grep -q "\"typescript\":" "$PROJECT_PATH/package.json" || [ -f "$PROJECT_PATH/tsconfig.json" ]; then
      echo "TypeScript is used" >> $OUTPUT_FILE
    fi
    
    # Check for build tools
    if grep -q "\"vite\":" "$PROJECT_PATH/package.json"; then
      echo "Build tool: Vite" >> $OUTPUT_FILE
    elif grep -q "\"webpack\":" "$PROJECT_PATH/package.json"; then
      echo "Build tool: Webpack" >> $OUTPUT_FILE
    elif grep -q "\"next\":" "$PROJECT_PATH/package.json"; then
      echo "Framework: Next.js" >> $OUTPUT_FILE
    fi
    
    # Check for styling
    if grep -q "\"tailwindcss\":" "$PROJECT_PATH/package.json"; then
      echo "CSS Framework: Tailwind CSS" >> $OUTPUT_FILE
    elif grep -q "\"styled-components\":" "$PROJECT_PATH/package.json"; then
      echo "CSS-in-JS: Styled Components" >> $OUTPUT_FILE
    elif grep -q "\"@emotion/react\":" "$PROJECT_PATH/package.json"; then
      echo "CSS-in-JS: Emotion" >> $OUTPUT_FILE
    fi
  fi
  
  # Get React version if available
  if grep -q "\"react\":" "$PROJECT_PATH/package.json"; then
    REACT_VERSION=$(grep -o '"react": "[^"]*"' "$PROJECT_PATH/package.json" | cut -d'"' -f4)
    echo "React version: $REACT_VERSION" >> $OUTPUT_FILE
  fi
  
  # List first-level directories in src
  echo "" >> $OUTPUT_FILE
  echo "### Project Structure" >> $OUTPUT_FILE
  echo "First-level directories in /src:" >> $OUTPUT_FILE
  if [ -d "$PROJECT_PATH/src" ]; then
    find "$PROJECT_PATH/src" -mindepth 1 -maxdepth 1 -type d | sort | while read dir; do
      echo "- $(basename "$dir")" >> $OUTPUT_FILE
    done
  else
    echo "No /src directory found" >> $OUTPUT_FILE
  fi
  
elif [ "$PROJECT_TYPE" == "java" ]; then
  echo "Java project metadata analysis not implemented for this demo" >> $OUTPUT_FILE
  
elif [ "$PROJECT_TYPE" == "python" ]; then
  echo "Python project metadata analysis not implemented for this demo" >> $OUTPUT_FILE
  
else
  echo "Unknown project type - cannot extract metadata" >> $OUTPUT_FILE
fi

# Final summary
echo "" >> $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE
echo "## Summary" >> $OUTPUT_FILE
echo "Project type: $PROJECT_TYPE" >> $OUTPUT_FILE
echo "Analysis completed: $(date)" >> $OUTPUT_FILE

echo "Analysis complete. Results saved to $OUTPUT_FILE"