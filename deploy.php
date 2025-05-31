<?php
$secret = getenv('DEPLOY_SECRET');
$repo_dir = __DIR__;
$web_root_dir = $repo_dir;
$git_bin = 'git';
$update_remote = 'origin';
$update_branch = 'hostinger-deployment';

// Check if a secret key is set
if (!isset($_SERVER['HTTP_X_HUB_SIGNATURE']) && (!isset($_POST['secret']) || $_POST['secret'] !== $secret)) {
    header('HTTP/1.0 403 Forbidden');
    die('Access Denied');
}

// Check if repo directory exists
if (!is_dir($repo_dir) && !is_readable($repo_dir)) {
    header('HTTP/1.0 500 Internal Server Error');
    die("Cannot access repository directory");
}

// Git commands
$commands = array(
    'cd ' . $repo_dir,
    $git_bin . ' fetch ' . $update_remote,
    $git_bin . ' reset --hard ' . $update_remote . '/' . $update_branch,
    $git_bin . ' submodule update --init --recursive',
    'npm install',
    'npm run build'
);

$output = '';
foreach ($commands as $command) {
    $tmp = shell_exec($command . ' 2>&1');
    $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
    $output .= htmlentities(trim($tmp)) . "\n";
}

echo "<!DOCTYPE HTML><html><head><meta charset=\"UTF-8\"><title>Deployment Log</title></head><body style=\"background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;\">";
echo "<pre>{$output}</pre>";
echo "</body></html>"; 