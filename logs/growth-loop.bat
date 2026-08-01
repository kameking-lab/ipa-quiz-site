@echo off
REM ============================================================
REM  growth-loop.bat  (夜間ビルド第2弾: 集客・収益化フェーズ)
REM  Self-restarting loop. NO time deadline. Stops when the
REM  backlog is exhausted: a session creates logs\growth-DONE.flag
REM  when nothing actionable remains, and this bat then halts.
REM  A max-session backstop prevents any runaway. Each session is
REM  a short claude --print run that lands a few growth commits on
REM  growth-integration and exits.
REM ============================================================
chcp 65001 >nul
setlocal enableextensions enabledelayedexpansion

set "REPO=C:\Users\kanet\20260522\ipa-quiz-site"
set "PROMPT=%REPO%\logs\growth-prompt.txt"
set "RUNLOG=%REPO%\logs\growth-loop-runs.txt"
set "DONEFLAG=%REPO%\logs\growth-DONE.flag"
set "MAXSESS=200"
set /a COUNT=0

cd /d "%REPO%"
powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('########## GROWTH LOOP STARTED ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' (stops on backlog exhaustion; max %MAXSESS% sessions) ##########')"

:LOOP
if exist "%DONEFLAG%" goto END
set /a COUNT+=1
if !COUNT! GTR %MAXSESS% goto CAP

powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('===== SESSION !COUNT! START ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' =====')"

REM ---- one bounded autonomous growth session (prompt via stdin) ----
type "%PROMPT%" | claude --model opus --dangerously-skip-permissions --print >> "%RUNLOG%" 2>&1

powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('===== SESSION !COUNT! END   ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' =====')"

timeout /t 15 /nobreak >nul
goto LOOP

:CAP
powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('########## MAX SESSIONS (%MAXSESS%) REACHED — LOOP STOPPED ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' ##########')"
goto FIN

:END
powershell -NoProfile -Command "Add-Content -Encoding UTF8 '%RUNLOG%' ('########## BACKLOG EXHAUSTED — LOOP STOPPED ' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + ' ##########')"

:FIN
endlocal
exit /b 0
