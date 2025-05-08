#!/bin/bash

# comment-remover.sh - Script to remove comments from various file types
# Usage: ./comment-remover.sh /path/to/project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project directory
PROJECT_DIR="${1:-$(pwd)}"
# Backup directory
BACKUP_DIR="${PROJECT_DIR}/comment-remover-backup-$(date +%Y%m%d%H%M%S)"
# Log file
LOG_FILE="${BACKUP_DIR}/comment-remover.log"

# Verify the project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
  echo -e "${RED}Error: Project directory does not exist: $PROJECT_DIR${NC}"
  exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo -e "${BLUE}Created backup directory: $BACKUP_DIR${NC}"

# Initialize log file
echo "Comment Removal Log - $(date)" > "$LOG_FILE"
echo "Project directory: $PROJECT_DIR" >> "$LOG_FILE"
echo "----------------------------------------" >> "$LOG_FILE"

# Function to remove comments from a file
remove_comments() {
  local file="$1"
  local file_type="$2"
  local backup_file="${BACKUP_DIR}/$(basename "$file")"
  
  # Create backup
  cp "$file" "$backup_file"
  
  # Record file being processed
  echo -e "${YELLOW}Processing: $file (${file_type})${NC}"
  echo "Processing: $file (${file_type})" >> "$LOG_FILE"
  
  case "$file_type" in
    "js"|"ts"|"tsx"|"mjs"|"jsx")
      # JavaScript/TypeScript - Remove single-line and multi-line comments
      perl -i -0pe 's{//.*?$}{}gm; s{/\*.*?\*/}{}gs' "$file"
      ;;
    "php")
      # PHP - Remove single-line, multi-line, and hash comments
      perl -i -0pe 's{(?://|#).*?$}{}gm; s{/\*.*?\*/}{}gs' "$file"
      ;;
    "css")
      # CSS - Remove CSS comments
      perl -i -0pe 's{/\*.*?\*/}{}gs' "$file"
      ;;
    "sh")
      # Shell scripts - Remove hash comments
      perl -i -0pe 's{#.*?$}{}gm' "$file"
      ;;
    "env"|"conf")
      # Configuration files - Remove hash comments
      perl -i -0pe 's{#.*?$}{}gm' "$file"
      ;;
    *)
      # Unknown file type
      echo -e "${RED}Warning: Unknown file type for $file - skipping${NC}"
      echo "Warning: Unknown file type for $file - skipping" >> "$LOG_FILE"
      return 1
      ;;
  esac
  
  # Check if file was modified
  if diff -q "$file" "$backup_file" >/dev/null; then
    echo "  No comments removed" >> "$LOG_FILE"
    echo -e "${BLUE}  No comments removed${NC}"
  else
    local original_size=$(wc -c < "$backup_file")
    local new_size=$(wc -c < "$file")
    local bytes_saved=$((original_size - new_size))
    local percent_saved=$(( (bytes_saved * 100) / original_size ))
    
    echo "  Comments removed: $bytes_saved bytes ($percent_saved%)" >> "$LOG_FILE"
    echo -e "${GREEN}  Comments removed: $bytes_saved bytes ($percent_saved%)${NC}"
  fi
  
  return 0
}

# Function to process a directory
process_directory() {
  local dir="$1"
  
  echo -e "${BLUE}Scanning directory: $dir${NC}"
  echo "Scanning directory: $dir" >> "$LOG_FILE"
  
  # JavaScript/TypeScript files
  find "$dir" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" -o -name "*.jsx" \) -not -path "*/node_modules/*" -not -path "*/comment-remover-backup-*/*" | while read -r file; do
    local ext="${file##*.}"
    remove_comments "$file" "$ext"
  done
  
  # PHP files
  find "$dir" -type f -name "*.php" -not -path "*/comment-remover-backup-*/*" | while read -r file; do
    remove_comments "$file" "php"
  done
  
  # CSS files
  find "$dir" -type f -name "*.css" -not -path "*/node_modules/*" -not -path "*/comment-remover-backup-*/*" | while read -r file; do
    remove_comments "$file" "css"
  done
  
  # Shell scripts
  find "$dir" -type f -name "*.sh" -not -path "*/comment-remover-backup-*/*" | while read -r file; do
    remove_comments "$file" "sh"
  done
  
  # Configuration files
  find "$dir" -type f \( -name "*.env*" -o -name ".env*" \) -not -path "*/comment-remover-backup-*/*" | while read -r file; do
    remove_comments "$file" "env"
  done
}

# Main execution
echo -e "${BLUE}Starting comment removal process...${NC}"
process_directory "$PROJECT_DIR"

# Summary
echo -e "${GREEN}Comment removal complete!${NC}"
echo -e "${BLUE}Backup files saved to: $BACKUP_DIR${NC}"
echo -e "${BLUE}Log file: $LOG_FILE${NC}"
echo
echo -e "${YELLOW}Warning: Please verify the changes before committing them to your repository.${NC}"
echo -e "${YELLOW}You can restore the backups if needed.${NC}"

# Log completion
echo "----------------------------------------" >> "$LOG_FILE"
echo "Comment removal completed on $(date)" >> "$LOG_FILE"