# Hướng Dẫn Deploy Dự Án Lên Vercel

## Tổng Quan
Dự án này là một ứng dụng full-stack với React frontend và Node.js backend. Để deploy lên Vercel và hoạt động giống như khi chạy local, bạn cần thực hiện các bước sau:

## Bước 1: Tạo Repository GitHub

1. Tạo repository mới trên GitHub:
   - Đi tới https://github.com/new
   - Đặt tên repository (ví dụ: `my-fullstack-app`)
   - Chọn Public hoặc Private
   - Không tích "Initialize with README" (vì đã có code)

2. Kết nối local repository với GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Bước 2: Thiết Lập Environment Variables

Trước khi deploy, cần thiết lập các biến môi trường. Dựa vào file `.env.vercel`, các biến cần thiết:

### Database
- `DATABASE_URL`: URL kết nối database
- `DIRECT_URL`: Direct URL cho database

### API Keys
- `OPENROUTER_API_KEY`: API key cho OpenRouter
- `IMGBB_API_KEY`: API key cho ImgBB

### Authentication
- `ADMIN_USERNAME`: Username admin
- `ADMIN_PASSWORD`: Password admin

## Bước 3: Deploy Lên Vercel

### Phương Pháp 1: Deploy Qua Vercel Dashboard

1. Đi tới https://vercel.com và đăng nhập
2. Click "New Project"
3. Import repository từ GitHub
4. Chọn repository vừa tạo
5. Vercel sẽ tự động detect framework và cấu hình

### Phương Pháp 2: Deploy Qua CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Login và deploy:
```bash
vercel login
vercel
```

## Bước 4: Cấu Hình Environment Variables Trên Vercel

1. Vào Vercel Dashboard
2. Chọn project vừa deploy
3. Vào tab "Settings" > "Environment Variables"
4. Thêm từng biến môi trường từ file `.env.vercel`:
   - Name: `DATABASE_URL`, Value: `your_database_url`
   - Name: `OPENROUTER_API_KEY`, Value: `your_api_key`
   - Và các biến khác...

## Bước 5: Redeploy Sau Khi Thêm Environment Variables

Sau khi thêm environment variables, cần redeploy:
1. Vào tab "Deployments"
2. Click "..." ở deployment mới nhất
3. Chọn "Redeploy"

## Cấu Hình Hiện Tại

File `vercel.json` đã được cấu hình để:
- Build cả frontend và backend
- Serve API routes từ `/api/*`
- Serve static files từ frontend
- Handle SPA routing

## Kiểm Tra Deployment

1. **Frontend**: Truy cập URL Vercel để kiểm tra giao diện
2. **API**: Test các endpoint API (ví dụ: `your-app.vercel.app/api/health`)
3. **Database**: Kiểm tra kết nối database qua các API calls
4. **Authentication**: Test chức năng đăng nhập

## Troubleshooting

### Lỗi 404 cho API Routes
- Kiểm tra file `vercel.json` có đúng cấu hình routes
- Đảm bảo API files nằm trong thư mục `api/` hoặc được build đúng

### Lỗi Database Connection
- Kiểm tra `DATABASE_URL` trong Environment Variables
- Đảm bảo database cho phép kết nối từ Vercel

### Lỗi Environment Variables
- Kiểm tra tất cả biến môi trường đã được thêm
- Redeploy sau khi thêm/sửa biến môi trường

### Lỗi Build
- Kiểm tra logs trong tab "Functions" hoặc "Deployments"
- Đảm bảo tất cả dependencies được cài đặt

## Lưu Ý Quan Trọng

1. **Database**: Nếu dùng local database, cần migrate sang cloud database (như PlanetScale, Supabase, etc.)
2. **File Storage**: Vercel không hỗ trợ persistent file storage, cần dùng cloud storage
3. **Environment**: Production environment có thể khác local, cần test kỹ
4. **CORS**: Có thể cần cấu hình CORS cho API

## Monitoring

- Vercel Dashboard cung cấp analytics và logs
- Kiểm tra tab "Functions" để xem logs của API
- Tab "Analytics" để theo dõi performance

Sau khi hoàn thành các bước trên, ứng dụng sẽ hoạt động trên Vercel giống như khi chạy local!