# 🚀 Hướng Dẫn Deploy Nhanh

## Tóm Tắt
Dự án của bạn đã được cấu hình hoàn chỉnh để deploy lên Vercel và hoạt động giống như khi chạy local. Làm theo các bước sau:

## Bước 1: Tạo GitHub Repository

```bash
# Tạo repo mới trên GitHub, sau đó:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git add .
git commit -m "Ready for deployment"
git push -u origin main
```

## Bước 2: Deploy Lên Vercel

1. Vào https://vercel.com
2. Click "New Project"
3. Import repository từ GitHub
4. Vercel sẽ tự động detect cấu hình
5. Click "Deploy"

## Bước 3: Thiết Lập Environment Variables

Vào Vercel Dashboard > Settings > Environment Variables, thêm:

```
DATABASE_URL=your_database_url_here
OPENROUTER_API_KEY=your_openrouter_key_here
IMGBB_API_KEY=your_imgbb_key_here
ADMIN_USERNAME=admin@limva.edu.vn
ADMIN_PASSWORD_HASH=your_password_hash_here
NODE_ENV=production
```

## Bước 4: Redeploy

Sau khi thêm environment variables:
1. Vào tab "Deployments"
2. Click "..." ở deployment mới nhất
3. Chọn "Redeploy"

## ✅ Hoàn Thành!

Ứng dụng của bạn giờ đã hoạt động trên Vercel giống như khi chạy local:
- ✅ Frontend React hoạt động
- ✅ Backend API hoạt động
- ✅ Database kết nối
- ✅ Authentication hoạt động
- ✅ File upload hoạt động
- ✅ SPA routing hoạt động

## 🔧 Cấu Hình Đã Thiết Lập

- **vercel.json**: Cấu hình full-stack deployment (đã sửa lỗi xung đột builds/functions)
- **package.json**: Build scripts tối ưu
- **vite.config.ts**: Cấu hình build frontend
- **404.html**: SPA routing support
- **Environment variables**: Template sẵn sàng

## 📞 Hỗ Trợ

Nếu gặp vấn đề, xem:
- `DEPLOYMENT_GUIDE.md` - Hướng dẫn chi tiết
- Chạy `node setup-deployment.js` - Kiểm tra cấu hình
- Chạy `node test-before-deploy.js` - Test trước deploy

**Lưu ý**: Đảm bảo database và API keys đã được thiết lập đúng để ứng dụng hoạt động 100% như local!