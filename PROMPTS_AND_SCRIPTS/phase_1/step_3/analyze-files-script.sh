#!/bin/bash
# Simple script to analyze files using Ollama with prompts based on file extensions

# Configuration
MODEL="qwen3" # Ollama model to use
PROJECT_PATH=$(cat ./input.txt) # Base path for files
OUTPUT_DIR="analyses" # Directory for analysis output
PATHS_FILE="./output_2.txt" # File containing list of file paths
PROMPTS_DIR="prompt_templates" # Directory with prompt templates

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Prompt template files by extension
TS_PROMPT="$PROMPTS_DIR/typescript_analysis.txt"
TSX_PROMPT="$PROMPTS_DIR/react_component_analysis.txt"
CSS_PROMPT="$PROMPTS_DIR/css_analysis.txt"
JSON_PROMPT="$PROMPTS_DIR/json_analysis.txt"

echo "Starting file analysis with Ollama model: $MODEL"
echo "Project path: $PROJECT_PATH"

# Check if paths file exists
if [ ! -f "$PATHS_FILE" ]; then
  echo "Error: $PATHS_FILE not found"
  exit 1
fi

# Function to sanitize filenames for output
sanitize_filename() {
  echo "$1" | sed 's/\//_/g' | sed 's/\./_/g'
}

# Function to analyze a file
analyze_file() {
  local file_path="$1" # Full path to file
  local prompt_file="$2" # Prompt template file
  local rel_path="$3" # Relative path for output

  echo "Analyzing: $rel_path"

  # Check if file and prompt exist
  if [ ! -f "$file_path" ]; then
    echo "Warning: File not found: $file_path"
    return
  fi
  if [ ! -f "$prompt_file" ]; then
    echo "Error: Prompt not found: $prompt_file"
    return
  fi

  # Read file content and prompt template
  local file_content=$(cat "$file_path")
  local prompt_template=$(cat "$prompt_file")

  # Replace [FILE_CONTENT] placeholder with file content
  local prompt="${prompt_template/\[FILE_CONTENT\]/$file_content}"

  # Escape prompt for JSON
  local escaped_prompt=$(echo -n "$prompt" | jq -R -s .)

  # Create JSON request for Ollama
  local request=$(jq -n --arg model "$MODEL" --arg prompt "$escaped_prompt" \
    '{model: $model, prompt: $prompt, stream: false}')

  # Send request to Ollama
  local response=$(curl -s -X POST "http://localhost:11434/api/generate" \
    -H "Content-Type: application/json" -d "$request")

  # Clean response by removing control characters
  local clean_response=$(echo "$response" | tr -d '\000-\037')

  # Extract response content
  local content=$(echo "$clean_response" | jq -r '.response // "Error: No response content"' 2>/dev/null)

  if [ "$content" = "Error: No response content" ]; then
    echo "Error: Failed to get response for $rel_path"
    return
  fi

  # Parse content to remove <think> tags and format as multi-line
  local parsed_content=$(echo "$content" | \
    sed 's/<think>.*<\/think>//g' | \
    sed 's/^[ \t]*//;s/[ \t]*$//' | \
    sed 's/\([0-9]\+\.\)/\n\1/g' | \
    sed '/^$/d')

  # Save to analysis file
  local sanitized_name=$(sanitize_filename "$rel_path")
  local output_file="$OUTPUT_DIR/${sanitized_name}_analysis.txt"
  printf "%s\n" "$parsed_content" > "$output_file"

  echo "Saved analysis to $output_file"
}

# Read and process each file path
echo "Reading files from $PATHS_FILE..."
while IFS= read -r file_path; do
  # Skip empty lines
  if [ -z "$file_path" ]; then
    continue
  fi

  full_path="$PROJECT_PATH/$file_path"

  # Select prompt based on file extension
  if [[ "$file_path" == *.tsx ]]; then
    analyze_file "$full_path" "$TSX_PROMPT" "$file_path"
  elif [[ "$file_path" == *.ts ]]; then
    analyze_file "$full_path" "$TS_PROMPT" "$file_path"
  elif [[ "$file_path" == *.css ]]; then
    analyze_file "$full_path" "$CSS_PROMPT" "$file_path"
  elif [[ "$file_path" == *.json ]]; then
    analyze_file "$full_path" "$JSON_PROMPT" "$file_path"
  else
    echo "Skipping: $file_path (unsupported extension)"
  fi
done < "$PATHS_FILE"

echo "Analysis complete! Results saved to $OUTPUT_DIR/"