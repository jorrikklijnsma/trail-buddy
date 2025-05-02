#!/bin/bash
# Simple script to create a focused file structure map using only basic ASCII characters

# Read the project path from input.txt
PROJECT_PATH=$(cat input.txt)
OUTPUT_FILE="output.txt"
PATHS_FILE="file_paths.txt"

echo "Creating file structure map for: $PROJECT_PATH" > $OUTPUT_FILE
echo "Targeting only src/ and specific root files" >> $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE

# Clear the paths file
> $PATHS_FILE

# Function to print directory tree with simple ASCII characters
# and simultaneously collect file paths
print_directory() {
  local dir=$1
  local prefix=$2
  local rel_path=$3
  local base_name=$(basename "$dir")
  
  # Get all non-hidden entries, sorted with directories first
  local entries=$(ls -la "$dir" | grep -v "^\." | awk '{print $NF}' | sort)
  
  for entry in $entries; do
    # Skip hidden files and directories
    if [[ "$entry" == .* ]]; then
      continue
    fi
    
    # Calculate the relative path for this entry
    local entry_rel_path="$rel_path/$entry"
    if [ -z "$rel_path" ]; then
      entry_rel_path="$entry"
    fi
    
    # Determine if this is the last entry to adjust the tree graphics
    if [[ "$entry" == $(echo "$entries" | tail -n1) ]]; then
      connector="+-- "
      new_prefix="$prefix    "
    else
      connector="|-- "
      new_prefix="$prefix|   "
    fi
    
    # Handle directories and files
    if [ -d "$dir/$entry" ]; then
      echo "$prefix$connector$entry/" >> $OUTPUT_FILE
      print_directory "$dir/$entry" "$new_prefix" "$entry_rel_path"
    else
      # Only include .ts, .tsx, and .json files
      if [[ "$entry" == *.ts || "$entry" == *.tsx || "$entry" == *.json ]]; then
        echo "$prefix$connector$entry" >> $OUTPUT_FILE
        # Add file path to the paths file
        echo "$entry_rel_path" >> $PATHS_FILE
      fi
    fi
  done
}

# First list root level specific files
echo "## Project Structure" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "$PROJECT_PATH" >> $OUTPUT_FILE

# Check for specific root files
for file in package.json tsconfig.json vite.config.ts; do
  if [ -f "$PROJECT_PATH/$file" ]; then
    echo "|-- $file" >> $OUTPUT_FILE
    echo "$file" >> $PATHS_FILE
  fi
done

# Check if src directory exists and process it
if [ -d "$PROJECT_PATH/src" ]; then
  echo "+-- src/" >> $OUTPUT_FILE
  print_directory "$PROJECT_PATH/src" "    " "src"
else
  echo "+-- [src directory not found]" >> $OUTPUT_FILE
fi

# File type statistics
echo "" >> $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE
echo "## File Type Statistics" >> $OUTPUT_FILE

# Count files in src directory
ts_count=$(find "$PROJECT_PATH/src" -name "*.ts" 2>/dev/null | wc -l)
tsx_count=$(find "$PROJECT_PATH/src" -name "*.tsx" 2>/dev/null | wc -l)
json_count=$(find "$PROJECT_PATH/src" -name "*.json" 2>/dev/null | wc -l)

echo "*.ts files in src/: $ts_count" >> $OUTPUT_FILE
echo "*.tsx files in src/: $tsx_count" >> $OUTPUT_FILE
echo "*.json files in src/: $json_count" >> $OUTPUT_FILE

# Count specific root files
echo "" >> $OUTPUT_FILE
echo "Root configuration files:" >> $OUTPUT_FILE
for file in package.json tsconfig.json vite.config.ts; do
  if [ -f "$PROJECT_PATH/$file" ]; then
    echo "- $file: Found" >> $OUTPUT_FILE
  else
    echo "- $file: Not found" >> $OUTPUT_FILE
  fi
done

echo "" >> $OUTPUT_FILE
echo "Analysis completed: $(date)" >> $OUTPUT_FILE

# Add the total number of files found to the output
file_count=$(wc -l < $PATHS_FILE)
echo "" >> $OUTPUT_FILE
echo "----------------------------------------" >> $OUTPUT_FILE
echo "## File Paths" >> $OUTPUT_FILE
echo "$file_count files found and listed in $PATHS_FILE" >> $OUTPUT_FILE

echo "File structure map created. Results saved to $OUTPUT_FILE"
echo "File paths saved to $PATHS_FILE"