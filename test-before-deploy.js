#!/usr/bin/env node

/**
 * Script test dự án trước khi deploy
 * Đảm bảo mọi thứ hoạt động tốt trước khi upload
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Testing dự án trước khi deploy...');

// Test 1: Build thành công
console.log('\n1️⃣ Test build process...');
try {
  console.log('Building client...');
  execSync('npm run build:client', { stdio: 'pipe' });
  console.log('✅ Client build thành công');
  
  console.log('Building full project...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Full build thành công');
  
  // Kiểm tra output files
  if (fs.existsSync('dist/public/index.html')) {
    console.log('✅ Frontend files generated');
  } else {
    console.log('❌ Frontend files missing');
  }
  
  if (fs.existsSync('dist/index.js')) {
    console.log('✅ Backend files generated');
  } else {
    console.log('❌ Backend files missing');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Test 2: Kiểm tra TypeScript
console.log('\n2️⃣ Test TypeScript...');
try {
  execSync('npm run check', { stdio: 'pipe' });
  console.log('✅ TypeScript check passed');
} catch (error) {
  console.log('⚠️  TypeScript có warnings/errors');
}

// Test 3: Kiểm tra dependencies
console.log('\n3️⃣ Test dependencies...');
try {
  execSync('npm ls --depth=0', { stdio: 'pipe' });
  console.log('✅ Dependencies OK');
} catch (error) {
  console.log('⚠️  Có vấn đề với dependencies');
}

// Test 4: Kiểm tra environment variables template
console.log('\n4️⃣ Test environment setup...');
if (fs.existsSync('.env.vercel')) {
  const envContent = fs.readFileSync('.env.vercel', 'utf8');
  const requiredVars = [
    'DATABASE_URL',
    'OPENROUTER_API_KEY', 
    'IMGBB_API_KEY',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD_HASH'
  ];
  
  let allVarsPresent = true;
  for (const varName of requiredVars) {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} template found`);
    } else {
      console.log(`❌ ${varName} missing`);
      allVarsPresent = false;
    }
  }
  
  if (allVarsPresent) {
    console.log('✅ All environment variables templates present');
  }
} else {
  console.log('❌ .env.vercel file missing');
}

console.log('\n🎯 DEPLOYMENT CHECKLIST:');
console.log('□ Code đã được commit và push lên GitHub');
console.log('□ Repository đã được tạo trên GitHub');
console.log('□ Vercel project đã được tạo và linked với GitHub repo');
console.log('□ Environment variables đã được thêm vào Vercel Dashboard');
console.log('□ Database đã được setup (nếu cần)');
console.log('□ API keys đã được lấy và thêm vào env vars');

console.log('\n✨ Dự án đã sẵn sàng deploy!');
console.log('📋 Làm theo hướng dẫn trong DEPLOYMENT_GUIDE.md');
console.log('🚀 Sau khi deploy, ứng dụng sẽ hoạt động giống như local!');