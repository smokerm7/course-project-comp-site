@echo off
cd /d "%~dp0"
call "%~dp0use-java17.cmd"
if errorlevel 1 exit /b 1
call mvnw.cmd %*
