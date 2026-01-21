# PowerShell script to start the Docuchat backend

Write-Host "Starting Docuchat Backend..." -ForegroundColor Green

# Change to the script directory
Set-Location $PSScriptRoot

# Run the backend
python Docuchat_backend.py

# Keep the window open if there's an error
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend exited with code $LASTEXITCODE" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
