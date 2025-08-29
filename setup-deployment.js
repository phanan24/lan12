#!/usr/bin/env node

/**
 * Script thiết lập deployment cho Vercel
 * Đảm bảo dự án hoạt động giống như khi chạy local
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Thiết lập deployment cho Vercel...');

// Kiểm tra các file cần thiết
const requiredFiles = [
  'vercel.json',
  'package.json',
  '.env.vercel',
  'client/index.html',
  'server/index.ts'
];

console.log('📋 Kiểm tra các file cần thiết...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - THIẾU FILE!`);
    process.exit(1);
  }
}

// Kiểm tra dependencies
console.log('\n📦 Kiểm tra dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@vercel/node',
    'drizzle-orm',
    'express',
    'cors'
  ];
  
  for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`⚠️  ${dep} - có thể cần thiết`);
    }
  }
} catch (error) {
  console.error('❌ Lỗi đọc package.json:', error.message);
}

// Kiểm tra scripts
console.log('\n🔧 Kiểm tra build scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['build', 'build:client', 'start'];

for (const script of requiredScripts) {
  if (packageJson.scripts[script]) {
    console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ ${script} - THIẾU SCRIPT!`);
  }
}

// Kiểm tra cấu hình Vercel
console.log('\n⚙️  Kiểm tra cấu hình Vercel...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  if (vercelConfig.builds && vercelConfig.builds.length > 0) {
    console.log('✅ Builds configuration');
  }
  
  if (vercelConfig.functions) {
    console.log('✅ Functions configuration');
  }
  
  if (vercelConfig.routes && vercelConfig.routes.length > 0) {
    console.log('✅ Routes configuration');
  }
} catch (error) {
  console.error('❌ Lỗi đọc vercel.json:', error.message);
}

// Hiển thị hướng dẫn
console.log('\n📝 HƯỚNG DẪN DEPLOYMENT:');
console.log('1. Tạo repository GitHub:');
console.log('   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git');
console.log('   git push -u origin main');
console.log('');
console.log('2. Deploy lên Vercel:');
console.log('   - Vào https://vercel.com');
console.log('   - Import repository từ GitHub');
console.log('   - Vercel sẽ tự động detect cấu hình');
console.log('');
console.log('3. Thiết lập Environment Variables:');
console.log('   - Vào Settings > Environment Variables');
console.log('   - Copy từ file .env.vercel:');

// Đọc và hiển thị env variables
try {
  const envContent = fs.readFileSync('.env.vercel', 'utf8');
  const envLines = envContent.split('\n').filter(line => 
    line.trim() && !line.startsWith('#') && line.includes('=')
  );
  
  for (const line of envLines) {
    const [key] = line.split('=');
    console.log(`   - ${key}`);
  }
} catch (error) {
  console.log('   ❌ Không thể đọc .env.vercel');
}

console.log('');
console.log('4. Redeploy sau khi thêm environment variables');
console.log('');
console.log('🎉 Sau khi hoàn thành, ứng dụng sẽ hoạt động giống như local!');
console.log('📖 Xem thêm chi tiết trong DEPLOYMENT_GUIDE.md');