$files = Get-ChildItem "src/pages/Arrays/MathLogical/components/*.jsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'min-h-screen bg-gray-900 text-white p-6' -and -not ($content -match 'pt-24')) {
        $newContent = $content -replace 'min-h-screen bg-gray-900 text-white p-6', 'min-h-screen bg-gray-900 text-white p-6 pt-24'
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
