# Sync product images from frontend/images/products to frontend/public/images/products
$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot '..\images\products'
$dst = Join-Path $PSScriptRoot '..\public\images\products'

if (-not (Test-Path $src)) {
  Write-Error "Source folder not found: $src"
}
New-Item -ItemType Directory -Force -Path $dst | Out-Null

function Copy-Renamed($sourceName, $targetName) {
  $from = Join-Path $src $sourceName
  if (-not (Test-Path -LiteralPath $from)) {
    $found = Get-ChildItem -LiteralPath $src -File | Where-Object { $_.Name -eq $sourceName }
    if (-not $found) {
      Write-Warning "Skip missing: $sourceName"
      return
    }
    $from = $found.FullName
  }
  Copy-Item -LiteralPath $from -Destination (Join-Path $dst $targetName) -Force
  Write-Host "  $sourceName -> $targetName"
}

function Copy-ByPattern($pattern, $targetName) {
  $file = Get-ChildItem -LiteralPath $src -File | Where-Object { $_.Name -like $pattern } | Select-Object -First 1
  if ($file) {
    Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $dst $targetName) -Force
    Write-Host "  $($file.Name) -> $targetName"
  } else {
    Write-Warning "No file matching: $pattern"
  }
}

Write-Host 'Explicit renames:'
$explicit = @{
  'RTX3050.jpg' = 'gpu-rtx3050.jpg'
  'RTX3060.jpg' = 'gpu-rtx3060.jpg'
  'RTX4060.jpg' = 'gpu-rtx4060.jpg'
  'RTX4060TI.jpg' = 'gpu-rtx4060ti.jpg'
  'RTX4070.jpg' = 'gpu-rtx4070.jpg'
  'RTX4090.JPG' = 'gpu-rtx4090.jpg'
  'RTX 4070 SUPER.jpg' = 'gpu-rtx4070super.jpg'
  'RTX 4080 Super.jpg' = 'gpu-rtx4080super.jpg'
  'Kingston Fury 16GB DDR4.jpg' = 'ram-kingston-fury-16gb-ddr4.jpg'
  'Samsung Odyssey G7.jpg' = 'monitor-samsung-odyssey-g7.jpg'
  'Xiaomi A27i.jpg' = 'monitor-xiaomi-a27i.jpg'
  'cpu-ryzen.jpg' = 'cpu-ryzen.jpg'
  'gaming-pc-black.jpg' = 'gaming-pc-black.jpg'
  'gaming-pc-white.jpg' = 'gaming-pc-white.jpg'
  'gpu-rx9070xt.jpg' = 'gpu-rx9070xt.jpg'
  'keyboard-mechanical.jpg' = 'keyboard-mechanical.jpg'
  'liquid-cooler-360.jpg' = 'liquid-cooler-360.jpg'
  'monitor-msi-curved.jpg' = 'monitor-msi-curved.jpg'
  'monitor-msi-red.jpg' = 'monitor-msi-red.jpg'
  'motherboard-rog-strix.jpg' = 'motherboard-rog-strix.jpg'
  'mouse-logitech-gpro.jpg' = 'mouse-logitech-gpro.jpg'
  'psu-rog-strix.jpg' = 'psu-rog-strix.jpg'
  'ram-ddr5.jpg' = 'ram-ddr5.jpg'
  'ssd-predator-gm7000.jpg' = 'ssd-predator-gm7000.jpg'
}

foreach ($entry in $explicit.GetEnumerator()) {
  Copy-Renamed $entry.Key $entry.Value
}

Write-Host 'Pattern renames (monitors):'
Copy-ByPattern '*AOC*24G2*' 'monitor-aoc24g2.jpg'
Copy-ByPattern '*LG UltraGear*' 'monitor-lg-ultragear.jpg'
Copy-ByPattern '*Samsung Odyssey G5*' 'monitor-samsung-odyssey-g5.jpg'

Write-Host 'AMD GPU placeholders from hash/webp sources:'
$amdTargets = @(
  'gpu-rx6600.jpg',
  'gpu-rx7600.jpg',
  'gpu-rx7700xt.jpg',
  'gpu-rx7800xt.jpg',
  'gpu-rx7900gre.jpg',
  'gpu-rx7900xtx.jpg'
)
$skipPatterns = @(
  '*AOC*', '*LG UltraGear*', '*Samsung Odyssey G5*',
  'RTX*', 'gpu-*', 'cpu-*', 'gaming-*', 'monitor-*', 'ram-*', 'ssd-*',
  'keyboard*', 'liquid*', 'motherboard*', 'mouse*', 'psu*',
  'Kingston*', 'Samsung Odyssey G7*', 'Xiaomi*'
)
$extras = Get-ChildItem -LiteralPath $src -File |
  Where-Object {
    $name = $_.Name
    $skip = $false
    foreach ($p in $skipPatterns) {
      if ($name -like $p) { $skip = $true; break }
    }
    -not $skip -and ($name -match '\.(webp|jpg|jpeg|png)$')
  } |
  Sort-Object Name

$idx = 0
foreach ($target in $amdTargets) {
  if ($idx -lt $extras.Count) {
    Copy-Item -LiteralPath $extras[$idx].FullName -Destination (Join-Path $dst $target) -Force
    Write-Host "  $($extras[$idx].Name) -> $target"
    $idx++
  }
}

Write-Host 'Laptop placeholders:'
$laptopTargets = @(
  'laptop-asus-tuf.jpg',
  'laptop-lenovo-legion.jpg',
  'laptop-msi-katana.jpg',
  'laptop-acer-nitro.jpg'
)
foreach ($target in $laptopTargets) {
  if ($idx -lt $extras.Count) {
    Copy-Item -LiteralPath $extras[$idx].FullName -Destination (Join-Path $dst $target) -Force
    Write-Host "  $($extras[$idx].Name) -> $target"
    $idx++
  } elseif (Test-Path (Join-Path $dst 'gaming-pc-black.jpg')) {
    Copy-Item (Join-Path $dst 'gaming-pc-black.jpg') (Join-Path $dst $target) -Force
    Write-Host "  gaming-pc-black.jpg -> $target (duplicate)"
  }
}

Write-Host ''
Write-Host 'Public images:'
Get-ChildItem -LiteralPath $dst -File |
  Where-Object { $_.Name -ne 'README.md' } |
  Sort-Object Name |
  ForEach-Object { $_.Name }
