<?php
$distPath = __DIR__ . '/../dist/index.html';
if (file_exists($distPath)) {
    readfile($distPath);
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Build not found. Please run npm run build first.";
}
?> 