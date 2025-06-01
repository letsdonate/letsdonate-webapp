<?php
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// If requesting a file in the dist directory, serve it directly
if (strpos($requestPath, '/dist/') === 0) {
    $filePath = __DIR__ . $requestPath;
    if (file_exists($filePath)) {
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        switch ($extension) {
            case 'js':
                header('Content-Type: application/javascript');
                break;
            case 'css':
                header('Content-Type: text/css');
                break;
            case 'png':
                header('Content-Type: image/png');
                break;
            case 'jpg':
            case 'jpeg':
                header('Content-Type: image/jpeg');
                break;
            case 'svg':
                header('Content-Type: image/svg+xml');
                break;
        }
        readfile($filePath);
        exit;
    }
}

// For all other requests, serve the React app
$indexPath = __DIR__ . '/dist/index.html';
if (file_exists($indexPath)) {
    readfile($indexPath);
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Application build not found. Please run the deployment script first.";
}
?> 