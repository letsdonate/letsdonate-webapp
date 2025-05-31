<?php

class Deployer {
    private $nodeVersion = '18';
    private $distDir;
    private $publicDir;
    private $rootDir;

    public function __construct() {
        $this->rootDir = dirname(__FILE__);
        $this->distDir = $this->rootDir . '/dist';
        $this->publicDir = $this->rootDir . '/public';
    }

    public function deploy() {
        echo "Starting deployment process...\n";
        
        // Ensure we're in the right directory
        chdir($this->rootDir);
        
        // Setup Node.js environment
        $this->setupNode();
        
        // Install dependencies and build
        $this->installDependencies();
        $this->buildProject();
        
        // Copy built files to public directory
        $this->copyBuiltFiles();
        
        echo "Deployment completed successfully!\n";
    }

    private function setupNode() {
        echo "Setting up Node.js environment...\n";
        
        // Check if nvm is available
        $nvmPath = getenv('HOME') . '/.nvm/nvm.sh';
        if (file_exists($nvmPath)) {
            echo "Using NVM to install Node.js...\n";
            $this->executeCommand("source {$nvmPath} && nvm install {$this->nodeVersion} && nvm use {$this->nodeVersion}");
        } else {
            // Try using system Node.js
            $nodeVersion = trim(shell_exec('node -v'));
            echo "Using system Node.js version: {$nodeVersion}\n";
        }
    }

    private function installDependencies() {
        echo "Installing dependencies...\n";
        $this->executeCommand('npm install --production');
    }

    private function buildProject() {
        echo "Building project...\n";
        $this->executeCommand('npm run build');
    }

    private function copyBuiltFiles() {
        echo "Copying built files...\n";
        if (!is_dir($this->distDir)) {
            throw new Exception("Build directory not found!");
        }

        // Create assets directory if it doesn't exist
        if (!is_dir($this->publicDir . '/dist')) {
            mkdir($this->publicDir . '/dist', 0755, true);
        }

        // Copy all files from dist to public/dist
        $this->recursiveCopy($this->distDir, $this->publicDir . '/dist');
    }

    private function recursiveCopy($src, $dst) {
        $dir = opendir($src);
        @mkdir($dst);
        while (($file = readdir($dir))) {
            if (($file != '.') && ($file != '..')) {
                if (is_dir($src . '/' . $file)) {
                    $this->recursiveCopy($src . '/' . $file, $dst . '/' . $file);
                } else {
                    copy($src . '/' . $file, $dst . '/' . $file);
                }
            }
        }
        closedir($dir);
    }

    private function executeCommand($command) {
        $output = [];
        $returnVar = 0;
        exec($command . ' 2>&1', $output, $returnVar);
        
        foreach ($output as $line) {
            echo $line . "\n";
        }
        
        if ($returnVar !== 0) {
            throw new Exception("Command failed: " . $command);
        }
    }
}

try {
    $deployer = new Deployer();
    $deployer->deploy();
} catch (Exception $e) {
    echo "Deployment failed: " . $e->getMessage() . "\n";
    exit(1);
} 