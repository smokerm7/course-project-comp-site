# Находит JDK 17+ и задаёт JAVA_HOME для текущего процесса
$ErrorActionPreference = 'Stop'

function Test-Jdk17Plus([string]$JavaExe) {
    if (-not (Test-Path $JavaExe)) { return $false }
    $ver = & $JavaExe -version 2>&1 | Out-String
    return $ver -match 'version "1[7-9]\.' -or $ver -match 'version "[2-9][0-9]\.'
}

function Set-HomeFromJava([string]$JavaExe) {
    try {
        $item = Get-Item $JavaExe -ErrorAction Stop
        if ($item.Target) { $JavaExe = $item.Target }
    } catch { }
    $bin = Split-Path $JavaExe -Parent
    $javaHome = Split-Path $bin -Parent
    if (Test-Path "$javaHome\bin\java.exe") {
        $script:FoundHome = $javaHome
        return $true
    }
    return $false
}

$FoundHome = $null

# 1) Все java.exe из PATH (первая подходящая 17+)
foreach ($cmd in (Get-Command java -All -ErrorAction SilentlyContinue)) {
    if (Test-Jdk17Plus $cmd.Source) {
        if (Set-HomeFromJava $cmd.Source) { break }
    }
}

# 2) Типичные папки установки
if (-not $FoundHome) {
    $roots = @(
        "${env:ProgramFiles}\Microsoft",
        "${env:ProgramFiles}\Java",
        "${env:ProgramFiles}\Eclipse Adoptium",
        "${env:ProgramFiles(x86)}\Microsoft",
        "${env:LocalAppData}\Programs\Eclipse Adoptium",
        "${env:LocalAppData}\Programs\Microsoft"
    )
    foreach ($root in $roots) {
        if (-not (Test-Path $root)) { continue }
        $candidates = Get-ChildItem $root -Directory -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -match '^jdk-1[7-9]|^jdk-2' }
        foreach ($dir in $candidates) {
            $java = Join-Path $dir.FullName 'bin\java.exe'
            if (Test-Jdk17Plus $java) {
                $FoundHome = $dir.FullName
                break
            }
        }
        if ($FoundHome) { break }
    }
}

# 3) Глубокий поиск только в Microsoft (медленно, но надёжно)
if (-not $FoundHome -and (Test-Path "${env:ProgramFiles}\Microsoft")) {
    $java = Get-ChildItem "${env:ProgramFiles}\Microsoft" -Filter 'java.exe' -Recurse -ErrorAction SilentlyContinue -Depth 5 |
        Where-Object { $_.FullName -match '\\jdk-1[7-9]|\\jdk-2' } |
        Select-Object -First 1
    if ($java -and (Test-Jdk17Plus $java.FullName)) {
        Set-HomeFromJava $java.FullName | Out-Null
    }
}

if (-not $FoundHome) {
    Write-Host ''
    Write-Host '[ОШИБКА] JDK 17 не найден автоматически.' -ForegroundColor Red
    Write-Host 'Выполните в PowerShell и пришлите результат:'
    Write-Host '  (Get-Command java).Source'
    Write-Host '  java -version'
    Write-Host ''
    Write-Host 'Затем задайте вручную (подставьте свой путь к папке JDK, без \bin):'
    Write-Host '  $env:JAVA_HOME = "C:\путь\к\jdk-17..."'
    Write-Host '  $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"'
    exit 1
}

$env:JAVA_HOME = $FoundHome
$cleanPath = ($env:PATH -split ';' | Where-Object { $_ -and $_ -notmatch 'javapath|jre1\.8|jdk1\.8' }) -join ';'
$env:PATH = "$env:JAVA_HOME\bin;$cleanPath"

Write-Host "JAVA_HOME=$env:JAVA_HOME" -ForegroundColor Green
& "$env:JAVA_HOME\bin\java.exe" -version
$LASTEXITCODE = 0
