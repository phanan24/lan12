#!/usr/bin/env node

/**
 * Script test build cho Vercel deployment
 * Kiểm tra xem build có tạo ra đúng files không
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔍 Testing Vercel build process...');

// Test 1: Clean build
console.log('\n1️⃣ Cleaning and building...');
try {
  if (fs.existsSync('dist')) {
    console.log('Removing old dist folder...');
    execSync('rm -rf dist', { stdio: 'pipe' });
  }
  
  console.log('Running build...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build completed');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Test 2: Check output structure
console.log('\n2️⃣ Checking output structure...');
const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'dist/public/404.html'
];

const requiredDirs = [
  'dist/public/assets'
];

let allFilesExist = true;

for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✅ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
    allFilesExist = false;
  }
}

for (const dir of requiredDirs) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`✅ ${dir} (${files.length} files)`);
  } else {
    console.log(`❌ ${dir} - MISSING!`);
    allFilesExist = false;
  }
}

// Test 3: Check backend entry point
console.log('\n3️⃣ Checking backend entry point...');
try {
  const backendContent = fs.readFileSync('dist/index.js', 'utf8');
  if (backendContent.includes('express') || backendContent.includes('app.listen')) {
    console.log('✅ Backend entry point looks valid');
  } else {
    console.log('⚠️  Backend entry point may have issues');
  }
} catch (error) {
  console.log('❌ Cannot read backend entry point');
  allFilesExist = false;
}

// Test 4: Check frontend entry point
console.log('\n4️⃣ Checking frontend entry point...');
try {
  const frontendContent = fs.readFileSync('dist/public/index.html', 'utf8');
  if (frontendContent.includes('<div id="root">') && frontendContent.includes('.js')) {
    console.log('✅ Frontend entry point looks valid');
  } else {
    console.log('⚠️  Frontend entry point may have issues');
  }
} catch (error) {
  console.log('❌ Cannot read frontend entry point');
  allFilesExist = false;
}

// Test 5: Simulate Vercel routing
console.log('\n5️⃣ Simulating Vercel routing...');
const routes = [
  { path: '/api/health', expected: 'dist/index.js' },
  { path: '/assets/index.css', expected: 'dist/public/assets/' },
  { path: '/', expected: 'dist/public/index.html' },
  { path: '/dashboard', expected: 'dist/public/index.html' }
];

for (const route of routes) {
  console.log(`📍 ${route.path} → ${route.expected}`);
}

// Summary
console.log('\n📊 SUMMARY:');
if (allFilesExist) {
  console.log('✅ All required files exist');
  console.log('✅ Build structure is correct');
  console.log('✅ Ready for Vercel deployment');
} else {
  console.log('❌ Some files are missing');
  console.log('❌ Build may have issues');
  console.log('❌ Check build process');
}

console.log('\n🚀 NEXT STEPS:');
console.log('1. Push code to GitHub');
console.log('2. Redeploy on Vercel');
console.log('3. Check Environment Variables');
console.log('4. Monitor Vercel logs');
console.log('\n📖 See debug-vercel-404.md for troubleshooting');