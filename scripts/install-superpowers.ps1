# install-superpowers.ps1
# Installs Superpowers skills to your global Claude Code setup (~/.claude/skills/)

$skillsDir = Join-Path $HOME ".claude\skills"
$superpowersDir = Join-Path $PSScriptRoot "..\vendor\superpowers\skills"

Write-Host "Installing Superpowers skills to $skillsDir..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $skillsDir | Out-Null

$skills = Get-ChildItem -Directory $superpowersDir
foreach ($skill in $skills) {
    Write-Host "  -> $($skill.Name)" -ForegroundColor Green
    Copy-Item -Recurse -Force $skill.FullName "$skillsDir\$($skill.Name)"
}

Write-Host ""
Write-Host "Done! $($skills.Count) Superpowers skills installed." -ForegroundColor Yellow
Write-Host "Say 'use superpowers:using-superpowers' in Claude Code to get started." -ForegroundColor Yellow
