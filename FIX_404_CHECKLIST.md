# ✅ Checklist Sửa Lỗi 404 Vercel

## 🎯 Vấn Đề
Lỗi 404 NOT_FOUND trên Vercel deployment

## ✅ Đã Kiểm Tra
- ✅ Build process hoạt động tốt (66.6KB backend, 3.9KB frontend)
- ✅ File structure đúng (dist/index.js, dist/public/)
- ✅ vercel.json đã được sửa (loại bỏ xung đột builds/functions)
- ✅ Routes configuration đã đúng

## 🔧 Các Bước Sửa Lỗi

### Bước 1: Push Code Mới
```bash
git add .
git commit -m "Fix Vercel 404 - Update vercel.json configuration"
git push origin main
```

### Bước 2: Kiểm Tra Vercel Dashboard
1. Vào https://vercel.com/dashboard
2. Chọn project của bạn
3. Kiểm tra tab "Deployments" - deployment mới nhất có thành công không?
4. Nếu có lỗi, click vào deployment để xem logs

### Bước 3: Kiểm Tra Environment Variables
Vào Settings > Environment Variables, đảm bảo có:
```
DATABASE_URL=postgresql://...
OPENROUTER_API_KEY=sk-or-...
IMGBB_API_KEY=...
ADMIN_USERNAME=admin@limva.edu.vn
ADMIN_PASSWORD_HASH=$2b$10$...
NODE_ENV=production
```

### Bước 4: Redeploy Sau Khi Thêm Env Vars
1. Vào tab "Deployments"
2. Click "..." ở deployment mới nhất
3. Chọn "Redeploy"
4. Đợi 2-3 phút để deployment hoàn thành

### Bước 5: Test Endpoints
```bash
# Test homepage
curl https://your-app.vercel.app/

# Test API
curl https://your-app.vercel.app/api/health

# Test assets
curl https://your-app.vercel.app/assets/index.css
```

## 🚨 Nếu Vẫn Lỗi 404

### Option A: Sử dụng Cấu Hình Đơn Giản
Thay thế vercel.json bằng:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "functions": {
    "api/index.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option B: Tách Frontend/Backend
1. **Frontend-only trên Vercel**:
   - Chỉ deploy dist/public/
   - Sử dụng external API

2. **Backend trên Railway/Render**:
   - Deploy backend riêng
   - Update API URLs trong frontend

### Option C: Kiểm Tra Logs Chi Tiết
```bash
# Cài Vercel CLI
npm i -g vercel

# Login và link
vercel login
vercel link

# Xem logs real-time
vercel logs --follow
```

## 🎯 Nguyên Nhân Thường Gặp

1. **Environment Variables**: Database connection fail
2. **Build Process**: Dependencies missing
3. **Routing**: API paths không đúng
4. **Permissions**: Database firewall block Vercel IPs
5. **Memory/Timeout**: Function quá lâu response

## 📞 Debug Commands

```bash
# Local test
npm run build
npm start

# Test API local
curl http://localhost:5000/api/health

# Check build output
node test-vercel-build.js

# Check deployment config
node setup-deployment.js
```

## 🎉 Khi Nào Biết Đã Sửa Xong?

- ✅ Homepage load được (https://your-app.vercel.app/)
- ✅ API response (https://your-app.vercel.app/api/health)
- ✅ Login/logout hoạt động
- ✅ Database operations work
- ✅ File upload work

## 📋 Final Notes

- Vercel có thể mất 1-2 phút để propagate changes
- Clear browser cache nếu cần
- Check Network tab trong DevTools
- Monitor Vercel dashboard cho errors

**Quan trọng**: Nếu vẫn gặp vấn đề, hãy:
1. Screenshot Vercel logs
2. Copy exact error message
3. Test với incognito browser
4. Kiểm tra từng endpoint riêng lẻ