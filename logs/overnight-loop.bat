@echo off
REM ============================================================
REM  overnight-loop.bat
REM  Self-restarting autonomous improvement loop.
REM  Runs short claude --print sessions repeatedly until the
REM  deadline (Sun 2026-05-31 09:00 JST). The machine clock is
REM  Tokyo Standard Time, so local time == JST. No TZ math.
REM  Each session: continues overnight-integration from the
REM  worklog/backlog, lands a few 1-improvement commits, exits.
REM  If a session crashes/ends, this bat just starts the next.
REM ============================================================
chcp 65001 >nul
setlocal enableextensions

set "REPO=C:\Users\kanet\20260522\ipa-quiz-site"
set "DEADLINE=2026-05-31T09:00:00"
set "PROMPT=%REPO%\logs\overnight-prompt.txt"
set "RUNLOG=%REPO%\logs\overnight-loop-runs.txt"

cd /d "%REPO%"

powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('########## LOOP STARTED ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' (deadline %DEADLINE%) ##########')"

:LOOP
REM ---- deadline gate: exit code 1 means past deadline ----
powershell -NoProfile -Command "if((Get-Date) -ge [DateTime]::Parse('%DEADLINE%')){exit 1}else{exit 0}"
if errorlevel 1 goto END

powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('===== SESSION START ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' =====')"

REM ---- run one bounded autonomous session (prompt via stdin) ----
type "%PROMPT%" | claude --model opus --dangerously-skip-permissions --print >> "%RUNLOG%" 2>&1

powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('===== SESSION END   ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' (exit ' + $env:ERRORLEVEL + ') =====')"

REM ---- brief pause, then restart ----
timeout /t 15 /nobreak >nul
goto LOOP

:END
powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('########## DEADLINE REACHED — LOOP STOPPED ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' ##########')"
endlocal
exit /b 0
