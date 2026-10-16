# Auto cache-bust: stamp every assets/*.css|js reference in the HTML pages
# with ?v=<Version> so browsers/CDN always fetch the latest build.
# Usage: powershell -File tools/bump-assets.ps1 [-Version 20261016123456]
param(
  [string]$Version = (Get-Date -Format 'yyyyMMddHHmmss')
)

$root = Split-Path -Parent $PSScriptRoot
$pages = @('index.html', 'tour-buon-ma-thuot.html')
$pattern = '(assets/[A-Za-z0-9._/-]+\.(?:css|js))(?:\?v=[0-9]+)?'
$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($page in $pages) {
  $path = Join-Path $root $page
  if (-not (Test-Path -LiteralPath $path)) { continue }
  $text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $next = [regex]::Replace($text, $pattern, { param($m) $m.Groups[1].Value + '?v=' + $Version })
  if ($next -ne $text) {
    [System.IO.File]::WriteAllText($path, $next, $utf8)
    Write-Host "bump-assets: $page -> ?v=$Version"
  } else {
    Write-Host "bump-assets: $page unchanged"
  }
}
