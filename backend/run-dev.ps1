# Запуск backend с автопоиском JDK 17
Set-Location $PSScriptRoot
. "$PSScriptRoot\use-java17.ps1"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ''
Write-Host 'Запуск Spring Boot...' -ForegroundColor Cyan
& .\mvnw.cmd spring-boot:run
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка Maven (код $LASTEXITCODE)" -ForegroundColor Red
    exit $LASTEXITCODE
}
