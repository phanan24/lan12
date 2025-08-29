# Hướng dẫn triển khai lên GitHub Pages

## Tổng quan

Dự án này đã được cấu hình để triển khai frontend (React + Vite) lên GitHub Pages. GitHub Pages chỉ hỗ trợ static files, nên chỉ phần client sẽ được deploy.

## Chuẩn bị

### 1. Tạo repository trên GitHub

1. Đăng nhập vào GitHub
2. Tạo repository mới (public hoặc private)
3. Đẩy code lên repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

### 2. Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Chọn **Settings** > **Pages**
3. Trong **Source**, chọn **GitHub Actions**
4. Workflow sẽ tự động chạy khi có commit mới

## Cấu hình đã được thiết lập

### 1. GitHub Actions Workflow

File `.github/workflows/deploy.yml` đã được tạo với cấu hình:

- **Trigger**: Tự động chạy khi push lên branch `main`
- **Build**: Sử dụng Node.js 18, chạy `npm run build:client`
- **Deploy**: Tự động deploy lên GitHub Pages

### 2. Vite Configuration

File `vite.config.ts` đã được cập nhật:

- **Base path**: Cấu hình cho GitHub Pages
- **Build output**: Xuất ra thư mục `dist/public`

### 3. SPA Routing Support

- **404.html**: Xử lý routing cho Single Page Application
- **index.html**: Thêm script redirect cho GitHub Pages

### 4. Package Scripts

- `npm run build:client`: Build chỉ phần frontend cho GitHub Pages

## Các bước triển khai

### Phương pháp 1: Tự động (Khuyến nghị)

1. Đẩy code lên GitHub:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. GitHub Actions sẽ tự động:
   - Build dự án
   - Deploy lên GitHub Pages
   - Cung cấp URL truy cập

3. Kiểm tra tiến trình tại **Actions** tab trên GitHub

4. Sau khi hoàn thành, truy cập:
   - `https://username.github.io/repository-name/`

### Phương pháp 2: Manual Deploy

1. Build dự án locally:
   ```bash
   npm run build:client
   ```

2. Sử dụng GitHub CLI hoặc upload thủ công

## Lưu ý quan trọng

### 1. Chỉ Frontend

- GitHub Pages chỉ hỗ trợ static files
- Backend (API) sẽ không hoạt động
- Cần deploy backend riêng (Vercel, Railway, etc.)

### 2. Environment Variables

- GitHub Pages không hỗ trợ server-side environment variables
- Cần cấu hình API endpoints trong code

### 3. Custom Domain (Tùy chọn)

1. Thêm file `CNAME` vào thư mục `client/public/`:
   ```
   yourdomain.com
   ```

2. Cấu hình DNS:
   ```
   CNAME: www -> username.github.io
   A: @ -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```

## Xử lý sự cố

### 1. Build Failed

- Kiểm tra logs tại **Actions** tab
- Đảm bảo `package.json` có script `build:client`
- Kiểm tra dependencies

### 2. 404 Error

- Đảm bảo file `404.html` đã được tạo
- Kiểm tra routing configuration
- Xem logs deployment

### 3. Assets không load

- Kiểm tra base path trong `vite.config.ts`
- Đảm bảo đường dẫn assets đúng

### 4. Workflow không chạy

- Kiểm tra file `.github/workflows/deploy.yml`
- Đảm bảo có quyền **Actions** trong repository
- Kiểm tra branch name (phải là `main`)

## Cấu hình nâng cao

### 1. Thay đổi branch deploy

Trong `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [ "your-branch" ]  # Thay đổi branch
```

### 2. Thêm environment variables

Trong workflow file:

```yaml
- name: Build client
  run: npm run build:client
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
```

### 3. Cache dependencies

Đã được cấu hình trong workflow:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

## Monitoring

1. **GitHub Actions**: Theo dõi build status
2. **GitHub Pages**: Kiểm tra deployment status
3. **Browser DevTools**: Debug frontend issues

## Liên kết hữu ích

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite GitHub Pages Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)