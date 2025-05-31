<?php

class Deployer {
    private $rootDir;
    private $publicDir;

    public function __construct() {
        $this->rootDir = dirname(__FILE__);
        $this->publicDir = $this->rootDir . '/public';
    }

    public function deploy() {
        try {
            echo "Starting deployment process...\n";
            
            // Create necessary directories
            $this->ensureDirectoryExists($this->publicDir . '/dist');
            
            // Copy the pre-built files from the repository
            $this->copyStaticFiles();
            
            echo "Deployment completed successfully!\n";
            return true;
        } catch (Exception $e) {
            echo "Error during deployment: " . $e->getMessage() . "\n";
            return false;
        }
    }

    private function ensureDirectoryExists($dir) {
        if (!is_dir($dir)) {
            if (!mkdir($dir, 0755, true)) {
                throw new Exception("Failed to create directory: $dir");
            }
        }
    }

    private function copyStaticFiles() {
        // Copy index.html to public directory
        if (file_exists($this->rootDir . '/index.html')) {
            if (!copy($this->rootDir . '/index.html', $this->publicDir . '/index.html')) {
                throw new Exception("Failed to copy index.html");
            }
        }

        // Copy static assets if they exist
        if (is_dir($this->rootDir . '/dist')) {
            $this->recursiveCopy($this->rootDir . '/dist', $this->publicDir . '/dist');
        }
    }

    private function recursiveCopy($src, $dst) {
        if (!is_dir($src)) {
            throw new Exception("Source directory does not exist: $src");
        }

        $this->ensureDirectoryExists($dst);
        $dir = opendir($src);
        
        while (($file = readdir($dir))) {
            if ($file != '.' && $file != '..') {
                $srcPath = $src . '/' . $file;
                $dstPath = $dst . '/' . $file;
                
                if (is_dir($srcPath)) {
                    $this->recursiveCopy($srcPath, $dstPath);
                } else {
                    if (!copy($srcPath, $dstPath)) {
                        throw new Exception("Failed to copy file: $srcPath");
                    }
                }
            }
        }
        closedir($dir);
    }
}

try {
    $deployer = new Deployer();
    if (!$deployer->deploy()) {
        exit(1);
    }
} catch (Exception $e) {
    echo "Fatal error during deployment: " . $e->getMessage() . "\n";
    exit(1);
} 