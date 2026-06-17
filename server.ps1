# Corrected PowerShell Native HTTP Server
$port = 8081
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Server started. Access website at http://localhost:$port/"
} catch {
    Write-Error "Failed to start listener: $_"
    exit 1
}

$workspaceDir = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath
        # URL decode path to handle Chinese characters and special signs
        $decodedPath = [System.Uri]::UnescapeDataString($rawPath)
        
        if ($decodedPath -eq "/" -or $decodedPath -eq "") {
            $decodedPath = "/index.html"
        }

        # Remove leading slashes and replace forward slashes with backslashes
        $trimmedPath = $decodedPath.TrimStart("/").TrimStart("\").Replace("/", "\")
        
        # Combine robustly
        $filePath = Join-Path $workspaceDir $trimmedPath
        
        Write-Host "Request: $rawPath -> Decoded: $decodedPath -> FilePath: $filePath"

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Content-Type mapping
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/html; charset=utf-8"
            
            switch ($ext) {
                ".css"  { $contentType = "text/css; charset=utf-8" }
                ".js"   { $contentType = "application/javascript; charset=utf-8" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".gif"  { $contentType = "image/gif" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".ico"  { $contentType = "image/x-icon" }
                ".webp" { $contentType = "image/webp" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            Write-Host "File Not Found: $filePath"
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>The file $decodedPath does not exist.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $buf.Length
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
    } catch {
        Write-Host "Error processing request: $_"
    } finally {
        if ($null -ne $response) {
            $response.Close()
        }
    }
}
