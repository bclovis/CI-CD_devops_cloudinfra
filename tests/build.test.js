import { existsSync } from 'fs';
import { join } from 'path';

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

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}

console.log('Build validation successful\n');
