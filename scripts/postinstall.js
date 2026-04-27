import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDir = path.resolve(__dirname, '..');

const packageJsonPath = path.join(packageDir, 'package.json');
const isHookLens = fs.existsSync(packageJsonPath) && 
  JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).name === 'hooklens-node';

let userProjectPath;
if (isHookLens) {
  const parentDir = path.resolve(packageDir, '..');
  const parentPackageJson = path.join(parentDir, 'package.json');
  const hasParentPackage = fs.existsSync(parentPackageJson);
  userProjectPath = hasParentPackage ? parentDir : packageDir;
} else {
  userProjectPath = packageDir;
}

const envFilePath = path.join(userProjectPath, '.env');

const envContent = `HOOKLENS_API_KEY=
HOOKLENS_BASE_URL=
HOOKLENS_PROJECT_ID=
`;

const hasExistingEnv = fs.existsSync(envFilePath);

if (!hasExistingEnv) {
  fs.writeFileSync(envFilePath, envContent);
  console.log('Created .env with HookLens configuration');
} else {
  const existing = fs.readFileSync(envFilePath, 'utf8');
  const needsUpdate = !existing.includes('HOOKLENS_API_KEY');
  
  if (needsUpdate) {
    const updated = existing.trim() + '\n' + envContent;
    fs.writeFileSync(envFilePath, updated);
    console.log('Updated .env with HookLens configuration');
  } else {
    console.log('.env already has HookLens configuration');
  }
}