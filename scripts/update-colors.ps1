$root = 'c:\Users\clalb\webdev2\mykds'
$files = Get-ChildItem -Path $root -Recurse -Include *.jsx,*.js,*.css |
         Where-Object { $_.FullName -notmatch 'node_modules|\.next' }

$replacements = @(
    # JS style objects - dark text on white bg
    @{ From = "color: '#2b2b2b'";  To = "color: '#222222'" },
    @{ From = "color: '#1a1a1a'";  To = "color: '#222222'" },
    @{ From = "color: '#434343'";  To = "color: '#222222'" },
    @{ From = "color: '#333333'";  To = "color: '#222222'" },
    @{ From = "color: '#333'";     To = "color: '#222222'" },
    @{ From = "color: '#555'";     To = "color: '#555555'" },
    @{ From = "color: '#666'";     To = "color: '#555555'" },
    @{ From = "color: '#666666'";  To = "color: '#555555'" },
    @{ From = "color: '#888'";     To = "color: '#555555'" },
    @{ From = "color: '#888888'";  To = "color: '#555555'" },
    @{ From = "color: '#aaa'";     To = "color: '#888888'" },
    # CSS class rules
    @{ From = "color: #2b2b2b;";   To = "color: #222222;" },
    @{ From = "color: #1a1a1a;";   To = "color: #222222;" },
    @{ From = "color: #434343;";   To = "color: #222222;" },
    @{ From = "color: #333;";      To = "color: #222222;" },
    @{ From = "color: #333333;";   To = "color: #222222;" },
    @{ From = "color: #555;";      To = "color: #555555;" },
    @{ From = "color: #666;";      To = "color: #555555;" },
    @{ From = "color: #666666;";   To = "color: #555555;" },
    @{ From = "color: #888;";      To = "color: #555555;" },
    @{ From = "color: #1a4a6b;";   To = "color: #222222;" },
    # body text in page.jsx CSS
    @{ From = "color: #2b2b2b;";   To = "color: #222222;" }
)

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $changed = $false
    foreach ($r in $replacements) {
        if ($content.Contains($r.From)) {
            $content = $content.Replace($r.From, $r.To)
            $changed = $true
        }
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done."
