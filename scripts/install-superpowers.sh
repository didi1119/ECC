#!/usr/bin/env bash
# install-superpowers.sh
# Installs Superpowers skills to your global Claude Code setup (~/.claude/skills/)

set -e

SKILLS_DIR="$HOME/.claude/skills"
SUPERPOWERS_DIR="$(dirname "$0")/../vendor/superpowers/skills"

echo "Installing Superpowers skills to $SKILLS_DIR..."
mkdir -p "$SKILLS_DIR"

count=0
for skill in "$SUPERPOWERS_DIR"/*/; do
  skill_name=$(basename "$skill")
  echo "  -> $skill_name"
  cp -r "$skill" "$SKILLS_DIR/$skill_name"
  count=$((count + 1))
done

echo ""
echo "Done! $count Superpowers skills installed."
echo "Say 'use superpowers:using-superpowers' in Claude Code to get started."
