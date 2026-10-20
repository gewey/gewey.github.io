@echo off
setlocal enabledelayedexpansion

:: Get the name of the current folder only
for %%I in ("%CD%") do set "FOLDER_NAME=%%~nxI"

:: Define the dynamic output file name
set "OUTPUT_FILE=%FOLDER_NAME%.md"

:: Clear or create the output file at the start
if exist "%OUTPUT_FILE%" del "%OUTPUT_FILE%"

echo Creating %OUTPUT_FILE%...
echo # Monolith: %FOLDER_NAME% > "%OUTPUT_FILE%"
echo Generated on %DATE% %TIME% >> "%OUTPUT_FILE%"
echo. >> "%OUTPUT_FILE%"

:: Loop recursively through all files in the current directory and its subfolders
for /r %%F in (*) do (
    
    :: Skip the batch script itself and the output file to prevent an infinite loop
    if /i "%%~nxF" NEQ "%~nx0" (
        if /i "%%~nxF" NEQ "%OUTPUT_FILE%" (
            
            echo Processing: %%~fF
            
            :: 1. Add file path as a Markdown Header
            echo. >> "%OUTPUT_FILE%"
            echo ### File: %%~fF >> "%OUTPUT_FILE%"
            echo. >> "%OUTPUT_FILE%"
            
            :: 2. Open a code block to cleanly contain the file text
            echo ``` >> "%OUTPUT_FILE%"
            
            :: 3. Append the file's text contents line by line
            type "%%~fF" >> "%OUTPUT_FILE%"
            
            :: 4. Close the code block
            echo. >> "%OUTPUT_FILE%"
            echo ``` >> "%OUTPUT_FILE%"
            echo. >> "%OUTPUT_FILE%"
            echo --- >> "%OUTPUT_FILE%"
        )
    )
)

echo.
echo Done! All file contents compiled into %OUTPUT_FILE%.
pause
