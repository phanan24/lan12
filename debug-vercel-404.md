# 🔍 Debug Lỗi 404 Trên Vercel

## Lỗi Hiện Tại
```
404: NOT_FOUND
Code: NOT_FOUND
ID: hkg1::2mk7c-1756485673867-2d5d35ba52bf
```

## Nguyên Nhân Có Thể

### 1. Cấu Hình vercel.json Không Đúng
- ✅ **Đã sửa**: Cập nhật cấu hình builds và routes
- ✅ **Đã sửa**: Loại bỏ xung đột functions/builds

### 2. Build Process Không Thành Công
- Kiểm tra logs trong Vercel Dashboard > Functions tab
- Đảm bảo `npm run build` chạy thành công

### 3. Environment Variables Chưa Được Thiết Lập
- Database connection có thể fail
- API keys chưa được cấu hình

### 4. File Paths Không Đúng
- Backend: `/dist/index.js`
- Frontend: `/dist/public/index.html`
- Assets: `/dist/public/assets/*`

## Cách Kiểm Tra

### 1. Kiểm Tra Build Local
```bash
npm run build
ls -la dist/
ls -la dist/public/
```

### 2. Kiểm Tra Vercel Logs
1. Vào Vercel Dashboard
2. Chọn project
3. Tab "Functions" > Xem logs
4. Tab "Deployments" > Click vào deployment > View logs

### 3. Test API Endpoints
```bash
# Test local
curl http://localhost:5000/api/health

# Test production
curl https://your-app.vercel.app/api/health
```

## Giải Pháp

### Bước 1: Redeploy Với Cấu Hình Mới
1. Push code mới lên GitHub
2. Vercel sẽ tự động redeploy
3. Hoặc manual redeploy trong Dashboard

### Bước 2: Kiểm Tra Environment Variables
Đảm bảo các biến sau đã được thêm vào Vercel:
```
DATABASE_URL=your_database_url
OPENROUTER_API_KEY=your_key
IMGBB_API_KEY=your_key
ADMIN_USERNAME=admin@limva.edu.vn
ADMIN_PASSWORD_HASH=your_hash
NODE_ENV=production
```

### Bước 3: Kiểm Tra Database Connection
- Đảm bảo database cho phép connection từ Vercel
- Test connection string
- Kiểm tra firewall/whitelist settings

### Bước 4: Alternative Configuration
Nếu vẫn lỗi, thử cấu hình đơn giản hơn:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "functions": {
    "api/index.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## Monitoring

### Real-time Logs
```bash
# Cài Vercel CLI
npm i -g vercel

# Login và link project
vercel login
vercel link

# Xem logs real-time
vercel logs
```

### Health Check
Thêm endpoint health check:
```javascript
// Trong server/routes.ts
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});
```

## Checklist Debug

- [ ] Build thành công local
- [ ] vercel.json syntax đúng
- [ ] Environment variables đã thêm
- [ ] Database connection OK
- [ ] API endpoints response
- [ ] Static files serve được
- [ ] Logs không có error

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề:
1. Chụp screenshot Vercel logs
2. Copy full error message
3. Kiểm tra Network tab trong browser DevTools
4. Test với Postman/curl

**Lưu ý**: Vercel có thể mất 1-2 phút để propagate changes. Hãy đợi và thử lại sau khi deploy.