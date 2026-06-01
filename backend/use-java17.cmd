@echo off
REM Устарело: используйте run-dev.cmd или run-dev.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0use-java17.ps1"
exit /b %ERRORLEVEL%
