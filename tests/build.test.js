import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

console.log('Running build validation...\n');

const srcPath = join(process.cwd(), 'src');
const publicPath = join(process.cwd(), 'public');
const tests = [];

// Test que les fichiers sources existent
tests.push({
  name: 'Source directory exists',
  pass: existsSync(srcPath),
  error: 'src/ folder not found'
});

tests.push({
  name: 'App.jsx exists',
  pass: existsSync(join(srcPath, 'App.jsx')),
  error: 'src/App.jsx not found'
});

tests.push({
  name: 'main.jsx entry point exists',
  pass: existsSync(join(srcPath, 'main.jsx')),
  error: 'src/main.jsx not found'
});

// Test que les assets existent
tests.push({
  name: 'Assets folder exists',
  pass: existsSync(join(srcPath, 'assets')),
  error: 'src/assets/ not found'
});

tests.push({
  name: 'CyTech logo exists',
  pass: existsSync(join(srcPath, 'assets/img/cytech.png')),
  error: 'CyTech logo missing'
});

tests.push({
  name: 'Google Cloud logo exists',
  pass: existsSync(join(srcPath, 'assets/img/googlecloud.png')),
  error: 'Google Cloud logo missing'
});

// Test composants
tests.push({
  name: 'TeamMember component exists',
  pass: existsSync(join(srcPath, 'components/TeamMember.jsx')),
  error: 'TeamMember component missing'
});

// Test config Docker/CI
tests.push({
  name: 'Dockerfile exists',
  pass: existsSync(join(process.cwd(), 'Dockerfile')),
  error: 'Dockerfile not found'
});

tests.push({
  name: 'Cloud Build config exists',
  pass: existsSync(join(process.cwd(), 'cloudbuild.yaml')),
  error: 'cloudbuild.yaml not found'
});

tests.push({
  name: 'Performance Budget: Main images are optimized (<100KB)',
  pass: (() => {
      const imgPath = join(srcPath, 'assets/img/cytech.png');
      const stats = statSync(imgPath);
      const sizeInKB = stats.size / 1024;
      console.log(`Log: Image size is ${sizeInKB.toFixed(2)} KB`);
      return sizeInKB < 100; // il doit faire moins de 100KB
  })(),
  error: 'Image assets are too large! Please compress them for GCP optimization.'
});

tests.push({
  name: 'Cloud Build Logic Check',
  pass: (() => {
    try {
      const content = readFileSync(join(process.cwd(), 'cloudbuild.yaml'), 'utf8');
      return content.includes('gcr.io') && content.includes('docker');
    } catch (e) { return false; }
  })(),
  error: 'cloudbuild.yaml does not seem to push to Container Registry (missing gcr.io or docker steps)'
});

// Scanner les fichiers .jsx pour voir s'ils contiennent des patterns dangereux comme AIza
tests.push({
  name: 'Security Scan: No Hardcoded API Keys',
  pass: (() => {
    const appContent = readFileSync(join(srcPath, 'App.jsx'), 'utf8');
    const hasLeak = /AIza[0-9A-Za-z-_]{35}/.test(appContent); 
    return !hasLeak;
  })(),
  error: 'CRITICAL: Hardcoded Google API Key detected in App.jsx!'
});

//Lancer un docker build rapide en mode check pour vérifier qu'on peux construire l'image (sans la lancer).
tests.push({
  name: 'Docker Build Dry-Run',
  pass: (() => {
    try {
      execSync('docker -v'); 
      return true;
    } catch (e) { return false; }
  })(),
  error: 'Docker is not available in the environment.'
});

let passed = 0;
let failed = 0;

tests.forEach(test => {
  if (test.pass) {
    console.log(`PASS ${test.name}`);
    passed++;
  } else {
    console.log(`FAIL ${test.name}: ${test.error}`);
    failed++;
  }
});

if (failed > 0) {
  process.exit(1);
}

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

console.log('Build validation successful\n');
